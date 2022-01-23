import express, {Router} from "express";
import {IConfiguration} from "@/framework/modules/framework/infrastructure/config/config";

export default interface IExpressServer {

    app: express.Application;
    router: Router;
    configuration: IConfiguration;

    start(): void;

}