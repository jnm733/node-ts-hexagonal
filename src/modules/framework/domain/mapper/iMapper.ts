
export interface IPersistenceMapper<DomainEntity> {
    toDomain(persistence: any): DomainEntity;
    toPersistence(domain: DomainEntity): any;
}

export interface IDTOMapper<DomainEntity> {
    toDomain (dto: any): DomainEntity;
    toDTO (domain: DomainEntity): any;
}