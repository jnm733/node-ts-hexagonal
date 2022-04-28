import {ContainerBuilder} from 'node-dependency-injection'

import sharedInfrastructure from "@node-ts-hexagonal/backend/apps/api/dependency-injection/shared/infrastructure";

import gamesInfrastructure from "@node-ts-hexagonal/backend/apps/api/dependency-injection/games/infrastructure";

export default (container: ContainerBuilder) => {

    sharedInfrastructure(container);

    gamesInfrastructure(container);

}
