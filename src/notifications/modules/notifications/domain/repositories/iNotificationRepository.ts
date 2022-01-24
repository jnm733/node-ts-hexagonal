import Criteria from "@/shared/modules/shared/domain/criteria/criteria";
import {IListQueryResult} from "@/shared/modules/shared/domain/criteria/iCriteria";
import Notification from "@/notifications/modules/notifications/domain/models/notification";

export default interface INotificationRepository {

    paginateNotifications(criteria: Criteria): Promise<IListQueryResult<Notification>>,

    findNotification(id: string): Promise<Notification>,

    saveNotification(notification: Notification): Promise<Notification>,

    updateNotification(notification: Notification): Promise<Notification>,

    deleteNotification(notification: Notification): Promise<boolean>
}