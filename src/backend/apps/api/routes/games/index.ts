import { Router, Response, Request } from 'express';
import PromiseRouter from "express-promise-router";

import container from "@node-ts-hexagonal/backend/apps/api/dependency-injection";
import gamesSearchController from "@node-ts-hexagonal/backend/apps/api/controllers/games/gamesSearchController";

export default () => {

    const router: Router = PromiseRouter();

    const gamesSearchController: gamesSearchController = container.get('Backend.Games.Infrastructure.Controllers.GamesSearchController');

    /** Games **/
    router.get('/', (req: Request, res: Response) => gamesSearchController.run(req, res));

    return router;
};
