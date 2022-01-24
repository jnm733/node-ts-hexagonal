import {ContainerBuilder} from 'node-dependency-injection'

import infrastructure from "@/notifications/apps/api/dependencyInjection/infrastructure";
import notifications from "@/notifications/apps/api/dependencyInjection/notifications";

export default (container: ContainerBuilder) => {

    //infrastructure
    infrastructure(container);

    //Notifications
    notifications(container);

}
