import { Router, Response, Request } from 'express';
import PromiseRouter from "express-promise-router";

import validateSchemaMiddleware from "@/shared/modules/shared/infrastructure/expresValidator/validatorMiddleware";

import container from "@/notifications/apps/api/dependencyInjection";
import saveNotification from "@/notifications/apps/api/routes/notifications/validator/saveNotification";
import NotificationsGetController from "@/notifications/apps/api/controllers/notifications/notificationsGetController";
import NotificationsFindController from "@/notifications/apps/api/controllers/notifications/notificationsFindController";
import NotificationsSaveController from "@/notifications/apps/api/controllers/notifications/notificationsSaveController";
import NotificationsUpdateController from "@/notifications/apps/api/controllers/notifications/notificationsUpdateController";

export default () => {

    const router: Router = PromiseRouter();

    const notificationsGetController: NotificationsGetController = container.get('Notifications.Infrastructure.Controllers.NotificationsGetController');
    const notificationsFindController: NotificationsFindController = container.get('Notifications.Infrastructure.Controllers.NotificationsFindController');
    const notificationsSaveController: NotificationsSaveController = container.get('Notifications.Infrastructure.Controllers.NotificationsSaveController');
    const notificationsUpdateController: NotificationsUpdateController = container.get('Notifications.Infrastructure.Controllers.NotificationsUpdateController');
    const notificationsDeleteController: NotificationsUpdateController = container.get('Notifications.Infrastructure.Controllers.NotificationsDeleteController');

    /** Notifications **/
    router.get('/', (req: Request, res: Response) => notificationsGetController.run(req, res));
    router.get('/:id', (req: Request, res: Response) => notificationsFindController.run(req, res));
    router.post('/', saveNotification, validateSchemaMiddleware, (req: Request, res: Response) => notificationsSaveController.run(req, res));
    router.put('/:id', saveNotification, validateSchemaMiddleware, (req: Request, res: Response) => notificationsUpdateController.run(req, res));
    router.delete('/:id', (req: Request, res: Response) => notificationsDeleteController.run(req, res));

    /** Notifications Shipments **/
    // let base_group = '/:id_notification/shipments/';
    // notificationsRouter.get(base_group+'', NotificationsShipmentsController.getShipments);
    // notificationsRouter.get(base_group+':id', NotificationsShipmentsController.shipment);
    // notificationsRouter.post(base_group+'', NotificationShipment.getValidationSchema(), NotificationsShipmentsController.saveShipment);
    // notificationsRouter.put(base_group+":id_shipment", NotificationShipment.getValidationSchema(), NotificationsShipmentsController.updateShipment);
    // notificationsRouter.delete(base_group+":id_shipment", NotificationsShipmentsController.deleteShipment);

    return router;
};
