require('module-alias/register');
import 'reflect-metadata';
import Configuration from "./config";
import AppLoader from "./loaders";

async function startApp() {

    //Init config
    const configuration = Configuration.init();

    //Init dependencies loaders
    await AppLoader.init(configuration);

}

startApp();