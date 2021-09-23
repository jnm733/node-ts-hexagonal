import { Container } from 'typedi';
import IConfiguration from "../config";
/*import NotificationRepositorySequelize from "../modules/motor-push/infraestructure/persistence/notificationRepositorySequelize";
import ValidatorJS from "../modules/framework/infraestructure/validation/validatorJS";
import NotificationMap from "../modules/motor-push/infraestructure/mapper/notificationMap";*/

export default async (configuration: IConfiguration, dependencies: {[key: string]: any}) => {
    try {

        //Parameters loader dependencies
        for (let key in dependencies) {
            Container.set(key, dependencies[key]);
        }

        /*//Domain fields validator
        let domainValidator = new ValidatorJS();
        Container.set('domainValidator', domainValidator);

        Container.set('notificationRepository', new NotificationRepositorySequelize(new NotificationMap(domainValidator)));*/

    } catch (e) {
        console.error('Error on dependency injector loader: %o', e);
        throw e;
    }
};
