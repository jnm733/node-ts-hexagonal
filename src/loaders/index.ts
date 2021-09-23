import IConfiguration, {APP_TYPES, DB_DRIVER} from '../config';
import SequelizeLoader from "./sequelize";
import dependencyInjector from "./dependencyInjector";
import jobs from "./jobs";
import queues from "./queues";
import Server from "./server";

export default class AppLoader {

    public static async init(configuration: IConfiguration) {

        let dependencies = {};

        //Init Database
        switch (configuration.dbConfig.dbDriver) {
            case DB_DRIVER.mysql:
                dependencies['sequelize'] = new SequelizeLoader(configuration);
                await dependencies['sequelize'].health();
                break;
        }

        //Dependency Injector
        await dependencyInjector(configuration, dependencies);

        //Start APP by Type (Express, Job, Queues Consumer...)
        switch (configuration.appType) {

            //Express APP
            case APP_TYPES.express:

                console.log("[AppLoader]", "Starting Web Server APP");
                const server = new Server(configuration);
                await server.start();

                break;

            //Job APP (used to run individual tasks)
            case APP_TYPES.job:

                console.log("[AppLoader]", "Starting Job APP");
                await jobs(configuration);

                break;

            //Queues consumer APP
            case APP_TYPES.queues_consumer:

                console.log("[AppLoader]", "Starting Queues Consumer APP");
                await queues(configuration);

                break;
        }

    };

};
