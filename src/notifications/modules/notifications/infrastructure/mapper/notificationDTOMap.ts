import {IDTOMapper} from "@/shared/modules/shared/domain/mapper/iMapper";
import Notification from "@/notifications/modules/notifications/domain/models/notification";
import INotificationDTO from "@/notifications/modules/notifications/infrastructure/dtos/iNotificationDTO";

export default class NotificationDTOMap implements IDTOMapper<Notification, INotificationDTO> {

    constructor() {

    }

    public toDomain (raw: INotificationDTO): any {

        try {
            return {
                idUser: raw.id_user,
                title: raw.title,
                body: raw.body,
                icon: raw.icon,
                image: raw.image,
                urlRedirect: raw.url_redirect,
                utmSource: raw.utm_source,
                utmMedium: raw.utm_medium,
                utmCampaign: raw.utm_campaign,
            };

        } catch (e) {
            console.error('[NotificationMap]', 'Error on dTOToDomain', e.message);
            throw (e);
        }
    }

    public toDTO (notification: Notification): INotificationDTO {

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
}
