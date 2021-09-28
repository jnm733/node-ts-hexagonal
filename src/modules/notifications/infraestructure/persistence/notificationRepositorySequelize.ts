const { DataTypes } = require("sequelize");

import SequelizeRepository from "@/framework/infraestructure/persistence/sequelize/sequelizeRepository";
import Notification from "@/notifications/domain/models/notification";
import INotificationRepository from "../../domain/repositories/iNotificationRepository";
import IMapper from "@/framework/domain/mapper/iMapper";
import Criteria from "@/framework/domain/criteria/criteria";
import {IListQueryResult} from "@/framework/domain/criteria/iCriteria";

export default class NotificationRepositorySequelize extends SequelizeRepository<Notification> implements INotificationRepository {

    notificationsMapper: IMapper<Notification>;

    constructor(modelMapper: IMapper<Notification>) {

        super(Notification.name, "notificaciones", {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            id_user: {type: DataTypes.INTEGER},
            title: {type: DataTypes.TEXT},
            body: {type: DataTypes.TEXT},
            icon: {type: DataTypes.TEXT},
            image: {type: DataTypes.TEXT},
            url_redirect: {type: DataTypes.TEXT},
            utm_source: {type: DataTypes.TEXT},
            utm_medium: {type: DataTypes.TEXT},
            utm_campaign: {type: DataTypes.TEXT},
        }, true);

        this.notificationsMapper = modelMapper;

    }

    public async paginateNotifications(criteria: Criteria): Promise<IListQueryResult<Notification>> {
        return await this.paginateByCriteria(criteria)
            .then((result) => {
                result.rows = result.rows.map((x) => this.notificationsMapper.persistenceToDomain(x));
                return result;
            });
    }

    public async findNotification(id: string): Promise<Notification|undefined> {
        return await this.findByPk(id)
            .then((notification) => {
                return (notification) ? this.notificationsMapper.persistenceToDomain(notification) : undefined;
            });
    }

    public async saveNotification(notification: Notification): Promise<Notification> {
        return await this.insert(this.notificationsMapper.domainToPersistence(notification))
            .then((notification) => {
                return this.notificationsMapper.persistenceToDomain(notification);
            });
    }

    public async deleteNotification(notification: Notification): Promise<boolean> {
        return await this.delete(notification);
    }


}
