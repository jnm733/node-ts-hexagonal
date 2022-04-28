import Criteria from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/criteria";

export interface ICriteriaConverter<T> {

    toQuery(criteria: Criteria, {...extraParams}?): T

}