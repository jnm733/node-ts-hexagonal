
export interface IMessageBroker {
    publish(messages: {message: string, routingKey: string}[]): Promise<void>;
    startConsumer(queue: string, routingKeys: string[], callback: (message: string, responseCallback: (ok: boolean, retry?: {num: number, delay?: number} ) => any) => any): Promise<void>;
}
