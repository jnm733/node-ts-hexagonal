import {Request, Response} from "express";
import IExpressMiddleware from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/iExpressMiddleware";
import ExpressConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/config/expressConfig";
type AuthMethod = 'BASIC' | 'BEARER';

export default class ExpressAuthMiddleware implements IExpressMiddleware{

    constructor(private method: AuthMethod, private username?: string, private password?: string) {}

    public static create(config: ExpressConfig) {
        if (!config.auth)
            throw new Error('[ExpressAuthMiddleware]: Auth config not provided');

        return new this(config.auth.method, config.auth.username, config.auth.password);
    }

    public validate(req: Request, res: Response, next: Function): Response {

        let authenticated = false;

        switch (this.method) {
            case "BASIC":

                const str = this.username+':'+this.password;
                const buff = Buffer.from(str);
                const token = buff.toString('base64');
                authenticated = req.header('Authorization') === 'Basic '+token;

                break;

            case "BEARER":
                //todo
                break;
        }

        if (authenticated) {
            return next();
        }

        return res.status(403).json({
            ok: false,
        });

    };

}