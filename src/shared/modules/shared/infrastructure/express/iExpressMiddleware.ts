import {Request, Response} from "express";

export default interface IExpressMiddleware {

    validate(req: Request, res: Response, next: Function): Response;

}