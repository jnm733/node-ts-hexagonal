import {Request, Response} from "express";
const os = require("os");

import {IHTTPController} from "@node-ts-hexagonal/shared/modules/shared/infrastructure/controllers/iHTTPController";

export default class StatusGetController implements IHTTPController{

    public async run(req: Request, res: Response): Promise<Response> {

        return res.json({
            app: process.env.APP_NAME,
            host: os.hostname(),
            cpus: os.cpus().length,
            uptime: os.uptime()
        });

    }

}