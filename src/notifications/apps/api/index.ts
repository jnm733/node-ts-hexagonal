require('module-alias/register');

import ExpressServer from "@/shared/modules/shared/infrastructure/express/expressServer";
import ExpressClusterServer from "@/shared/modules/shared/infrastructure/express/expressClusterServer";
import IExpressServer from "@/shared/modules/shared/infrastructure/express/iExpressServer";
import ExpressConfig from "@/shared/modules/shared/infrastructure/express/config/expressConfig";

import container from "@/notifications/apps/api/dependencyInjection";
import mainRouter from "@/notifications/apps/api/routes"

async function start() {

    //Express config
    const expressConfig: ExpressConfig = container.get('Shared.Infrastructure.ExpressConfig');

    //Init server
    let server: IExpressServer;
    if (expressConfig.numWorkers > 0) {
        server = new ExpressClusterServer(expressConfig, mainRouter());
    } else {
        server = new ExpressServer(expressConfig, mainRouter());
    }

    //Start server
    await server.start();

}

start();
