var convict = require('convict');

// Define a schema
var config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    express: {
        port: {
            doc: 'The port to bind.',
            format: 'port',
            default: 8000,
        },
        viewsPath: {
            doc: 'Path of express views.',
            format: 'String',
            default: '../views',
        },
        publicPath: {
            doc: 'Path of public assets.',
            format: 'String',
            default: '../assets',
        },
        numWorkers: {
            doc: 'Num workers for cluster mode',
            format: 'int',
            default: 0,
        },
    },
    mysql: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'localhost'
        },
        name: {
            doc: 'Database name',
            format: 'String',
            default: ''
        },
        port: {
            doc: 'Database port',
            format: 'port',
            default: '3306'
        },
        user: {
            doc: 'Database user',
            format: 'String',
            default: 'root'
        },
        password: {
            doc: 'Database password',
            format: 'String',
            default: ''
        },
        pool: {
            doc: 'Pool connection',
            format: 'Boolean',
            default: false
        },
        poolLimit: {
            doc: 'Limit of pool connections',
            format: 'int',
            default: 10
        }
    }
});

// Load environment dependent configuration
config.loadFile([__dirname + '/' + config.get('env') + '.json']);

// Perform validation
config.validate({allowed: 'strict'});

export default config;