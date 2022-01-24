import {Request, Response} from "express";

import {IDTOMapper} from "@/shared/modules/shared/domain/mapper/iMapper";
import Criteria from "@/shared/modules/shared/domain/criteria/criteria";
import {IListQueryResult, orderDirection} from "@/shared/modules/shared/domain/criteria/iCriteria";
import NotificationsCrud from "@/notifications/modules/notifications/application/notificationsCrud";
import Notification from "@/notifications/modules/notifications/domain/models/notification";
import INotificationDTO from "@/notifications/modules/notifications/infrastructure/dtos/iNotificationDTO";
import {ICriteriaAPI} from "@/shared/modules/shared/domain/criteria/iCriteria";
import {IController} from "@/shared/modules/shared/infrastructure/controllers/iController";

export default class NotificationsGetController implements IController{

    public constructor(private notificationsCrud: NotificationsCrud, private dTOMapper: IDTOMapper<Notification, INotificationDTO>) {}

    public async run(req: Request, res: Response): Promise<Response> {

        let query: ICriteriaAPI = req.query;

        let criteria: Criteria = Criteria.parseFromQueryDict(query);
        if (criteria.order === undefined) {
            criteria.order = {
                orderBy: 'id',
                orderDir: orderDirection.DESC
            }
        }

        return await this.notificationsCrud.get(criteria)
            .then((result: IListQueryResult<Notification>) => {
                let resultDTO = result as unknown as IListQueryResult<INotificationDTO>;
                resultDTO.rows = result.rows.map((x: Notification) => this.dTOMapper.toDTO(x));
                return res.json({
                    ok: true,
                    data: resultDTO,
                });
            }).catch((err) => {
                return res.status(404).json({
                    ok: false,
                });
            });
    }

}
