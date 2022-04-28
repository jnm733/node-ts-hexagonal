import {SearchRequest} from "@elastic/elasticsearch/api/types";
import bodybuilder, {Bodybuilder} from "bodybuilder";

import {ICriteriaConverter} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/iCriteriaConverter";
import Criteria from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/criteria";
import Filter, {FilterOperator} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/filter";

export default class BodybuilderCriteriaConverter implements ICriteriaConverter<SearchRequest> {

    public toQuery(criteria: Criteria, {bodyBuilder}: {bodyBuilder?: Bodybuilder} = {}): SearchRequest {

        let body: Bodybuilder = (bodyBuilder !== undefined) ? bodyBuilder : bodybuilder();

        if (criteria.offset)
            body.from(criteria.offset);

        if (criteria.limit)
            body.size(criteria.limit);

        if (criteria.order) {
            this.criteriaOrderToElasticBodyBuilder(body, criteria);
        }

        if (criteria.filters) {
            this.criteriaFiltersToElasticBodyBuilder(body, criteria);
        }

        return body.build();
    }

    protected criteriaOrderToElasticBodyBuilder(body: Bodybuilder, criteria: Criteria): void {
        if (criteria.order)
            body.sort(criteria.order.orderBy, criteria.order.orderDir);
    }

    protected criteriaFiltersToElasticBodyBuilder(body: Bodybuilder, criteria: Criteria): void {
        if (criteria.filters) {
            criteria.filters.forEach((filter) => {
                this.criteriaFilterToElasticBodyBuilder(body, filter, criteria);
            });
        }
    }

    protected criteriaFilterToElasticBodyBuilder(body: Bodybuilder, filter: Filter, criteria: Criteria): void {

        //Range
        if (filter.operator == FilterOperator.GREATER) {
            body.filter('range', filter.field, {gt: filter.value});
        } else if (filter.operator == FilterOperator.GREATER_EQUALS) {
            body.filter('range', filter.field, {gte: filter.value});
        } else if (filter.operator == FilterOperator.LOWER) {
            body.filter('range', filter.field, {lt: filter.value});
        } else if (filter.operator == FilterOperator.LOWER_EQUALS) {
            body.filter('range', filter.field, {lte: filter.value});
        }

        //Term
        if (filter.operator == FilterOperator.EQUALS) {
            body.filter('term', filter.field, filter.value);
        } else if (filter.operator == FilterOperator.NOT_EQUALS) {
            body.notFilter('term', filter.field, filter.value);
        }

        //Match
        if (filter.operator == FilterOperator.LIKE) {
            body.query('match', filter.field, filter.value);
        } else if (filter.operator == FilterOperator.NOT_EQUALS)
            body.notQuery('match', filter.field, filter.value);

        //In
        if (filter.operator == FilterOperator.IN) {
            body.filter('terms', filter.field, JSON.parse(filter.valueToString));
        } else if (filter.operator == FilterOperator.NOT_IN)
            body.notFilter('terms', filter.field, JSON.parse(filter.valueToString));

    }

}
