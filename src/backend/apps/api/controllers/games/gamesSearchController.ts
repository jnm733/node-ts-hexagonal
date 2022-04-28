import {Request, Response} from "express";

import {IHTTPController} from "@node-ts-hexagonal/shared/modules/shared/infrastructure/controllers/iHTTPController";

export default class GamesSearchController implements IHTTPController {

    constructor() {}

    public async run(req: Request, res: Response): Promise<Response> {

        //Return response
        return res.json({
                ok: true,
            }
        );

    }
}