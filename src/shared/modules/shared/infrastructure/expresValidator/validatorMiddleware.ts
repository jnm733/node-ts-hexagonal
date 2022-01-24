import {Request, Response} from "express";
import {validationResult} from "express-validator";

export default function validateSchemaMiddleware(req: Request, res: Response, next: Function) {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    return res.status(422).json({
        ok: false,
        errors: errors.mapped()
    });

};