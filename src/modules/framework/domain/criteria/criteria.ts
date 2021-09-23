import {ICriteria, ICriteriaOrder, orderDirection} from "./iCriteria";

export default class Criteria implements ICriteria{

    public offset?: number;
    public limit?: number;
    public order?: ICriteriaOrder;
    public filters?: {[key: string]: any};
    public fields?: {[key: string]: any};

    public constructor(params: ICriteria) {

        this.filters = params.filters;
        this.order = params.order;
        this.limit = params.limit;
        this.offset = params.offset;
        this.filters = params.fields;

    }

    public static parseFromQueryDict(query: {[key: string]: string}): Criteria {

        let offset = Number(query.offset) || undefined;
        delete query.offset;

        let limit = Number(query.limit) || undefined;
        delete query.limit;

        let orderBy = query.order || undefined;
        delete query.order;

        let dirValue = query.dir || undefined;
        delete query.dir;

        let dir: orderDirection = undefined;
        if (dirValue) {
            dir = this.parseOrderDir(dirValue);
        }

        let order: ICriteriaOrder = undefined;
        if (orderBy || dir)
            order = {orderBy: orderBy, orderDir: dir}


        return new this({ fields: query, order: order, limit: limit, offset: offset });
    }

    public static parseOrderDir(value: string | number) : orderDirection | undefined {

        let ascValues = [1, 'asc', 'ASC'];
        let descValues = [0, 'desc', 'DESC'];

        if (ascValues.includes(value))
            return orderDirection.ASC;
        else if (descValues.includes(value))
            return orderDirection.DESC;

        return undefined;
    }

}