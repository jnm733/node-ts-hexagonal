type TypeOrmConfig = {
    type: 'mysql' | 'mariadb' | 'postgres',
    host: string,
    port: number,
    username: string,
    password: string,
    name: string,
    numConnections: number,
    charset: string,
    dateStrings?: boolean,
    entitiesDir?: string,
};

export default TypeOrmConfig;