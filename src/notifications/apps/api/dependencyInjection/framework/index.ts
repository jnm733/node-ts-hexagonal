import {ContainerBuilder, Definition, Reference} from "node-dependency-injection";

import {Configuration} from "@/framework/modules/framework/infrastructure/config/config";
import SequelizeLoader from "@/framework/modules/framework/infrastructure/persistence/sequelize/loader";
import ValidatorJS from "@/framework/modules/framework/infrastructure/validation/validatorjs/validatorJS";

export default (container: ContainerBuilder) => {

    //Config
    let configDefinition = new Definition()
    configDefinition.setFactory(Configuration, 'init')
    container.setDefinition('Framework.Infrastructure.Config', configDefinition);

    //Database
    let sequelizeDefinition = new Definition();
    sequelizeDefinition.args = [new Reference('Framework.Infrastructure.Config')];
    sequelizeDefinition.setFactory(SequelizeLoader, 'createConnection');
    container.setDefinition('Framework.Infrastructure.Sequelize', sequelizeDefinition);

    //Library for domain fields validations
    container
        .register('Framework.Infrastructure.DomainValidator', ValidatorJS);

}