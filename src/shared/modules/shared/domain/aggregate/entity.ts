import UuidValueObject from "@node-ts-hexagonal/shared/modules/shared/domain/value-objects/uuidValueObject";
import {Timestamps} from "@node-ts-hexagonal/shared/modules/shared/domain/aggregate/timestamps";
import DateTimeValueObject from "@node-ts-hexagonal/shared/modules/shared/domain/value-objects/dateTimeValueObject";

type EntityId = string | number | UuidValueObject;

export abstract class Entity<PropsSchema> {
    protected readonly _id?: EntityId;
    protected readonly props: PropsSchema;
    protected readonly _timestamps: Timestamps;

    constructor (props: PropsSchema, id?: EntityId, timestamps?: Timestamps) {
        this._id = id !== undefined ? id : UuidValueObject.create();
        this.props = props;
        if (timestamps)
            this._timestamps = timestamps;
        else {
            let now = DateTimeValueObject.now();
            this._timestamps = {
                createdAt: now,
                updatedAt: now
            }
        }
    }

    public get id() {
        return this._id;
    }

    public get timestamps() {
        return this._timestamps;
    }

    public updateTimestamp(value?: DateTimeValueObject) {
        this.timestamps.updatedAt = (value) ? value : DateTimeValueObject.now();
    }
}
