//Load module-alias only if is not TS execution for ts-node-dev
if (process.env.NODE_EXEC !== 'ts')
    require('module-alias/register');

import ExpressServer from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/expressServer";
import ExpressClusterServer from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/expressClusterServer";
import IExpressServer from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/iExpressServer";
import ExpressConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/config/expressConfig";

import container from "@node-ts-hexagonal/backend/apps/api/dependency-injection";
import mainRouter from "@node-ts-hexagonal/backend/apps/api/routes";

try {

    //Express config
    const expressConfig: ExpressConfig = container.get('Backend.Shared.Infrastructure.ExpressConfig');

    //Logger
    /*const logger: ILogger = container.get('Backend.Shared.Infrastructure.Logger');
    logger.info('[Logger]: Logger initialized');*/

    //Init server
    let server: IExpressServer;
    if (expressConfig.numWorkers > 0) {
        server = new ExpressClusterServer(expressConfig, mainRouter());
    } else {
        server = new ExpressServer(expressConfig, mainRouter());
    }

    //Start server
    server.start();

} catch (e) {
    console.log(e);
    process.exit(1);
}

process.on('uncaughtException', err => {
    console.log('uncaughtException', err);
    process.exit(1);
});

