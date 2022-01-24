import cluster from "cluster";
import { Router } from 'express';

import ExpressServer from "@/shared/modules/shared/infrastructure/express/expressServer";
import IExpressServer from "@/shared/modules/shared/infrastructure/express/iExpressServer";
import ExpressConfig from "@/shared/modules/shared/infrastructure/express/config/expressConfig";

export default class ExpressClusterServer extends ExpressServer implements IExpressServer{

    public primary: number;
    public workers: any[];

    constructor( configuration: ExpressConfig, router: Router ) {
        super(configuration, router);

        this.workers = [];
        this.primary = 0;
    }

    async start() {

        if (cluster.isMaster) {

            console.log("[Express]", "Starting Server in Cluster Mode");

            for (let i = 0; i < this.configuration.numWorkers; i++) {
                this.createWorker();
            }

            //Set primary worker
            this.setPrimaryWorker();

            cluster.on('exit', (worker:any, code:any, signal:any) => {
                console.error("[Express]", `Worker ${worker.id} died with code: ${code} and signal: ${signal}`);

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

            await this.initServer();

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

    private createWorker() {
        let worker = cluster.fork().on('online', () => {
            console.log("[Express]", "Online worker " + worker.id);
        }).on('error', () => {
            console.error("[Express]", "Error on worker " + worker.id);
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
        console.log("[Express]", "Set primary Worker " + this.primary);
    }
}