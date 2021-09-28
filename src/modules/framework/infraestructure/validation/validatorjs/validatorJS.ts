var validator = require('validator');

import IDomainValidator, {IDomainValidatorResult, validatorNumericTypes} from "@/framework/domain/validation/iDomainValidator";

export default class ValidatorJS implements IDomainValidator {

    public isEmail(value: any, field: string, options?: {[key: string]: any}): IDomainValidatorResult {

        let validate = validator.isEmail(value, options);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe ser un email válido' : '',
        }
    }

    public isURL(value: any, field: string, options?: {[key: string]: any}): IDomainValidatorResult {

        let validate = validator.isURL(value, options);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe ser una url válida' : '',
        }
    }

    public isAlpha(value: any, field: string): IDomainValidatorResult {

        let validate = validator.isAlpha(value);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' solo puede contener letras' : '',
        }
    }

    public isAlphanumeric(value: any, field: string): IDomainValidatorResult {

        let validate = validator.isAlphanumeric(value);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe ser alfanumérico' : '',
        }
    }

    public isBoolean(value: any, field: string): IDomainValidatorResult {

        let validate = validator.isBoolean(value);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe ser booleano' : '',
        }
    }

    public isDate(value: any, field: string, format= 'YYYY/MM/DD'): IDomainValidatorResult {

        let validate = validator.isdate(value, format);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe ser una fecha con el formato '+format : '',
        }
    }

    public isNotEmpty(value: any, field: string): IDomainValidatorResult {

        let validate = !(!value || value == '' || value == 0);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' es requerido' : '',
        }
    }

    public isNumeric(value: any, field: string, type?: validatorNumericTypes, min?: number, max?: number): IDomainValidatorResult {

        let options = {};
        let msg = '';

        if (min && max) {
            options = {'min': min, 'max': max};
            msg = 'entre '+min+' y '+max;
        } else if (min) {
            options = {'gt': min};
            msg = 'mayor que '+min;
        } else if (max) {
            options = {'lt': max};
            msg = 'menor que '+max;
        }

        let validate;
        if (type == validatorNumericTypes.FLOAT)
            validate = validator.isFloat(value, options);
        else
            validate = validator.isInt(value, options);


        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe ser un número con un valor '+msg : '',
        }
    }

    public isIP(value: any, field: string): IDomainValidatorResult {

        let validate = !validator.isIP(value);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe ser una IP válida' : '',
        }
    }

    public isJSON(value: any, field: string): IDomainValidatorResult {

        let validate = !validator.isJSON(value);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe tener un formato JSON válido' : '',
        }
    }

    public isLength(value: any, field: string, min: number, max: number): IDomainValidatorResult {

        let options = {};
        let msg = '';

        if (min && max) {
            options = {'min': min, 'max': max};
            msg = 'entre '+min+' y '+max;
        } else if (min) {
            options = {'min': min};
            msg = 'mayor que '+min;
        } else if (max) {
            options = {'max': max};
            msg = 'menor que '+max;
        }

        let validate = !validator.isLength(value, options);

        return {
            value: value,
            valid: validate,
            msg: (!validate) ? 'El campo '+field+' debe tener una longitud '+msg : '',
        }
    }
}