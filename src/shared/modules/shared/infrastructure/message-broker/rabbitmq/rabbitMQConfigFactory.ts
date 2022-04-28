import RabbitMQConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/message-broker/rabbitmq/rabbitMQConfig";

export default class RabbitMQConfigFactory {
    static createConfig(config: any): RabbitMQConfig {
        return {
            host: config.get('rabbitMQ.host'),
            port: config.get('rabbitMQ.port'),
            vhost: config.get('rabbitMQ.vhost'),
            user: config.get('rabbitMQ.user'),
            password: config.get('rabbitMQ.password'),
            defaultExchange: {
                name: config.get('rabbitMQ.defaultExchangeName'),
                type: config.get('rabbitMQ.defaultExchangeType'),
            }
        };
    }
}