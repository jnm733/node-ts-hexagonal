const { Sequelize } = require('sequelize');

import MysqlConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/mysql/mysqlConfig";

enum IConnectionsModes {
    "POOL" = 1,
    "SINGLE" = 2
}

export default class SequelizeConnectionFactory {

    mode: IConnectionsModes;
    connection: any;

    private constructor(configuration: MysqlConfig) {

        this.mode = (configuration.numConnections > 1) ? IConnectionsModes.POOL : IConnectionsModes.SINGLE;

        let connParams: {[key: string]: any} = {
            dialect: 'mysql',
            host: configuration.host,
            port: configuration.port,
            dialectOptions: {
                multipleStatements: true,
            },
            define: {
                charset: configuration.charset || 'utf8mb4'
            },
        };

        if (this.mode == IConnectionsModes.POOL) {
            connParams.pool = {
                max: configuration.numConnections || 10,
                min: 0,
            };
        }

        this.connection = new Sequelize(configuration.name, configuration.username, configuration.password, connParams);
    }

    public static createConnection(configuration: MysqlConfig) {
        return new this(configuration);
    }

    public async health() {
        return await this.connection.authenticate()
            .then((res: any) => {
                return true;
            })
            .catch((err: any) => {
                console.error('[Sequelize]','Error on connecting to database', err.message);
                return err;
            });
    }

}
