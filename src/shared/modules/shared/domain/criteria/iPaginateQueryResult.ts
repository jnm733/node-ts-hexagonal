
export interface IPaginateQueryResult<T> {
    size: number,
    total_rows: number,
    total_filtered_rows?: number,
    rows: T[]
}