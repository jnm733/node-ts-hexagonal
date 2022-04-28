import {RabbitMQExchange} from "@node-ts-hexagonal/shared/modules/shared/infrastructure/message-broker/rabbitmq/rabbitMQMessageBroker";

type RabbitMQConfig = {
    host: string,
    port: number,
    vhost: string,
    user: string,
    password: string,
    defaultExchange: RabbitMQExchange
};

export default RabbitMQConfig;