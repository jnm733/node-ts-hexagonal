import cluster from "cluster";
import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import { IConfiguration } from "@/framework/modules/framework/infraestructure/config/config";
const bodyParser = require('body-parser');
import { Router } from 'express';
import healthRoutes from "@/framework/modules/framework/infraestructure/express/system/health";

export default class ExpressServer {

    public app: express.Application;
    public mainRouter: Router;
    public configuration: IConfiguration;
    public primary: number;
    public workers: any[];

    constructor( configuration: IConfiguration, mainRouter: Router ) {
        this.app = express();
        this.mainRouter = mainRouter;
        this.configuration = configuration;
        this.workers = [];
        this.primary = 0;
    }

    async start() {

        //Cluster mode
        if (this.configuration.numWorkers > 0) {

            if (cluster.isMaster) {

                console.log("Starting Server in Cluster Mode");

                for (let i = 0; i < this.configuration.numWorkers; i++) {
                    this.createWorker();
                }

                //Set primary worker
                this.setPrimaryWorker();

                cluster.on('exit', (worker:any, code:any, signal:any) => {
                    console.error(`Worker ${worker.id} died with code: ${code} and signal: ${signal}`);

                    // Delete worker from list
                    let news = [];
                    for (let i in this.workers) {
                        if (worker.id != this.workers[i].id)
                            news.push(this.workers[i]);
                    }
                    this.workers = news;

                    // Create new worker
                    this.createWorker();

                    //If is primary worker, set another
                    if (worker.id == this.primary)
                        this.setPrimaryWorker();
                });

            } else {

                await this.initServer(false);

                //Message event
                process.on('message', (msg: any) => {
                    if (msg.cmd) {
                        switch (msg.cmd) {
                            case 'primary':
                                this.primary = msg.primary;

                                //Load cron if is primary worker
                                if (cluster.worker && cluster.worker.id == this.primary) {
                                    //todo cronjobs
                                }

                                break;
                        }
                    }
                });
            }

        }
        //Normal mode
        else {
            console.log("Starting Web Server in Normal Mode");
            await this.initServer(this.configuration.runCrons);
        }
    }

    private createWorker() {
        let worker = cluster.fork().on('online', () => {
            console.log("Online worker " + worker.id);
        }).on('error', () => {
            console.error("Error on worker " + worker.id);
        });

        this.workers.push(worker);

        return worker;
    }

    private setPrimaryWorker() {
        this.primary = this.workers[Math.floor(Math.random()*this.workers.length)].id;
        for (let i in this.workers) {
            let worker = this.workers[i];
            worker.send({ cmd: 'primary', primary: this.primary });
        }
        console.log("Set primary Worker " + this.primary);
    }

    //Init Express Web Server
    private async initServer(enableCron: boolean) {

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
        this.mainRouter.use('/health', healthRoutes());
        this.app.use(this.mainRouter);

        //Loading crons
        if (enableCron) {
            //todo cronjobs
        }

        //Start server
        this.app.listen(this.configuration.port, () => {

            //Public path
            this.app.use(express.static(this.configuration.publicPath));

            console.log(((cluster.worker && cluster.isWorker) ? '(Worker ' + cluster.worker.id + ')' : '') + 'Server running at port ' + this.configuration.port);

        }).on('error', (e) => {
            console.error(((cluster.worker && cluster.isWorker) ? '(Worker ' + cluster.worker.id + ')' : '') + "Error on server initialization: " + e);
            process.exit(1);
        });

    }
}