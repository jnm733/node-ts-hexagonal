export enum orderDirection {
    ASC = 'ASC',
    DESC = 'DESC'
}

export interface ICriteriaOrder {
    orderBy: string,
    orderDir?: orderDirection
}

export interface ICriteria {
    offset?: number,
    limit?: number,
    order?: ICriteriaOrder,
    where?: {[key: string]: any},
    filters?: {[key: string]: any},
    fields?: {[key: string]: any},
}

export interface IListQueryResult<T> {
    total_rows: number,
    total_filtered_rows: number,
    rows: T[]
}