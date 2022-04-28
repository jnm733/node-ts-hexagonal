import Router from 'express-promise-router';

import StatusGetController from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/controllers/statusGetController";
import {Request, Response} from "express";

export default () => {
    const healthRouter = Router();

    const statusGetController = new StatusGetController();

    healthRouter.get('/live', (req: Request, res: Response) => statusGetController.run(req, res));

    return healthRouter;
}