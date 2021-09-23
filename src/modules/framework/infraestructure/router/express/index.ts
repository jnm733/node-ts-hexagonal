import { Router } from 'express';
import SystemController from "./systemController";
const router = Router();

export default (app: Router, prefix?: string) => {

    /** System **/
    app.use('/health', router);
    router.get('/live', SystemController.live);

};