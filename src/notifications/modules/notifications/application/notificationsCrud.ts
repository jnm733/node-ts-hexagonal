import {ICriteria, IListQueryResult} from "@/framework/modules/framework/domain/criteria/iCriteria";
import INotificationRepository from "@/notifications/modules/notifications/domain/repositories/iNotificationRepository";
import Notification from "@/notifications/modules/notifications/domain/models/notification";

export default class NotificationsCrud {

    public constructor(private readonly repository: INotificationRepository) {}

    public async get(criteria: ICriteria): Promise<IListQueryResult<Notification>> {

        return await this.repository.paginateNotifications(criteria)
            .then((result: IListQueryResult<Notification>) => {
                return result;
            });

    }

    public async find(id: string): Promise<Notification> {

        return await this.repository.findNotification(id)
            .then((result: Notification) => {
                if (!result)
                    return Promise.reject('No se encuentra la notificación');
                return result;
            });
    }

    public async save(params: any): Promise<Notification> {

        let notification = Notification.create(params);

        return await this.repository.saveNotification(notification)
            .then((result: Notification) => {
                //todo Publica evento de dominio
                return result;
            });

    }

    public async update(id: any, params: any): Promise<Notification> {

        return await this.repository.findNotification(id)
            .then(async (notification: Notification) => {
                if (!notification)
                    return Promise.reject('No se encuentra la notificación');

                return await this.repository.updateNotification(notification);

            });

    }

    public async delete(id: any): Promise<boolean> {

        return await this.repository.findNotification(id)
            .then(async (notification: Notification) => {
                if (!notification)
                    return Promise.reject('No se encuentra la notificación');

                return await this.repository.deleteNotification(notification)
                    .then((res: boolean) => {
                        return res;
                    });

            });

    }


}
