import Criteria from "@/framework/domain/criteria/criteria";
import {IListQueryResult} from "@/framework/domain/criteria/iCriteria";
import Notification from "@/notifications/domain/models/notification";

export default interface INotificationRepository {

    paginateNotifications(criteria: Criteria): Promise<IListQueryResult<Notification>>,

    findNotification(id: string): Promise<Notification>,

    saveNotification(notification: Notification): Promise<Notification>,

    deleteNotification(notification: Notification): Promise<boolean>
}