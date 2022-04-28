
export interface IMapper<DomainEntity, PrimitiveEntity> {
    toDomain(primitive: PrimitiveEntity): Promise<DomainEntity>;
    toPrimitive(domain: DomainEntity): Promise<PrimitiveEntity>;
}