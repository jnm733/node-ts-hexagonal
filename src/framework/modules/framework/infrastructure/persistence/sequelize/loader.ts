import { IConfiguration } from "@/framework/modules/framework/infrastructure/config/config";
const { Sequelize } = require('sequelize');

enum IConnectionsModes {
    "POOL" = 1,
    "SINGLE" = 2
}

export default class SequelizeLoader {

    mode: IConnectionsModes;
    connection: any;

    private constructor(configuration: IConfiguration) {

        this.mode = (configuration.dbConfig.dbPool) ? IConnectionsModes.POOL : IConnectionsModes.SINGLE;

        let connParams: {[key: string]: any} = {
            dialect: 'mysql',
            host: configuration.dbConfig.dbHost,
            port: configuration.dbConfig.dbPort,
            dialectOptions: {
                multipleStatements: true,
            },
            define: {
                charset: 'utf8mb4'
            },
        };

        if (this.mode == IConnectionsModes.POOL) {
            connParams.pool = {
                max: configuration.dbConfig.dbPoolLimit || 10,
                min: 0,
            };
        }

        this.connection = new Sequelize(configuration.dbConfig.dbName, configuration.dbConfig.dbUser, configuration.dbConfig.dbPassword, connParams);
    }

    public static createConnection(configuration: IConfiguration) {
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