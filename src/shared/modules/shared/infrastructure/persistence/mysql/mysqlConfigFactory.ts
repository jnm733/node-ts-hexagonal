import MysqlConfig from "@/shared/modules/shared/infrastructure/persistence/mysql/mysqlConfig";

export default class MysqlConfigFactory {
    static createConfig(config: any): MysqlConfig {
        return {
            host: config.get('mysql.host'),
            port: config.get('mysql.port'),
            user: config.get('mysql.user'),
            password: config.get('mysql.password'),
            name: config.get('mysql.name'),
            pool: config.get('mysql.pool'),
            poolLimit: config.get('mysql.poolLimit'),
        };
    }
}