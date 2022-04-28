import {ContainerBuilder} from 'node-dependency-injection';

import containerProd from "@node-ts-hexagonal/backend/apps/api/dependency-injection/prod.config";

const container = new ContainerBuilder();

//Production
containerProd(container);

export default container;

