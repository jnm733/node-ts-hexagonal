import { Router } from 'express';
import PromiseRouter from 'express-promise-router';

import games from '@node-ts-hexagonal/backend/apps/api/routes/games';

export default () => {

    const router: Router = PromiseRouter();

    /** Games **/
    router.use('/games', games());

    return router;
}
