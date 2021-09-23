
export enum validatorNumericTypes {
    FLOAT,
    INT
}

export interface IDomainValidatorResult {
    valid: boolean,
    msg: string
    value: any,
}

export default interface IDomainValidator {

    isEmail(value: any, field: string, options?: {[key: string]: any}): IDomainValidatorResult,

    isURL(value: any, field: string, options?: {[key: string]: any}): IDomainValidatorResult,

    isAlpha(value: any, field: string): IDomainValidatorResult,

    isAlphanumeric(value: any, field: string): IDomainValidatorResult,

    isBoolean(value: any, field: string): IDomainValidatorResult,

    isDate(value: any, field: string, format?: string): IDomainValidatorResult,

    isNotEmpty(value: any, field: string): IDomainValidatorResult,

    isNumeric(value: any, field: string, type?: validatorNumericTypes, min?: number, max?: number): IDomainValidatorResult,

    isIP(value: any, field: string): IDomainValidatorResult,

    isJSON(value: any, field: string): IDomainValidatorResult,

    isLength(value: any, field: string, min: number, max: number): IDomainValidatorResult,
}