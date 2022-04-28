
const expressSchema = {
    node: {
        doc: 'Node to connect.',
        format: 'String',
        default: 'localhost',
        env: 'ELASTICSEARCH_NODE'
    },
    username: {
        doc: 'Username',
        format: 'String',
        default: 'root',
        env: 'ELASTICSEARCH_USERNAME'
    },
    password: {
        doc: 'Password',
        format: 'String',
        default: '',
        env: 'ELASTICSEARCH_PASSWORD'
    }
};

export default expressSchema;