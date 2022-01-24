type MysqlConfig = {
    host: string,
    port: number,
    user: string,
    password: string,
    name: string,
    pool?: boolean,
    poolLimit?: number,
};

export default MysqlConfig;