import {ContainerBuilder} from "node-dependency-injection";

import GamesSearchController from "@node-ts-hexagonal/backend/apps/api/controllers/games/gamesSearchController";

export default (container: ContainerBuilder) => {

    const prefix = 'Backend.Games.Infrastructure';

    //Controllers
    container
        .register(`${prefix}.Controllers.GamesSearchController`, GamesSearchController)
}