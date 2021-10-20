import INotificationRepository from "@/notifications/domain/repositories/iNotificationRepository";
import {IDTOMapper} from "@/framework/domain/mapper/iMapper";
import Notification from "@/notifications/domain/models/notification";
import {ICriteria, IListQueryResult} from "@/framework/domain/criteria/iCriteria";


export default class NotificationsCrud {

    private repository: INotificationRepository;
    private dTOMapper: IDTOMapper<Notification>;

    public constructor(repository: INotificationRepository, dTOMapper: IDTOMapper<Notification>) {
        this.repository = repository;
        this.dTOMapper = dTOMapper;
    }

    public async get(criteria: ICriteria): Promise<IListQueryResult<Notification>> {

        return await this.repository.paginateNotifications(criteria)
            .then((result: IListQueryResult<Notification>) => {
                result.rows = result.rows.map((x) => this.dTOMapper.toDTO(x));
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
                return this.dTOMapper.toDTO(result);
            }).catch((err) => {
                return Promise.reject(err);
            });
    }

    public async save(params: any): Promise<Notification> {

        try {

            let notification: Notification = this.dTOMapper.toDomain(params);

            return await this.repository.saveNotification(notification)
                .then((result: Notification) => {
                    return this.dTOMapper.toDTO(result);
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
                .then((result: Notification) => {
                    if (!result)
                        return Promise.reject('No se encuentra la notificación');

                    console.log(result);

                    //this.notificationsCrud.save(notification);

                }).catch((err) => {
                    return Promise.reject(err);
                });

        } catch (err) {
            return Promise.reject(err);
        }

    }


}