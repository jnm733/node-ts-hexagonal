
import path from 'path';
import * as dotenv from "dotenv";
import os from "os";
import {getBoolean} from "@/framework/modules/framework/infraestructure/utils/parseUtils";

enum DB_DRIVER {
    mysql = 1,
}

interface IConfiguration {
    app: string;
    port: number;
    env: string;
    numWorkers: number;
    baseApi: string;
    staticServer: boolean;
    publicPath: string;
    viewsPath: string;
    runCrons: boolean;
    dbConfig?: IDBConfiguration;
}

interface IDBConfiguration {
    dbDriver: DB_DRIVER,
    dbHost: string,
    dbPort: number,
    dbUser: string,
    dbPassword: string,
    dbName: string,
    dbPool?: boolean,
    dbPoolLimit?: number,
}

const default_config: IConfiguration = {
    app: undefined,
    port: 8000,
    env: 'development',
    numWorkers: os.cpus().length,
    baseApi: '/api/v1/',
    staticServer: false,
    publicPath: '../assets',
    viewsPath: '../views',
    runCrons: true,
};

class Configuration {

    public app: string;
    public port: number;
    public env: string;
    public numWorkers: number;
    public baseApi: string;
    public staticServer: boolean;
    public publicPath: string;
    public viewsPath: string;
    public runCrons: boolean;
    public dbConfig?: IDBConfiguration;

    constructor() {

        //Loading .env file
        dotenv.config();

        //General
        this.app = process.env.APP_NAME || default_config.app;
        this.port = +process.env.PORT || default_config.port;
        this.env = process.env.NODE_ENV || default_config.env;
        this.numWorkers = process.env.NUM_WORKERS as any || default_config.numWorkers;
        this.baseApi = process.env.BASE_API || default_config.baseApi;
        this.staticServer = getBoolean(process.env.STATIC_SERVER || default_config.staticServer);
        this.publicPath = process.env.PUBLIC_PATH || default_config.publicPath;
        this.publicPath = path.resolve(__dirname,this.publicPath);
        this.viewsPath = process.env.VIEWS_PATH || default_config.viewsPath;
        this.viewsPath = path.resolve(__dirname,this.viewsPath);
        this.runCrons = getBoolean(process.env.RUN_CRONS || default_config.runCrons);

        //Database
        let dbDriver = DB_DRIVER[process.env.DB_DRIVER as any] as unknown as DB_DRIVER || undefined;
        if (dbDriver) {
            this.dbConfig = {
                dbDriver: dbDriver,
                dbHost: process.env.DB_HOST,
                dbPort: +process.env.DB_PORT,
                dbName: process.env.DB_NAME,
                dbUser: process.env.DB_USER,
                dbPassword: process.env.DB_PASSWORD,
                dbPool: getBoolean(process.env.DB_POOL || false),
                dbPoolLimit: +process.env.DB_CONNECTION_LIMIT
            }
        }

    }

    public static init() {
        return new this();
    }

}

export {IConfiguration, Configuration, DB_DRIVER}