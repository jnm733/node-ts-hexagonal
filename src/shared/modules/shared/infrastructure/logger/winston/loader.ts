import winston from 'winston';

export default class WinstonLoader {

    public logger;

    constructor(configuration: any) {

        const transports = [];

        if (configuration.env === 'development') {
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
            return logger.info.apply(logger, arguments)
        }
        console.error = function(){
            return logger.error.apply(logger, arguments)
        }
        console.info = function(){
            return logger.warn.apply(logger, arguments)
        }

    }

}