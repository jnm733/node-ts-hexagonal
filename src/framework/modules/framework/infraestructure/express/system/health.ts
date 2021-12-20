import { Router } from 'express';

import SystemController from "@/framework/modules/framework/infraestructure/express/systemController";

export default () => {
    const healthRouter = Router();

    healthRouter.get('/live', SystemController.live);

    return healthRouter;
}