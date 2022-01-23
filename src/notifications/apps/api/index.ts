require('module-alias/register');

import { IConfiguration, Configuration } from "@/framework/modules/framework/infrastructure/config/config";
import ExpressServer from "@/framework/modules/framework/infrastructure/express/server";
import ExpressClusterServer from "@/framework/modules/framework/infrastructure/express/clusterServer";
import IExpressServer from "@/framework/modules/framework/infrastructure/express/iServer";

import mainRouter from "@/notifications/apps/api/routes"

async function start() {

    //Load config
    const config: IConfiguration = Configuration.init();

    //Init server
    let server: IExpressServer;
    if (config.numWorkers > 0) {
        server = new ExpressClusterServer(config, mainRouter());
    } else {
        server = new ExpressServer(config, mainRouter());
    }

    //Start server
    await server.start();

}

start();
