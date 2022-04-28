
const expressSchema = {
    host: {
        doc: 'Host to connect.',
        format: 'String',
        default: 'localhost',
        env: 'RABBITMQ_HOST'
    },
    port: {
        doc: 'Port to connect.',
        format: Number,
        default: 5672,
        env: 'RABBITMQ_PORT'
    },
    vhost: {
        doc: 'Virtualhost.',
        format: 'String',
        default: '/',
        env: 'RABBITMQ_VHOST'
    },
    user: {
        doc: 'Username.',
        format: 'String',
        default: 'guest',
        env: 'RABBITMQ_USERNAME'
    },
    password: {
        doc: 'Password.',
        format: 'String',
        default: 'guest',
        env: 'RABBITMQ_PASSWORD'
    },
    defaultExchangeName: {
        doc: 'Default Exchange Name.',
        format: 'String',
        default: 'domain_events',
        env: 'RABBITMQ_DEFAULT_EXCHANGE_NAME'
    },
    defaultExchangeType: {
        doc: 'Default Exchange Type.',
        format: 'String',
        default: 'topic',
        env: 'RABBITMQ_DEFAULT_EXCHANGE_TOPIC'
    }
};

export default expressSchema;