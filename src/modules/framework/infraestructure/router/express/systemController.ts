import {Request, Response} from "express";

const os = require("os");

export default class SystemController {

    public static async live(req: Request, res: Response) {

        res.json({
            app: process.env.APP_NAME,
            host: os.hostname(),
            cpus: os.cpus().length,
            uptime: os.uptime()
        });

    }

}