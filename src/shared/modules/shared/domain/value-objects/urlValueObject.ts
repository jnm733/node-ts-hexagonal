import validator from 'validator';

import InvalidArgumentError from "@node-ts-hexagonal/shared/modules/shared/domain/exceptions/invalidArgumentError";

export default class UrlValueObject {

    private value: string;

    private constructor (value: string) {
        this.ensureIsValidUrl(value);

        this.value = value;
    }

    static create(url: string): UrlValueObject {
        return new this(url);
    }

    private ensureIsValidUrl(url: string): void {
        if (!validator.isURL(url)) {
            throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${url}>`);
        }
    }

    toString(): string {
        return this.value;
    }
}