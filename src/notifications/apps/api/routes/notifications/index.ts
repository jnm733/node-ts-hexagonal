import { Router } from 'express';

import saveNotification from "@/notifications/apps/api/routes/notifications/validator/saveNotification";
import NotificationsController from "@/notifications/apps/api/controllers/notificationsController";

export default () => {
    const notificationsRouter = Router();

    /** Notifications **/
    notificationsRouter.get('/', NotificationsController.getNotifications);
    notificationsRouter.get('/:id', NotificationsController.notification);
    notificationsRouter.post('/', saveNotification, NotificationsController.saveNotification);
    notificationsRouter.put('/:id', saveNotification, NotificationsController.updateNotification);
    notificationsRouter.delete('/:id', NotificationsController.deleteNotification);

    /** Notifications Shipments **/
    // let base_group = '/:id_notification/shipments/';
    // notificationsRouter.get(base_group+'', NotificationsShipmentsController.getShipments);
    // notificationsRouter.get(base_group+':id', NotificationsShipmentsController.shipment);
    // notificationsRouter.post(base_group+'', NotificationShipment.getValidationSchema(), NotificationsShipmentsController.saveShipment);
    // notificationsRouter.put(base_group+":id_shipment", NotificationShipment.getValidationSchema(), NotificationsShipmentsController.updateShipment);
    // notificationsRouter.delete(base_group+":id_shipment", NotificationsShipmentsController.deleteShipment);

    return notificationsRouter;
};
