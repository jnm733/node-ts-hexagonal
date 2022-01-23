import {Request, Response} from "express";

import {IDTOMapper} from "@/framework/modules/framework/domain/mapper/iMapper";
import NotificationsCrud from "@/notifications/modules/notifications/application/notificationsCrud";
import Notification from "@/notifications/modules/notifications/domain/models/notification";
import INotificationDTO from "@/notifications/modules/notifications/infrastructure/dtos/iNotificationDTO";
import {IController} from "@/framework/modules/framework/infrastructure/controllers/iController";

export default class NotificationsSaveController implements IController{

    public constructor(private notificationsCrud: NotificationsCrud, private dTOMapper: IDTOMapper<Notification, INotificationDTO>) {}

    public async run(req: Request, res: Response): Promise<Response> {

        let params: INotificationDTO = req.body;

        return await this.notificationsCrud.save(this.dTOMapper.toDomain(params))
            .then((notification: Notification) => {
                return res.json({
                    ok: true,
                    data: this.dTOMapper.toDTO(notification),
                });
            }).catch((err) => {
                return res.status(422).json({
                    ok: false,
                    errors: err.message
                });
            });

    }

}
