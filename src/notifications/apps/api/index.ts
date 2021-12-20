require('module-alias/register');

import { IConfiguration, Configuration } from "@/framework/modules/framework/infraestructure/config/config";
import ExpressServer from "@/framework/modules/framework/infraestructure/express/server";

import mainRouter from "@/notifications/apps/api/routes"

async function start() {

    //Load config
    const config: IConfiguration = Configuration.init();

    //Init server
    const server: ExpressServer = new ExpressServer(config, mainRouter());

    //Start server
    await server.start();

}

start();
