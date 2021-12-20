import 'reflect-metadata';
import { Container } from 'typedi';

import { IConfiguration } from "@/framework/modules/framework/infraestructure/config/config";

export default async (configuration: IConfiguration, dependencies: {[key: string]: any}) => {
    try {

        //Parameters loader dependencies
        for (let key in dependencies) {
            Container.set(key, dependencies[key]);
        }

    } catch (e) {
        console.error('Error on dependency injector loader: %o', e);
        throw e;
    }
};
