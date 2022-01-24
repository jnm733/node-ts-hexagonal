import {Request, Response} from "express";
const os = require("os");

import {IController} from "@/shared/modules/shared/infrastructure/controllers/iController";

export default class StatusGetController implements IController{

    public async run(req: Request, res: Response): Promise<Response> {

        return res.json({
            app: process.env.APP_NAME,
            host: os.hostname(),
            cpus: os.cpus().length,
            uptime: os.uptime()
        });

    }

}