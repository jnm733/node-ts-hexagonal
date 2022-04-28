import winston from 'winston';

import GlobalConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/config/globalConfig";
import ILogger from "@node-ts-hexagonal/shared/modules/shared/domain/logger/iLogger";

export default class WinstonLoggerFactory implements ILogger {

    public logger;

    private constructor(config: GlobalConfig) {

        const transports = [];

        if (config.env === 'development') {
            transports.push(
                new winston.transports.Console()
            );
        } else {
            transports.push(
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.cli(),
                        winston.format.splat(),
                        winston.format.colorize(),
                    )
                })
            )
        }

        let logger = winston.createLogger({
            level: 'silly',
            levels: winston.config.npm.levels,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.errors({ stack: true }),
                winston.format.splat(),
                winston.format.json()
            ),
            transports
        });
        this.logger = logger;

        console.log = function(){
            // @ts-ignore
            return logger.info.apply(logger, arguments)
        }
        console.error = function(){
            // @ts-ignore
            return logger.error.apply(logger, arguments)
        }
        console.info = function(){
            // @ts-ignore
            return logger.warn.apply(logger, arguments)
        }

    }

    public static createLogger(env: GlobalConfig) {
        return new this(env);
    }

    debug(message: string) {
        this.logger.debug(message);
    }

    error(message: string | Error) {
        this.logger.error(message);
    }

    info(message: string) {
        this.logger.info(message);
    }
}