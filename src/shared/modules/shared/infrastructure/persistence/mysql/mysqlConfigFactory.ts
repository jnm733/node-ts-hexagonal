import MysqlConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/mysql/mysqlConfig";

export default class MysqlConfigFactory {
    static createConfig(config: any): MysqlConfig {
        return {
            host: config.get('mysql.host'),
            port: config.get('mysql.port'),
            username: config.get('mysql.username'),
            password: config.get('mysql.password'),
            name: config.get('mysql.name'),
            numConnections: config.get('mysql.numConnections'),
            charset: config.get('mysql.charset'),
        };
    }
}