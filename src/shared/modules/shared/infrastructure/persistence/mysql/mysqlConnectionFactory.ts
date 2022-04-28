import mysql, {Connection, ConnectionOptions, Pool} from "mysql2/promise";

import MysqlConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/mysql/mysqlConfig";

enum IConnectionsModes {
    "POOL" = 1,
    "SINGLE" = 2
}

export default class MysqlConnectionFactory {

    private static connections: { [key: string]: Connection | Pool } = {};

    public static async createConnection(contextName: string, config: MysqlConfig): Promise<Connection | Pool> {
        let connection = MysqlConnectionFactory.getConnection(contextName);

        if (!connection) {
            connection = await MysqlConnectionFactory.createAndConnect(config);

            MysqlConnectionFactory.registerConnection(connection, contextName);
        }

        return connection;
    }

    private static getConnection(contextName: string): Connection | Pool | null {
        return MysqlConnectionFactory.connections[contextName];
    }

    private static async createAndConnect(config: MysqlConfig): Promise<Connection | Pool> {
        let mode: IConnectionsModes = (config.numConnections > 1) ? IConnectionsModes.POOL : IConnectionsModes.SINGLE;

        let connParams: ConnectionOptions = {
            host: config.host,
            user: config.username,
            database: config.name,
            password: config.password,
            charset: config.charset,
            port: config.port,
            dateStrings: config.dateStrings,
        };

        if (mode == IConnectionsModes.POOL) {
            connParams.connectionLimit = config.numConnections;
            return mysql.createPool(connParams);
        } else
            return mysql.createConnection(connParams);
    }

    private static registerConnection(connection: Connection | Pool, contextName: string): void {
        MysqlConnectionFactory.connections[contextName] = connection;
    }

    public static health(contextName: string): void {

        let connection = MysqlConnectionFactory.getConnection(contextName);

        if (!connection)
            throw new Error('[MysqlConnectionFactory]: Connection '+contextName+' not found');

        connection.query('SHOW STATUS;').catch((err) => { throw new Error('[MysqlConnectionFactory]: Error on '+contextName+': '+err) });
    }

}
