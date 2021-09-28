import IMapper from "@/framework/domain/mapper/iMapper";
import Notification from "@/notifications/domain/models/notification";
import IDomainValidator from "@/framework/domain/validation/iDomainValidator";

export default class NotificationMap implements IMapper<Notification> {

    private domainValidator: IDomainValidator;

    constructor(domainValidator: IDomainValidator) {
        this.domainValidator = domainValidator;
    }

    public persistenceToDomain (raw: any): Notification {

        try {
            const notification = Notification.create({
                id: raw.id,
                idUser: raw.id_user,
                title: raw.title,
                body: raw.body,
                icon: raw.icon,
                image: raw.image,
                urlRedirect: raw.url_redirect,
                utmSource: raw.utm_source,
                utmMedium: raw.utm_medium,
                utmCampaign: raw.utm_campaign,
                createdAt: raw.createdAt,
                updatedAt: raw.updatedAt
            }, this.domainValidator, raw.id);

            return notification;

        } catch (e) {
            console.error('[NotificationMap]', 'Error on persistenceToDomain', e.message);
            throw (e);
        }
    }

    public domainToPersistence (notification: Notification): any {

        try {

            return {
                id: notification.id,
                id_user: notification.idUser,
                title: notification.title,
                body: notification.body,
                icon: notification.icon,
                image: notification.image,
                url_redirect: notification.urlRedirect,
                utm_source: notification.utmSource,
                utm_medium: notification.utmMedium,
                utm_campaign: notification.utmCampaign,
                created_at: notification.createdAt,
                updated_at: notification.updatedAt,
            }

        } catch (e) {
            console.error('[NotificationMap]', 'Error on domainToPersistence', e.message);
            throw (e);
        }
    }

    public dTOToDomain (raw: any): Notification {

        try {
            const notification = Notification.create({
                idUser: raw.id_user,
                title: raw.title,
                body: raw.body,
                icon: raw.icon,
                image: raw.image,
                urlRedirect: raw.url_redirect,
                utmSource: raw.utm_source,
                utmMedium: raw.utm_medium,
                utmCampaign: raw.utm_campaign,
            }, this.domainValidator);

            return notification;

        } catch (e) {
            console.error('[NotificationMap]', 'Error on dTOToDomain', e.message);
            throw (e);
        }
    }

    public domainToDTO (notification: Notification): any {

        return this.domainToPersistence(notification);
    }
}