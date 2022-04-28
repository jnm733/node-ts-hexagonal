import ExpressConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/config/expressConfig";

export default class ExpressConfigFactory {
    static createConfig(config: any): ExpressConfig {
        return {
            port: config.get('express.port'),
            viewsPath: config.get('express.viewsPath'),
            publicPath: config.get('express.publicPath'),
            numWorkers: config.get('express.numWorkers'),
            auth: {
                method: config.get('express.auth.method'),
                username: config.get('express.auth.username'),
                password: config.get('express.auth.password'),
            },
        };
    }
}