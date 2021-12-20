import {ICriteria, IListQueryResult} from "@/framework/modules/framework/domain/criteria/iCriteria";
import INotificationRepository from "@/notifications/modules/notifications/domain/repositories/iNotificationRepository";
import Notification from "@/notifications/modules/notifications/domain/models/notification";

export default class NotificationsCrud {

    private repository: INotificationRepository;

    public constructor(repository: INotificationRepository) {
        this.repository = repository;
    }

    public async get(criteria: ICriteria): Promise<IListQueryResult<Notification>> {

        return await this.repository.paginateNotifications(criteria)
            .then((result: IListQueryResult<Notification>) => {
                return result;
            }).catch((err) => {
                return Promise.reject(err);
            });

    }

    public async find(id: string): Promise<Notification> {

        return await this.repository.findNotification(id)
            .then((result: Notification) => {
                if (!result)
                    return Promise.reject('No se encuentra la notificación');
                return result;
            }).catch((err) => {
                return Promise.reject(err);
            });
    }

    public async save(params: any): Promise<Notification> {

        try {

            let notification = Notification.create(params);

            return await this.repository.saveNotification(notification)
                .then((result: Notification) => {
                    //todo Publica evento de dominio
                    return result;
                }).catch((err) => {
                    return Promise.reject(err);
                });
        } catch (err) {
            return Promise.reject(err);
        }

    }

    public async update(id: any, params: any): Promise<Notification> {

        try {

            await this.repository.findNotification(id)
                .then((notification: Notification) => {
                    if (!notification)
                        return Promise.reject('No se encuentra la notificación');

                    this.repository.updateNotification(notification);

                }).catch((err) => {
                    return Promise.reject(err);
                });

        } catch (err) {
            return Promise.reject(err);
        }

    }

    public async delete(id: any): Promise<boolean> {

        try {

            await this.repository.findNotification(id)
                .then((notification: Notification) => {
                    if (!notification)
                        return Promise.reject('No se encuentra la notificación');

                    this.repository.deleteNotification(notification)
                        .then((res: boolean) => {
                            return res;
                        });

                }).catch((err) => {
                    return Promise.reject(err);
                });

        } catch (err) {
            return Promise.reject(err);
        }

    }


}
