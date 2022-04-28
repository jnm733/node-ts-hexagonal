export abstract class EnumValueObject<T> {
    protected readonly _value: T;

    constructor(value: T, public readonly validValues: T[]) {
        this._value = value;
        this.checkValueIsValid(value);
    }

    public get value() {
        return this._value;
    }

    public checkValueIsValid(value: T): void {
        if (!this.validValues.includes(value)) {
            this.throwErrorForInvalidValue(value);
        }
    }

    protected abstract throwErrorForInvalidValue(value: T): void;
}
