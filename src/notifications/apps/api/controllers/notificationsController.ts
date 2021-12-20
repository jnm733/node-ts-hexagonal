import {Request, Response} from "express";
import {validationResult} from "express-validator";

import container from "@/notifications/apps/api/dependencyInjection";
import {IDTOMapper} from "@/framework/modules/framework/domain/mapper/iMapper";
import Criteria from "@/framework/modules/framework/domain/criteria/criteria";
import {IListQueryResult, orderDirection} from "@/framework/modules/framework/domain/criteria/iCriteria";
import NotificationsCrud from "@/notifications/modules/notifications/application/notificationsCrud";
import Notification from "@/notifications/modules/notifications/domain/models/notification";
import INotificationDTO from "@/notifications/modules/notifications/infraestructure/dtos/iNotificationDTO";
import {ICriteriaAPI} from "@/framework/modules/framework/domain/criteria/iCriteria";

export default class NotificationsController {

    public static async getNotifications(req: Request, res: Response): Promise<Response> {

        let notificationsCrud: NotificationsCrud = container.get('Notifications.NotificationsCRUD');
        let dTOMapper: IDTOMapper<Notification, INotificationDTO> = container.get('Notifications.NotificationDTOMap');

        let query = req.query as ICriteriaAPI;

        let criteria: Criteria = Criteria.parseFromQueryDict(query);
        if (criteria.order === undefined) {
            criteria.order = {
                orderBy: 'id',
                orderDir: orderDirection.DESC
            }
        }

        return await notificationsCrud.get(criteria)
            .then((result: IListQueryResult<Notification>) => {
                let resultDTO = result as unknown as IListQueryResult<INotificationDTO>;
                resultDTO.rows = result.rows.map((x: Notification) => dTOMapper.toDTO(x));
                return res.json({
                    ok: true,
                    data: resultDTO,
                });
            }).catch((err) => {
                return res.status(404).json({
                    ok: false,
                });
            });
    }

    public static async notification(req: Request, res: Response): Promise<Response> {

        let notificationsCrud: NotificationsCrud = container.get('Notifications.NotificationsCRUD');
        let dTOMapper: IDTOMapper<Notification, INotificationDTO> = container.get('Notifications.NotificationDTOMap');

        return await notificationsCrud.find(req.params.id)
            .then((notification: Notification) => {
                return res.json({
                    ok: true,
                    data: dTOMapper.toDTO(notification),
                });
            }).catch((err) => {
                return res.status(404).json({
                    ok: false,
                });
            });
    }

    public static async saveNotification(req: Request, res: Response) {

        let notificationsCrud: NotificationsCrud = container.get('Notifications.NotificationsCRUD');
        let dTOMapper: IDTOMapper<Notification, INotificationDTO> = container.get('Notifications.NotificationDTOMap');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                ok: false,
                errors: errors.mapped()
            });
        }

        let params = req.body as INotificationDTO;

        return await notificationsCrud.save(dTOMapper.toDomain(params))
            .then((notification: Notification) => {
                return res.json({
                    ok: true,
                    data: dTOMapper.toDTO(notification),
                });
            }).catch((err) => {
                return res.status(422).json({
                    ok: false,
                    errors: err.message
                });
            });

    }

    public static async updateNotification(req: Request, res: Response) {

        let notificationsCrud: NotificationsCrud = container.get('Notifications.NotificationsCRUD');
        let dTOMapper: IDTOMapper<Notification, INotificationDTO> = container.get('Notifications.NotificationDTOMap');

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                ok: false,
                errors: errors.array()
            });
        }

        return await notificationsCrud.update(req.params.id, req.body)
            .then((notification: Notification) => {
                return res.json({
                    ok: true,
                    data: dTOMapper.toDTO(notification),
                });
            }).catch((err) => {
                return res.status(422).json({
                    ok: false,
                    errors: err.message
                });
            });

    }

    public static async deleteNotification(req: Request, res: Response) {

        let notificationsCrud: NotificationsCrud = container.get('Notifications.NotificationsCRUD');

        return await notificationsCrud.delete(req.params.id)
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
