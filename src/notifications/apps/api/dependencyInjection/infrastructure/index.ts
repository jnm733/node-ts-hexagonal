import {ContainerBuilder, Definition, Reference} from "node-dependency-injection";

import SequelizeLoader from "@/shared/modules/shared/infrastructure/persistence/sequelize/loader";
import ValidatorJS from "@/shared/modules/shared/infrastructure/validation/validatorjs/validatorJS";
import ExpressConfigFactory from "@/shared/modules/shared/infrastructure/express/config/expressConfigFactory";
import MysqlConfigFactory from "@/shared/modules/shared/infrastructure/persistence/mysql/mysqlConfigFactory";
import GlobalConfigFactory from "@/shared/modules/shared/infrastructure/config/globalConfigFactory";

import config from "@/notifications/config";

export default (container: ContainerBuilder) => {

    //Global config
    let globalConfigDefinition = new Definition()
    globalConfigDefinition.args = [config];
    globalConfigDefinition.setFactory(GlobalConfigFactory, 'createConfig')
    container.setDefinition('Shared.Infrastructure.GlobalConfig', globalConfigDefinition);

    //Express config
    let expressConfigDefinition = new Definition()
    expressConfigDefinition.args = [config];
    expressConfigDefinition.setFactory(ExpressConfigFactory, 'createConfig')
    container.setDefinition('Shared.Infrastructure.ExpressConfig', expressConfigDefinition);

    //Mysql config
    let mysqlConfigDefinition = new Definition()
    mysqlConfigDefinition.args = [config];
    mysqlConfigDefinition.setFactory(MysqlConfigFactory, 'createConfig')
    container.setDefinition('Shared.Infrastructure.MysqlConfig', mysqlConfigDefinition);

    //Database
    let sequelizeDefinition = new Definition();
    sequelizeDefinition.args = [new Reference('Shared.Infrastructure.MysqlConfig')];
    sequelizeDefinition.setFactory(SequelizeLoader, 'createConnection');
    container.setDefinition('Shared.Infrastructure.Sequelize', sequelizeDefinition);

    //Library for domain fields validations
    container
        .register('Shared.Infrastructure.DomainValidator', ValidatorJS);

}