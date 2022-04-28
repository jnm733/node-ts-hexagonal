
export enum FilterOperator {
    EQUALS = '=',
    NOT_EQUALS = '!=',
    GREATER = '>',
    GREATER_EQUALS = '>=',
    LOWER = '<',
    LOWER_EQUALS = '<=',
    LIKE = 'LIKE',
    NOT_LIKE = 'NOT LIKE',
    IN = 'IN',
    NOT_IN = 'NOT IN',
}

export default class Filter {

    private constructor(readonly field: string, readonly operator: FilterOperator, readonly value: string | number | boolean ) {}

    static create(field: string, operator: FilterOperator, value: string | number | boolean) {
        return new this(field, operator, value);
    }

    static createFromString(field: string, operator: string, value: string | number | boolean): Filter {

        let equalsValues = ['=', '==', '==='];
        let notEqualsValues = ['!=', '!==', '!==='];
        let greaterValues = ['>'];
        let greaterEqualsValues = ['>='];
        let lowerValues = ['<'];
        let lowerEqualsValues = ['<='];
        let likeValues = ['LIKE', 'like', 'CONTAINS', 'contains'];
        let notLikeValues = ['NOT LIKE', 'not like', 'NOT CONTAINS', 'not contains'];
        let inValues = ['IN', 'in'];
        let notInValues = ['NOT IN', 'not in'];

        let operatorObject: FilterOperator;

        if (equalsValues.includes(operator))
            operatorObject = FilterOperator.EQUALS;
        else if (notEqualsValues.includes(operator))
            operatorObject = FilterOperator.NOT_EQUALS;
        else if (greaterValues.includes(operator))
            operatorObject = FilterOperator.GREATER;
        else if (greaterEqualsValues.includes(operator))
            operatorObject = FilterOperator.GREATER_EQUALS;
        else if (lowerValues.includes(operator))
            operatorObject = FilterOperator.LOWER;
        else if (lowerEqualsValues.includes(operator))
            operatorObject = FilterOperator.LOWER_EQUALS;
        else if (likeValues.includes(operator))
            operatorObject = FilterOperator.LIKE;
        else if (notLikeValues.includes(operator))
            operatorObject = FilterOperator.NOT_LIKE;
        else if (inValues.includes(operator))
            operatorObject = FilterOperator.IN;
        else if (notInValues.includes(operator))
            operatorObject = FilterOperator.NOT_IN;
        else
            operatorObject = FilterOperator.EQUALS;

        return new this(field, operatorObject, value);

    }

    public equals(filter: Filter): boolean {
        return this.field == filter.field;
    }

    get valueToString(): string {
        return ""+this.value;
    }
}