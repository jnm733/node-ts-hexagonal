
const databaseSchema = {
    type: {
        doc: 'Database type.',
        format: 'String',
        default: 'mysql',
        env: 'DB_TYPE'
    },
    host: {
        doc: 'MySQL host.',
        format: 'String',
        default: 'localhost',
        env: 'DB_HOST'
    },
    port: {
        doc: 'MySQL port.',
        format: Number,
        default: 3306,
        env: 'DB_PORT'
    },
    name: {
        doc: 'Database name.',
        format: 'String',
        default: 'db',
        env: 'DB_NAME'
    },
    charset: {
        doc: 'Database charset.',
        format: 'String',
        default: 'utf8mb4',
        env: 'DB_CHARSET'
    },
    username: {
        doc: 'Username',
        format: 'String',
        default: 'root',
        env: 'DB_USERNAME'
    },
    password: {
        doc: 'Password',
        format: 'String',
        default: '',
        env: 'DB_PASSWORD'
    },
    numConnections: {
        doc: 'Number of connections on pool mode',
        format: Number,
        default: 10,
        env: 'DB_NUM_CONNECTIONS'
    }
};

export default databaseSchema;