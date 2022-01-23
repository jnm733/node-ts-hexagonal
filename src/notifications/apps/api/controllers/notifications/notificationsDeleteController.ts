import {Request, Response} from "express";

import {IDTOMapper} from "@/framework/modules/framework/domain/mapper/iMapper";
import NotificationsCrud from "@/notifications/modules/notifications/application/notificationsCrud";
import Notification from "@/notifications/modules/notifications/domain/models/notification";
import INotificationDTO from "@/notifications/modules/notifications/infrastructure/dtos/iNotificationDTO";
import {IController} from "@/framework/modules/framework/infrastructure/controllers/iController";

export default class NotificationsDeleteController implements IController{

    public constructor(private notificationsCrud: NotificationsCrud, private dTOMapper: IDTOMapper<Notification, INotificationDTO>) {}

    public async run(req: Request, res: Response): Promise<Response> {

        return await this.notificationsCrud.delete(req.params.id)
            .then((result: boolean) => {
                return res.json({
                    ok: result,
                });
            }).catch((err) => {
                return res.status(400).json({
                    ok: false,
                    errors: err.message
                });
            });

    }

}
