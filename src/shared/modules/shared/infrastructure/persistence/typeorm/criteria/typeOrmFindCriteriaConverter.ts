import {FindManyOptions, FindOptionsWhere, Not, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Like, In} from "typeorm";

import {ICriteriaConverter} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/iCriteriaConverter";
import Criteria from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/criteria";
import {OrderDirection} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/order";
import Filter, {FilterOperator} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/filter";

export default class TypeOrmFindCriteriaConverter implements ICriteriaConverter<FindManyOptions> {

    public toQuery(criteria: Criteria): FindManyOptions {

        let options: FindManyOptions = {};

        if (criteria.offset)
            options.skip = criteria.offset;

        if (criteria.limit)
            options.take = criteria.limit;

        if (criteria.order) {
            options.order = {};
            options.order[criteria.order.orderBy] = (criteria.order.orderBy == OrderDirection.DESC) ? -1 : 1;
        }

        if (criteria.filters) {
            let where: FindOptionsWhere<any> = {};
            for (const filter of criteria.filters) {
                this.criteriaFilterToFindTypeOrm(where, filter, criteria);
            }
            options.where = where;
        }


        return options;
    }

    protected criteriaFilterToFindTypeOrm(where: FindOptionsWhere<any>, filter: Filter, criteria: Criteria): void {

        //Range
        if (filter.operator == FilterOperator.GREATER) {
            where[filter.field] = MoreThan(filter.value);
        } else if (filter.operator == FilterOperator.GREATER_EQUALS) {
            where[filter.field] = MoreThanOrEqual(filter.value);
        } else if (filter.operator == FilterOperator.LOWER) {
            where[filter.field] = LessThan(filter.value);
        } else if (filter.operator == FilterOperator.LOWER_EQUALS) {
            where[filter.field] = LessThanOrEqual(filter.value);
        }

        //Equals
        if (filter.operator == FilterOperator.EQUALS) {
            where[filter.field] = filter.value;
        } else if (filter.operator == FilterOperator.NOT_EQUALS) {
            where[filter.field] = Not(filter.value);
        }

        //Match
        if (filter.operator == FilterOperator.LIKE) {
            where[filter.field] = Like(filter.value);
        } else if (filter.operator == FilterOperator.NOT_EQUALS)
            where[filter.field] = Not(Like(filter.value));

        //In
        if (filter.operator == FilterOperator.IN) {
            where[filter.field] = In(JSON.parse(filter.valueToString));
        } else if (filter.operator == FilterOperator.NOT_IN)
            where[filter.field] = Not(In(JSON.parse(filter.valueToString)));

    }
}
