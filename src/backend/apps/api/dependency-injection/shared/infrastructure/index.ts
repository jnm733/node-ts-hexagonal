import {ContainerBuilder, Definition, Reference} from "node-dependency-injection";

import GlobalConfigFactory from "@node-ts-hexagonal/shared/modules/shared/infrastructure/config/globalConfigFactory";
import TypeOrmConfigFactory
    from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/typeorm/typeOrmConfigFactory";
import TypeOrmConnectionFactory
    from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/typeorm/typeOrmConnectionFactory";
import RabbitMQConfigFactory
    from "@node-ts-hexagonal/shared/modules/shared/infrastructure/message-broker/rabbitmq/rabbitMQConfigFactory";
import RabbitMQMessageBroker
    from "@node-ts-hexagonal/shared/modules/shared/infrastructure/message-broker/rabbitmq/rabbitMQMessageBroker";
import ExpressConfigFactory
    from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/config/expressConfigFactory";

import config from "@node-ts-hexagonal/backend/config";

export default (container: ContainerBuilder) => {

    const prefix = 'Backend.Shared.Infrastructure';

    //Global config
    let globalConfigDefinition = new Definition()
    globalConfigDefinition.args = [config];
    globalConfigDefinition.setFactory(GlobalConfigFactory, 'createConfig')
    container.setDefinition(`${prefix}.GlobalConfig`, globalConfigDefinition);

    //Express config
    let expressConfigDefinition = new Definition()
    expressConfigDefinition.args = [config];
    expressConfigDefinition.setFactory(ExpressConfigFactory, 'createConfig')
    container.setDefinition(`${prefix}.ExpressConfig`, expressConfigDefinition);

    //MySQL config
    let typeOrmConfigDefinition = new Definition()
    typeOrmConfigDefinition.args = [config];
    typeOrmConfigDefinition.setFactory(TypeOrmConfigFactory, 'createConfig')
    container.setDefinition(`${prefix}.TypeOrmConfig`, typeOrmConfigDefinition);

    //Mysql connection
    let typeOrmConnectionDefinition = new Definition()
    typeOrmConnectionDefinition.args = ['backend', new Reference(`${prefix}.TypeOrmConfig`)];
    typeOrmConnectionDefinition.setFactory(TypeOrmConnectionFactory, 'createConnection')
    container.setDefinition(`${prefix}.TypeOrmConnection`, typeOrmConnectionDefinition);

    //RabbitMQ config
    let rabbitMQConfigDefinition = new Definition()
    rabbitMQConfigDefinition.args = [config];
    rabbitMQConfigDefinition.setFactory(RabbitMQConfigFactory, 'createConfig')
    container.setDefinition(`${prefix}.RabbitMQConfig`, rabbitMQConfigDefinition);

    //RabbitMQ MessageBroker
    container.register(`${prefix}.MessageBroker`, RabbitMQMessageBroker)
        .addArgument(new Reference(`${prefix}.RabbitMQConfig`));
}