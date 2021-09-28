import { Router } from 'express';

import SystemController from "@/framework/infraestructure/router/express/systemController";

export default () => {
    const healthRouter = Router();

    healthRouter.get('/live', SystemController.live);

    return healthRouter;
}