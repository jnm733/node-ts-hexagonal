export abstract class NumberValueObject {
    private readonly _value: number;

    constructor(value: number) {
        this._value = value;
    }

    get value(): number {
        return this._value;
    }

    equalsTo(other: NumberValueObject): boolean {
        return this.value === other.value;
    }
}
