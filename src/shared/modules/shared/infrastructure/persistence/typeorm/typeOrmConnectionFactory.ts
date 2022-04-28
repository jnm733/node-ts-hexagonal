import {DataSource} from "typeorm";

import TypeOrmConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/typeorm/typeOrmConfig";

export default class TypeOrmConnectionFactory {

    private static connections: { [key: string]: DataSource } = {};

    public static async createConnection(contextDir: string, config: TypeOrmConfig): Promise<DataSource> {
        let connection = TypeOrmConnectionFactory.getConnection(contextDir);

        if (!connection) {
            connection = await TypeOrmConnectionFactory.createAndConnect(contextDir, config);

            TypeOrmConnectionFactory.registerConnection(connection, contextDir);
        }

        return connection;
    }

    private static getConnection(contextName: string): DataSource | null {
        return TypeOrmConnectionFactory.connections[contextName];
    }

    private static async createAndConnect(contextDir: string, config: TypeOrmConfig): Promise<DataSource> {

        let appDataSource = new DataSource({
            type: config.type,
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.name,
            charset: config.charset,
            dateStrings: config.dateStrings,
            pool: {
                min: 1,
                max: config.numConnections,
            },
            synchronize: true,
            entities: [__dirname + '/../../../../../../'+contextDir+'/**/infrastructure/**/typeorm/**/*Entity{.js,.ts}'],
        });

        return appDataSource.initialize();
    }

    private static registerConnection(connection: DataSource, contextName: string): void {
        TypeOrmConnectionFactory.connections[contextName] = connection;
    }

    public static health(contextName: string): void {

        let connection = TypeOrmConnectionFactory.getConnection(contextName);

        if (!connection)
            throw new Error('[TypeOrmClientFactory]: Connection '+contextName+' not found');

        connection.query('SHOW STATUS;').catch((err) => { throw new Error('[TypeOrmClientFactory]: Error on '+contextName+': '+err) });
    }

}
