import { Router } from 'express';
import system from '@/framework/infraestructure/router/express';
import IConfiguration from "../config";

export default (configuration: IConfiguration) => {
    const app = Router();

    system(app);

    return app
}