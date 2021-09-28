import INotificationRepository from "@/notifications/domain/repositories/iNotificationRepository";
import IMapper from "@/framework/domain/mapper/iMapper";
import Notification from "@/notifications/domain/models/notification";
import {ICriteria, IListQueryResult} from "@/framework/domain/criteria/iCriteria";


export default class NotificationsCrud {

    private repository: INotificationRepository;
    private mapper: IMapper<Notification>;

    public constructor(repository: INotificationRepository, mapper: IMapper<Notification>) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public async get(criteria: ICriteria): Promise<IListQueryResult<Notification>> {

        return await this.repository.paginateNotifications(criteria)
            .then((result: IListQueryResult<Notification>) => {
                result.rows = result.rows.map((x) => this.mapper.domainToDTO(x));
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
                return this.mapper.domainToDTO(result);
            }).catch((err) => {
                return Promise.reject(err);
            });
    }

    public async save(params: any): Promise<Notification> {

        try {

            let notification: Notification = this.mapper.dTOToDomain(params);

            return await this.repository.saveNotification(notification)
                .then((result: Notification) => {
                    return this.mapper.domainToDTO(result);
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