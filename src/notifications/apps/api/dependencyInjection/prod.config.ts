import {ContainerBuilder} from 'node-dependency-injection'

import framework from "@/notifications/apps/api/dependencyInjection/framework";
import notifications from "@/notifications/apps/api/dependencyInjection/notifications";

export default (container: ContainerBuilder) => {

    //infrastructure
    framework(container);

    //Notifications
    notifications(container);

}
