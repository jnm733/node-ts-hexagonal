import DateTimeValueObject from "@node-ts-hexagonal/shared/modules/shared/domain/value-objects/dateTimeValueObject";

export type Timestamps = {
    createdAt: DateTimeValueObject,
    updatedAt?: DateTimeValueObject,
    deletedAt?: DateTimeValueObject,
}