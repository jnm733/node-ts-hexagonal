import { Router } from 'express';

import apiV1 from "@/framework/infraestructure/router/express/api/v1";
import health from "@/framework/infraestructure/router/express/system/health";

export default () => {
    const mainRouter = Router();

    /** API **/
    let apiRouter = Router();

    /** V1 **/
    apiRouter.use('/v1', apiV1());

    mainRouter.use('/api', apiRouter);

    /** System **/
    mainRouter.use('/health', health());

    return mainRouter
}