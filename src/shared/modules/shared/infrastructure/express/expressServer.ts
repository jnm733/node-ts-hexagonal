import cluster from "cluster";
import express, { Router, Request, Response } from 'express';
import helmet from "helmet";
import cors from 'cors';
const bodyParser = require('body-parser');

import healthRoutes from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/routes/health";
import IExpressServer from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/iExpressServer";
import ExpressConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/express/config/expressConfig";

export default class ExpressServer implements IExpressServer{

    public app: express.Application;

    constructor( public configuration: ExpressConfig, public router: Router) {
        this.app = express();
    }

    public async start() {
        console.log("[Express]", "Starting Web Server in Normal Mode");
        await this.initServer();
    }

    //Init Express Web Server
    protected async initServer() {

        //Init bodyparser
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        //Set view engine
        this.app.set('view engine', 'ejs');
        this.app.set('views', this.configuration.viewsPath);

        //CORS
        this.app.use(cors({origin: 'https://www.motor.es'}));

        //Helmet policies
        this.app.use(helmet());

        //Loading routes
        this.router.use('/health', healthRoutes());
        this.app.use(this.router);

        //Promise reject default responses
        this.router.use((err: Error, req: Request, res: Response, next: Function) => {
            console.error('[Express]', err);

            res.status(500).send(
                {
                    ok: false,
                    msg: 'Ha ocurrido un error interno'
                }
            );
        });

        //Start server
        this.app.listen(this.configuration.port, () => {

            //Public path
            this.app.use(express.static(this.configuration.publicPath));

            console.log("[Express]", ((cluster.worker && cluster.isWorker) ? '(Worker ' + cluster.worker.id + ')' : '') + 'Server running at port ' + this.configuration.port);

        }).on('error', (e) => {
            console.error("[Express]", ((cluster.worker && cluster.isWorker) ? '(Worker ' + cluster.worker.id + ')' : '') + "Error on server initialization: " + e);
            process.exit(1);
        });

    }
}