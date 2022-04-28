
const expressSchema = {
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 8000,
        env: 'EXPRESS_PORT'
    },
    viewsPath: {
        doc: 'Path of express views.',
        format: 'String',
        default: '../views',
        env: 'EXPRESS_VIEWS_PATH'
    },
    publicPath: {
        doc: 'Path of public assets.',
        format: 'String',
        default: '../assets',
        env: 'EXPRESS_PUBLIC_PATH'
    },
    numWorkers: {
        doc: 'Num workers for cluster mode',
        format: 'int',
        default: 0,
        env: 'EXPRESS_NUM_WORKERS'
    },
    auth: {
        method: {
            doc: 'Auth method',
            format: 'String',
            default: 'BASIC',
            env: 'EXPRESS_AUTH_METHOD',
        },
        username: {
            doc: 'Username',
            format: 'String',
            default: 'motores',
            env: 'EXPRESS_AUTH_USERNAME'
        },
        password: {
            doc: 'Password',
            format: 'String',
            default: 'motores',
            env: 'EXPRESS_AUTH_PASSWORD'
        }
    }
};

export default expressSchema;