type ExpressConfig = {
    port: number,
    viewsPath: string,
    publicPath: string,
    numWorkers: number,
    auth?: {
        method: 'BASIC' | 'BEARER',
        username: string,
        password: string,
    }
};

export default ExpressConfig;