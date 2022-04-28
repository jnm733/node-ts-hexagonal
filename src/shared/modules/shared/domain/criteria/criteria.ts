import {ICriteriaUrlQuery} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/iCriteriaUrlQuery";
import Order from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/order";
import Filter, {FilterOperator} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/filter";

export default class Criteria {

    public filters: Filter[];
    public order?: Order;
    public limit?: number;
    public offset?: number;
    public fields?: string[];

    private constructor({filters, order, limit, offset, fields}: { filters?: Filter[]; order?: Order; limit?: number; offset?: number; fields?: string[] }) {
        this.filters = filters || [];
        this.order = order;
        this.limit = limit;
        this.offset = offset;
        this.fields = fields;
    }

    public static create({filters, order, limit, offset, fields}: { filters?: Filter[]; order?: Order; limit?: number; offset?: number; fields?: string[] } = {}) {
        return new this({filters, order, limit, offset, fields});
    }

    public static createFromUrlQuery(query?: ICriteriaUrlQuery, filtersQuery?: { [field: string]: any }): Criteria {

        //Parse Criteria params
        let order: Order | undefined = (query && query.order) ? Order.createFromString(query.order, (query.dir) ? query.dir : '') : undefined;
        let offset: number = (query) ? Number(query.offset) || 0 : 0;
        let limit: number | undefined = (query) ? Number(query.limit) || undefined : undefined;
        let filters: Filter[] = [];

        //Page params
        if (query && !query.offset && query.page && limit) {
            offset = (Number(query.page) - 1) * limit;
        }

        //Parse query filters
        if (filtersQuery) {
            for (const [field, value] of Object.entries(filtersQuery)) {

                if (value) {
                    //Range filters (min & max properties)
                    if (typeof value == "object" && (value.min || value.max)) {
                        if (value.min)
                            filters!.push(Filter.create(field, FilterOperator.GREATER_EQUALS, value.min));
                        if (value.max)
                            filters!.push(Filter.create(field, FilterOperator.LOWER_EQUALS, value.max));
                    }
                    //Multiple values filter (array of values)
                    else if (typeof value == "object" && Array.isArray(value)) {
                        filters!.push(Filter.create(field, FilterOperator.IN, JSON.stringify(value)));
                    }
                    //Multiple fields filter (object)
                    else if (typeof value == "object") {
                        for (let subfield in value) {
                            filters!.push(Filter.create(field + '.' + subfield, FilterOperator.EQUALS, String(value[subfield])));
                        }
                    }
                    //Normal filter
                    else {
                        filters!.push(Filter.create(field, FilterOperator.EQUALS, value));
                    }
                }

            }
        }

        return new this({filters, order, limit, offset});
    }

    public updateOrAddFilter(filter: Filter): void {

        let index = this.getFilterIndex(filter);

        if (index !== undefined)
            this.filters[index] = filter;
        else
            this.filters.push(filter);

    }

    public hasFilter(field: string): boolean {
        let filter = this.filters.filter((filter) => { return filter.field == field});

        return (filter.length > 0);
    }

    public getFilter(field: string): Filter | undefined {

        let filter = this.filters.filter((filter) => { return filter.field == field});

        return (filter) ? filter[0] : undefined;

    }

    public deleteFilter(field: string): void {
        this.filters = this.filters.filter((filter) => { return filter.field != field});
    }

    private getFilterIndex(filter: Filter): number | undefined {

        let index = undefined;

        this.filters.forEach((element, it) => {
            if (element.equals(filter)) {
                index = it;
                return;
            }
        });

        return index;
    }

}