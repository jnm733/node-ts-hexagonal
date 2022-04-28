import slug from 'slug';

import {StringValueObject} from "@node-ts-hexagonal/shared/modules/shared/domain/value-objects/stringValueObject";

export default class SlugValueObject extends StringValueObject{

    private constructor (value: string) {
        super(value);
    }

    static create(value: string): SlugValueObject {
        return new this(value);
    }

    static parse(value: string): SlugValueObject {
        return new this(slug(value));
    }
}