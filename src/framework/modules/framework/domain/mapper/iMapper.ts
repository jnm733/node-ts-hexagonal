
export interface IPersistenceMapper<DomainEntity> {
    toDomain(persistence: any): DomainEntity;
    toPersistence(domain: DomainEntity): any;
}

export interface IDTOMapper<DomainEntity, DTOEntity> {
    toDomain (dto: DTOEntity): {[key: string]: any};
    toDTO (domain: DomainEntity): DTOEntity;
}