import Router from 'express-promise-router';

import apiV1 from "@/notifications/apps/api/routes/v1";

export default () => {
    const mainRouter = Router();

    /** API **/
    let apiRouter = Router();

    /** V1 **/
    apiRouter.use('/v1', apiV1());

    mainRouter.use('/api', apiRouter);

    return mainRouter
}
