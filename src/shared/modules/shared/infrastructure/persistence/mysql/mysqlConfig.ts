type MysqlConfig = {
    host: string,
    port: number,
    username: string,
    password: string,
    name: string,
    numConnections: number,
    charset: string,
    dateStrings?: boolean,
};

export default MysqlConfig;