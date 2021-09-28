import { Container } from 'typedi';

import IConfiguration from "../config";
import ValidatorJS from "@/framework/infraestructure/validation/validatorjs/validatorJS";
import NotificationRepositorySequelize from "@/notifications/infraestructure/persistence/notificationRepositorySequelize";
import NotificationMap from "@/notifications/infraestructure/mapper/notificationMap";

export default async (configuration: IConfiguration, dependencies: {[key: string]: any}) => {
    try {

        //Parameters loader dependencies
        for (let key in dependencies) {
            Container.set(key, dependencies[key]);
        }

        //Domain fields validator
        let domainValidator = new ValidatorJS();
        Container.set('domainValidator', domainValidator);

        Container.set('notificationRepository', new NotificationRepositorySequelize(new NotificationMap(domainValidator)));

    } catch (e) {
        console.error('Error on dependency injector loader: %o', e);
        throw e;
    }
};
