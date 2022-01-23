const { DataTypes } = require("sequelize");

import SequelizeRepository from "@/framework/modules/framework/infrastructure/persistence/sequelize/sequelizeRepository";
import {IPersistenceMapper} from "@/framework/modules/framework/domain/mapper/iMapper";
import Criteria from "@/framework/modules/framework/domain/criteria/criteria";
import {IListQueryResult} from "@/framework/modules/framework/domain/criteria/iCriteria";
import Notification from "@/notifications/modules/notifications/domain/models/notification";
import INotificationRepository from "@/notifications/modules/notifications/domain/repositories/iNotificationRepository";

export default class NotificationRepositorySequelize extends SequelizeRepository<Notification> implements INotificationRepository {

    constructor(protected sequelize: any, private persistenceMapper: IPersistenceMapper<Notification>) {

        super(sequelize, Notification.name, "notificaciones", {
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

    }

    public async paginateNotifications(criteria: Criteria): Promise<IListQueryResult<Notification>> {
        return await this.paginateByCriteria(criteria)
            .then((result) => {
                result.rows = result.rows.map((x: Notification) => this.persistenceMapper.toDomain(x));
                return result;
            });
    }

    public async findNotification(id: string): Promise<Notification|undefined> {
        return await this.findByPk(id)
            .then((notification) => {
                return (notification) ? this.persistenceMapper.toDomain(notification) : undefined;
            });
    }

    public async saveNotification(notification: Notification): Promise<Notification> {
        return await this.insert(this.persistenceMapper.toPersistence(notification))
            .then((notification) => {
                return this.persistenceMapper.toDomain(notification);
            });
    }

    public async updateNotification(notification: Notification): Promise<Notification> {
        return await this.update(this.persistenceMapper.toPersistence(notification))
            .then((notification) => {
                return this.persistenceMapper.toDomain(notification);
            });
    }

    public async deleteNotification(notification: Notification): Promise<boolean> {
        return await this.delete(notification);
    }


}
