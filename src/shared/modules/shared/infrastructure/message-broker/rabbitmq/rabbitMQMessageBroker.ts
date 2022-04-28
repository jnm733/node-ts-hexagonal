import amqp, {Channel, Connection, Options} from "amqplib";

import {IMessageBroker} from "@node-ts-hexagonal/shared/modules/shared/domain/message-broker/iMessageBroker";
import RabbitMQConfig from "@node-ts-hexagonal/shared/modules/shared/infrastructure/message-broker/rabbitmq/rabbitMQConfig";

type ConsumerOptions = {
    prefecth: number
}

export type RabbitMQExchange = {
    name: string,
    type: string
}

export default class RabbitMQMessageBroker implements IMessageBroker {
    
    private _connection: Promise<Connection>;
    private retryConnDelay: number;
    private defaultExchange: RabbitMQExchange;

    private constructor(config: RabbitMQConfig, retryConnDelay: number) {
        this.retryConnDelay = retryConnDelay || 5000;
        this._connection = this.createConnection(config, true);
        this.defaultExchange = config.defaultExchange;
    }
    
    private async createConnection(config: RabbitMQConfig, retryOnClose: boolean): Promise<Connection> {

        let messageBroker = this;

        let connParams: Options.Connect = {
            protocol: 'amqp',
            hostname: config.host,
            port: config.port,
            username: config.user,
            password: config.password,
            vhost: config.vhost,
        };

        return amqp.connect(connParams).then((con) => {
            console.log('[RabbitMQMessageBroker]', 'Connection established');
            
            con.on("error", function(err: Error) {
                if (err.message !== "Connection closing") {
                    console.error("[RabbitMQMessageBroker]","Connection error", err.message);
                }
            });
            con.on("close", function() {
                if (retryOnClose) {
                    console.log("[RabbitMQMessageBroker]","Connection close. Reconnecting");
                    setTimeout(async () => {
                        messageBroker._connection = messageBroker.createConnection(config, retryOnClose);
                    }, messageBroker.retryConnDelay);
                } else {
                    console.log("[RabbitMQMessageBroker] Connection close");
                }
            });

            return con;

        }).catch(async (err) => {
            console.error("[RabbitMQMessageBroker]", "Connection error", err.message);
            await new Promise(resolve => setTimeout(resolve, this.retryConnDelay));
            return messageBroker.createConnection(config, retryOnClose);
        });
    }

    public async startConsumer(queue: string, routingKeys: string[], callback: (message: string, responseCallback: (ok: boolean, retry?: {num: number, delay?: number}) => any) => any, exchange?: RabbitMQExchange, options?: ConsumerOptions) {

        try {

            exchange = (exchange) ? exchange : this.defaultExchange;

            let messageBroker = this;

            //Deadletter exchange and queue name
            let deadLetterName = 'dead.'+queue;

            //Set connection
            let connection = await this._connection;

            //Set channel
            let channel = await connection.createChannel();

            //Restart consumer on channel close
            channel.on("error", function(err) {
                console.error("[RabbitMQMessageBroker] Error on consumer "+queue+" channel", err.message);
            });
            channel.on("close", function() {
                console.log("[RabbitMQMessageBroker] Consumer "+queue+" channel closed. Restarting consumer");
                setTimeout(() => messageBroker.startConsumer(queue, routingKeys, callback, exchange, options), messageBroker.retryConnDelay);
            });

            //Set channel prefecth
            await channel.prefetch((options && options.prefecth) ? options.prefecth : 10);

            //Create and connect dead-letter exchange and queue
            await this.initDeadLetter(channel, deadLetterName, deadLetterName);

            //Create exchange if not exists
            await channel.assertExchange(exchange.name, exchange.type, {
                durable: false
            });

            //Connect and create queue if not exists
            await channel.assertQueue(queue, {
                autoDelete: false,
                durable: true,
                arguments: {
                    'x-dead-letter-exchange': deadLetterName,
                    'x-dead-letter-routing-key': deadLetterName,
                }
            });

            //Bind routing keys to queue with the exchange
            for (let routingKey of routingKeys) {
                await channel.bindQueue(queue, exchange.name, routingKey);
            }

            //Start consume messages
            console.log("[RabbitMQMessageBroker]","Consumer "+queue+" started");
            await channel.consume(queue, async function (msg) {
                if (msg !== null) {
                    console.log("[RabbitMQMessageBroker]", "Consumer " + queue + " message received");
                    try {
                        await callback(msg.content.toString(), (ok, retry) => {
                            //It's ok. ACK message
                            if (ok) {
                                console.log("[RabbitMQMessageBroker]", "Consumer " + queue + " message processed");
                                channel.ack(msg);
                            }
                            //Retry message or send to deadletter
                            else {
                                if (retry && retry.num > 0) {
                                    let actualRetry = 1;
                                    let maxRetries = retry.num;
                                    if (msg.properties.headers !== undefined && msg.properties.headers["x-retry"]) {
                                        actualRetry = msg.properties.headers["x-retry"];
                                        maxRetries = msg.properties.headers["x-retry-limit"];
                                    }

                                    if (actualRetry == maxRetries) {
                                        console.error("[RabbitMQMessageBroker]", "Consumer " + queue + " max retries reached on message");
                                        channel.nack(msg, false, false);
                                    } else {
                                        msg.properties.headers = {
                                            "x-retry": actualRetry + 1,
                                            "x-retry-limit": maxRetries,
                                        }
                                        setTimeout(() => {
                                            console.error("[RabbitMQMessageBroker]", "Consumer " + queue + " error on message. Retry " + actualRetry);
                                            channel.ack(msg);
                                            channel.sendToQueue(queue, msg.content, {headers: msg.properties.headers});
                                        }, retry.delay || 0);
                                    }
                                } else {
                                    console.error("[RabbitMQMessageBroker]", "Consumer " + queue + " error on message.");
                                    channel.nack(msg, false, false);
                                }
                            }
                        });
                    } catch (err: any) {
                        console.error("[RabbitMQMessageBroker]", "Consumer " + queue + " exception on message.", err.message);
                        channel.nack(msg, false, false);
                    }
                }
            });

        } catch (err: any) {
            console.error('[RabbitMQMessageBroker]', 'Error on consumer'+queue, err.message);
            setTimeout(() => this.startConsumer(queue, routingKeys, callback, exchange, options), this.retryConnDelay);
        }
    }

    public async publish(messages: {message: string, routingKey: string}[], exchange?: RabbitMQExchange) {

        try {

            exchange = (exchange) ? exchange : this.defaultExchange;

            //Set connection
            let connection = await this._connection;

            //Set channel
            let channel = await connection.createChannel();

            //Create exchange if not exists
            await channel.assertExchange(exchange.name, exchange.type, {
                durable: false
            });

            //Send messages to exchange
            for (const message of messages)
                channel.publish(exchange.name, message.routingKey, Buffer.from(message.message));

            //Close channel
            await channel.close();

        } catch (err: any) {
            console.error('[RabbitMQMessageBroker]', 'Error on publisher', err.message);
        }

    }

    private async initDeadLetter(channel: Channel, exchangeName: string, queueName: string) {

        //Create and connect dead-letter exchange
        await channel.assertExchange(exchangeName, 'direct', { durable: false });

        //Create dead-letter queue if not exists
        await channel.assertQueue(queueName, { durable: true, autoDelete: false });

        //Bind dead-letter exchange to dead-letter queue
        await channel.bindQueue(queueName, exchangeName, queueName);

    }

}