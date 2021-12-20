import {ContainerBuilder, Definition, Reference} from 'node-dependency-injection'

import ValidatorJS from "@/framework/modules/framework/infraestructure/validation/validatorjs/validatorJS";
import NotificationRepositorySequelize from "@/notifications/modules/notifications/infraestructure/persistence/notificationRepositorySequelize";
import NotificationDTOMap from "@/notifications/modules/notifications/infraestructure/mapper/notificationDTOMap";
import SequelizeLoader from "@/framework/modules/framework/infraestructure/persistence/sequelize/loader";
import NotificationPersistenceMap
    from "@/notifications/modules/notifications/infraestructure/mapper/notificationPersistenceMap";
import NotificationsCrud from "@/notifications/modules/notifications/application/notificationsCrud";
import {Configuration} from "@/framework/modules/framework/infraestructure/config/config";

let container = new ContainerBuilder();

//Config
let configDefinition = new Definition()
configDefinition.setFactory(Configuration, 'init')
container.setDefinition('Shared.Config', configDefinition)

//Database
container
    .register('Shared.Sequelize', SequelizeLoader)
    .addArgument(new Reference('Shared.Config'))

//Library for domain fields validations
container
    .register('Shared.DomainValidator', ValidatorJS)

//Notifications
container
    .register('Notifications.NotificationPersistenceMap', NotificationPersistenceMap)
container
    .register('Notifications.NotificationDTOMap', NotificationDTOMap)

container
    .register('Notifications.NotificationRepository', NotificationRepositorySequelize)
    .addArgument(new Reference('Shared.Sequelize'))
    .addArgument(new Reference('Notifications.NotificationPersistenceMap'));

container
    .register('Notifications.NotificationsCRUD', NotificationsCrud)
    .addArgument(new Reference('Notifications.NotificationRepository'))

export default container;
