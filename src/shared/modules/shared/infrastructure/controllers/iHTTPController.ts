import { Request, Response } from 'express';

export interface IHTTPController {
    run(req: Request, res: Response): Promise<Response | void>;
}
