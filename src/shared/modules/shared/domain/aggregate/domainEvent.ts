import UuidValueObject from "@node-ts-hexagonal/shared/modules/shared/domain/value-objects/uuidValueObject";
import DateTimeValueObject from "@node-ts-hexagonal/shared/modules/shared/domain/value-objects/dateTimeValueObject";

export type DomainEventDTO = {
    id: string,
    name: string,
    createdOn: number,
    attributes: {
        id: string,
        props: {[field: string]: any}
    },
    meta: {[field: string]: any}
}

export abstract class DomainEvent<PropsSchema> {

    protected id: UuidValueObject;
    protected _name: string;
    protected createdOn: DateTimeValueObject;
    protected metaInfo: object;
    protected readonly _aggregateId: string | number | UuidValueObject;
    protected readonly props: PropsSchema;

    constructor (name: string, aggregateId: string | number | UuidValueObject, props: PropsSchema, id?: string, metaInfo?: object, createdOn?: DateTimeValueObject) {
        this.id = UuidValueObject.create(id)
        this._name = name;
        this.createdOn = createdOn || DateTimeValueObject.now()
        this.metaInfo = metaInfo || {}
        this._aggregateId = aggregateId;
        this.props = props;
    }

    public get aggregateId(): string | number | UuidValueObject {
        return this._aggregateId;
    }

    public get name(): string {
        return this._name;
    }

    protected abstract toPrimitiveProps(): object;

    public toPrimitive(): DomainEventDTO {
        return {
            id: this.id.toString(),
            name: this.name,
            createdOn: this.createdOn.toUnix(),
            attributes: {
                id: this.aggregateId.toString(),
                props: this.toPrimitiveProps()
            },
            meta: this.metaInfo
        };
    }

}
