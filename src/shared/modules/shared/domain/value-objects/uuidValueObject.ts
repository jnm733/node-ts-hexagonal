import { v4 } from 'uuid';
import validate from 'uuid-validate';

import InvalidArgumentError from "@node-ts-hexagonal/shared/modules/shared/domain/exceptions/invalidArgumentError";

export default class UuidValueObject {

    private value: string;

    private constructor (value: string) {
        this.ensureIsValidUuid(value);

        this.value = value;
    }

    static create(id?: string): UuidValueObject {
        return new this(id ? id : v4());
    }

    private ensureIsValidUuid(id: string): void {
        if (!validate(id)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
        }
    }

    toString(): string {
        return this.value;
    }
}