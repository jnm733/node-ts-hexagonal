import GlobalConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/config/globalConfig";

export default class GlobalConfigFactory {
    static createConfig(config: any): GlobalConfig {
        return {
            env: config.get('env'),
        };
    }
}