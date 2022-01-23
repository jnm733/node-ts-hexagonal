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
    },
    db: {
        host: {
            doc: 'Database host name/IP',
            format: '*',
            default: 'localhost'
        },
        name: {
            doc: 'Database name',
            format: String,
        },
        port: {
            doc: 'Database port',
            format: 'port',
            default: '3306'
        },
        password: {
            doc: 'Database password',
            format: String,
            default: ''
        }
    }
});

// Load environment dependent configuration
config.loadFile([__dirname + '/' + config.get('env') + '.json']);

// Perform validation
config.validate({allowed: 'strict'});

export default config;