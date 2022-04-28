import TypeOrmConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/typeorm/typeOrmConfig";

export default class TypeOrmConfigFactory {
    static createConfig(config: any): TypeOrmConfig {
        return {
            type: config.get('database.type'),
            host: config.get('database.host'),
            port: config.get('database.port'),
            username: config.get('database.username'),
            password: config.get('database.password'),
            name: config.get('database.name'),
            numConnections: config.get('database.numConnections'),
            charset: config.get('database.charset'),
        };
    }
}