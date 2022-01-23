import {ContainerBuilder, Reference} from "node-dependency-injection";

import NotificationsCrud from "@/notifications/modules/notifications/application/notificationsCrud";
import NotificationPersistenceMap
    from "@/notifications/modules/notifications/infrastructure/mapper/notificationPersistenceMap";
import NotificationDTOMap from "@/notifications/modules/notifications/infrastructure/mapper/notificationDTOMap";
import NotificationRepositorySequelize
    from "@/notifications/modules/notifications/infrastructure/persistence/notificationRepositorySequelize";
import NotificationsFindController from "@/notifications/apps/api/controllers/notifications/notificationsFindController";
import NotificationsGetController from "@/notifications/apps/api/controllers/notifications/notificationsGetController";
import NotificationsSaveController from "@/notifications/apps/api/controllers/notifications/notificationsSaveController";
import NotificationsUpdateController from "@/notifications/apps/api/controllers/notifications/notificationsUpdateController";
import NotificationsDeleteController from "@/notifications/apps/api/controllers/notifications/notificationsDeleteController";

export default (container: ContainerBuilder) => {

    //Mappers
    container
        .register('Notifications.Infrastructure.Mappers.NotificationPersistenceMap', NotificationPersistenceMap);
    container
        .register('Notifications.Infrastructure.Mappers.NotificationDTOMap', NotificationDTOMap);

    //Controllers
    container
        .register('Notifications.Infrastructure.Controllers.NotificationsGetController', NotificationsGetController)
        .addArgument(new Reference('Notifications.Application.UseCases.NotificationsCRUD'))
        .addArgument(new Reference('Notifications.Infrastructure.Mappers.NotificationDTOMap'));
    container
        .register('Notifications.Infrastructure.Controllers.NotificationsFindController', NotificationsFindController)
        .addArgument(new Reference('Notifications.Application.UseCases.NotificationsCRUD'))
        .addArgument(new Reference('Notifications.Infrastructure.Mappers.NotificationDTOMap'));
    container
        .register('Notifications.Infrastructure.Controllers.NotificationsSaveController', NotificationsSaveController)
        .addArgument(new Reference('Notifications.Application.UseCases.NotificationsCRUD'))
        .addArgument(new Reference('Notifications.Infrastructure.Mappers.NotificationDTOMap'));
    container
        .register('Notifications.Infrastructure.Controllers.NotificationsUpdateController', NotificationsUpdateController)
        .addArgument(new Reference('Notifications.Application.UseCases.NotificationsCRUD'))
        .addArgument(new Reference('Notifications.Infrastructure.Mappers.NotificationDTOMap'));
    container
        .register('Notifications.Infrastructure.Controllers.NotificationsDeleteController', NotificationsDeleteController)
        .addArgument(new Reference('Notifications.Application.UseCases.NotificationsCRUD'))
        .addArgument(new Reference('Notifications.Infrastructure.Mappers.NotificationDTOMap'));

    //Repositories
    container
        .register('Notifications.Domain.Repositories.NotificationRepository', NotificationRepositorySequelize)
        .addArgument(new Reference('Framework.Infrastructure.Sequelize'))
        .addArgument(new Reference('Notifications.Infrastructure.Mappers.NotificationPersistenceMap'));

    //Use Cases
    container
        .register('Notifications.Application.UseCases.NotificationsCRUD', NotificationsCrud)
        .addArgument(new Reference('Notifications.Domain.Repositories.NotificationRepository'));

}