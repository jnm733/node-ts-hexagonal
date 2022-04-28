import ElasticsearchConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/elasticsearch/elasticsearchConfig";

export default class ElasticsearchConfigFactory {
    static createConfig(config: any): ElasticsearchConfig {
        return {
            node: config.get('elasticsearch.node'),
            username: config.get('elasticsearch.username'),
            password: config.get('elasticsearch.password'),
        };
    }
}