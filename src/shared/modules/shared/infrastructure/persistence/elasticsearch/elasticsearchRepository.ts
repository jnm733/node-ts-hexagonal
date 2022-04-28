import {ApiResponse, Client} from "@elastic/elasticsearch";
import {SearchRequest, SearchHit} from "@elastic/elasticsearch/api/types";

import Criteria from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/criteria";
import {IPaginateQueryResult} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/iPaginateQueryResult";
import {ICriteriaConverter} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/iCriteriaConverter";
import {TransportRequestPromise} from "@elastic/elasticsearch/lib/Transport";
import DateTimeValueObject from "@node-ts-hexagonal/shared/modules/shared/domain/value-objects/dateTimeValueObject";

export default abstract class ElasticsearchRepository<ElasticModel> {

    protected constructor(protected _client: Promise<Client>, protected criteriaConverter: ICriteriaConverter<SearchRequest>) {}

    abstract indexName(): string;
    abstract timestamps(): boolean;

    get client(): Promise<Client> {
        return this._client;
    }

    protected async search({body, track_totals_hits}: {body: object, track_totals_hits?: boolean}): Promise<TransportRequestPromise<ApiResponse>> {

        let client = await this.client;

        return client.search({
            index: this.indexName(),
            track_total_hits: (track_totals_hits) ? track_totals_hits : false,
            body: body
        }).then((res) => {
            console.log('[ElasticsearchRepository]', 'Completed search query on '+this.indexName()+' with '+res.body.hits.hits.length+' hits');
            return res;
        }).catch((err) => {
            console.warn('[ElasticsearchRepository]', 'Error on search query', err.message);
            throw err;
        });

    }

    protected async delete(_id: string): Promise<void> {

        let client = await this.client;

        await client.delete({
            index: this.indexName(),
            id: _id
        }).then((res) => {
            console.log('[ElasticsearchRepository]', 'Completed delete query on '+this.indexName()+' index by id: '+_id);
        }).catch((err) => {
            console.error('[ElasticsearchRepository]', 'Error delete query on '+this.indexName()+' by id: '+_id, err.message);
            if (err.meta.body.result !== 'not_found')
                throw err;
        });

    }

    protected async deleteByQuery(body: object): Promise<void> {

        let client = await this.client;

        await client.deleteByQuery({
            index: this.indexName(),
            body: body
        }).then((res) => {
            console.log('[ElasticsearchRepository]', 'Completed delete query on '+this.indexName()+' index by query with '+res.body.total+' hits');
        }).catch((err) => {
            console.warn('[ElasticsearchRepository]', 'Error delete query on '+this.indexName()+' by query', err.message);
        });

    }

    protected async index(_id: string, doc: ElasticModel): Promise<void> {

        let client = await this.client;

        let body: any = doc;

        if (this.timestamps()) {
            body.timestamps = {
                created: DateTimeValueObject.now().toUnix(),
                updated: DateTimeValueObject.now().toUnix()
            }
        }

        await client.index({
            index: this.indexName(),
            id: ""+_id,
            body: body
        });

    }

    protected async bulk(data: {_id: string, doc: ElasticModel}[], retries: number = 3) : Promise<void> {

        let client = await this.client;

        const body = data.flatMap(doc => {

            let bodyDoc: any = doc.doc;

            if (this.timestamps()) {
                bodyDoc.timestamps = {
                    created: DateTimeValueObject.now().toUnix(),
                    updated: DateTimeValueObject.now().toUnix()
                }
            }

            return [{ index: { _index: this.indexName(), _id: doc._id } }, bodyDoc];
        });

        const { body: bulkResponse } = await client.bulk({
            refresh: true,
            body
        });

        console.log('[ElasticsearchRepository]', 'Bulk query on '+this.indexName()+' with '+ bulkResponse.items.length+' hits');

        //Get errors
        if (bulkResponse.errors) {
            const erroredDocuments: any[] = []
            await bulkResponse.items.forEach((action: any, i: any) => {
                const operation = Object.keys(action)[0]
                if (action[operation].error) {
                    erroredDocuments.push({
                        it: i,
                        status: action[operation].status,
                        error: action[operation].error,
                        operation: body[i * 2],
                        document: body[i * 2 + 1],
                    })
                }
            });
            console.error('[ElasticsearchRepository]', 'Docs with errors on '+this.indexName()+' bulk: ', JSON.stringify(erroredDocuments), 'Total '+erroredDocuments.length);

            //Retry
            if (retries > 0) {
                let retryBody: {_id: string, doc: ElasticModel}[] = [];
                await erroredDocuments.forEach((docError) => {
                    if (docError.status == 429) {
                        retryBody.push(data[docError.it]);
                    }
                });
                if (retryBody.length > 0) {
                    return await this.bulk(retryBody, retries-1);
                }
            }
        }
    }

    protected async truncate(): Promise<void> {

        return this.deleteByQuery({
            query: {
                match_all: {}
            }
        }).then((res) => {
            console.log('[ElasticsearchRepository]', 'Completed truncate query on '+this.indexName());
        }).catch((err) => {
            console.warn('[ElasticsearchRepository]', 'Error truncate query on '+this.indexName(), err.message);
        });
    }

    protected async deleteByCriteria(criteria: Criteria): Promise<void> {

        let bodyQuery = this.criteriaConverter.toQuery(criteria);

        return this.deleteByQuery(bodyQuery);
    }

    protected async paginateByCriteria(criteria: Criteria): Promise<IPaginateQueryResult<SearchHit<ElasticModel>>> {

        let bodyQuery = this.criteriaConverter.toQuery(criteria);

        const { body } = await this.search({body: bodyQuery, track_totals_hits: true});

        return {
            size: body.hits.hits.length,
            total_rows: body.hits.total.value,
            rows: body.hits.hits
        }

    }

    protected async aggregationByCriteria(criteria: Criteria, fields: string[]): Promise<{rows: {key: string[], doc_count: number}[]}> {

        let client = await this.client;

        let searchBody: any = this.criteriaConverter.toQuery(criteria);

        let terms: any = [];

        fields.forEach((field) => {terms.push({ "field": field })});

        searchBody.aggs = {
            name: {
                "multi_terms": {
                    "terms": terms,
                    "size": criteria.limit || 100
                },
            }
        }

        const { body }  = await client.search({
            index: this.indexName(),
            body: searchBody
        });

        return {
            rows: body.aggregations['name'].buckets
        }

    }

}
