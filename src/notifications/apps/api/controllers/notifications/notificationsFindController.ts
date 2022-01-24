import {Request, Response} from "express";

import {IDTOMapper} from "@/shared/modules/shared/domain/mapper/iMapper";
import NotificationsCrud from "@/notifications/modules/notifications/application/notificationsCrud";
import Notification from "@/notifications/modules/notifications/domain/models/notification";
import INotificationDTO from "@/notifications/modules/notifications/infrastructure/dtos/iNotificationDTO";
import {IController} from "@/shared/modules/shared/infrastructure/controllers/iController";

export default class NotificationsFindController implements IController{

    public constructor(private notificationsCrud: NotificationsCrud, private dTOMapper: IDTOMapper<Notification, INotificationDTO>) {}

    public async run(req: Request, res: Response): Promise<Response> {

        return await this.notificationsCrud.find(req.params.id)
            .then((notification: Notification) => {
                return res.json({
                    ok: true,
                    data: this.dTOMapper.toDTO(notification),
                });
            }).catch((err) => {
                return res.status(404).json({
                    ok: false,
                });
            });
    }

}
