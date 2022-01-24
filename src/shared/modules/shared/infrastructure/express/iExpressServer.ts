import express, {Router} from "express";
import ExpressConfig from "@/shared/modules/shared/infrastructure/express/config/expressConfig";

export default interface IExpressServer {

    app: express.Application;
    router: Router;
    configuration: ExpressConfig;

    start(): void;

}