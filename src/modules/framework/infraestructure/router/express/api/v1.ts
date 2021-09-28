import { Router } from 'express';

import notifications from '@/notifications/infraestructure/express';

export default () => {
    const apiV1Router = Router();

    /** Notifications **/
    apiV1Router.use('/notifications', notifications());

    return apiV1Router;
}