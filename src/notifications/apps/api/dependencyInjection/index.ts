import {ContainerBuilder} from 'node-dependency-injection'
import containerProd from "@/notifications/apps/api/dependencyInjection/prod.config";

const container = new ContainerBuilder();

//Production
containerProd(container);

export default container;

