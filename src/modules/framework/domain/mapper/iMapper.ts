
export default interface IMapper<T> {
    persistenceToDomain (raw: any): T;
    domainToPersistence (t: T): any;
    dTOToDomain (raw: any): T;
    domainToDTO (t: T): any;
}