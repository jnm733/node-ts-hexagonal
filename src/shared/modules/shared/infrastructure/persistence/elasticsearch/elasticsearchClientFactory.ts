import { Client } from '@elastic/elasticsearch';

import ElasticsearchConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/elasticsearch/elasticsearchConfig";

export class ElasticsearchClientFactory {
    private static clients: { [key: string]: Client } = {};

    static async createClient(contextName: string, config: ElasticsearchConfig): Promise<Client> {
        let client = ElasticsearchClientFactory.getClient(contextName);

        if (!client) {
            client = await ElasticsearchClientFactory.createAndConnectClient(config);

            ElasticsearchClientFactory.registerClient(client, contextName);
        }

        return client;
    }

    private static getClient(contextName: string): Client | null {
        return ElasticsearchClientFactory.clients[contextName];
    }

    private static async createAndConnectClient(config: ElasticsearchConfig): Promise<Client> {
        const client = new Client({
            node: config.node,
            auth: {
                username: config.username,
                password: config.password
            }
        });

        return client;
    }

    private static registerClient(client: Client, contextName: string): void {
        ElasticsearchClientFactory.clients[contextName] = client;
    }

}
