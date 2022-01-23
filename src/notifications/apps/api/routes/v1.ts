import { Router } from 'express';
import PromiseRouter from 'express-promise-router';
import notifications from '@/notifications/apps/api/routes/notifications';

export default () => {

    const router: Router = PromiseRouter();

    /** Notifications **/
    router.use('/notifications', notifications());

    return router;
}
