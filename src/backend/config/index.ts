import fs from 'fs';

import ConvictSchemaFactory, {ConvictConfigSchemas} from "@node-ts-hexagonal/shared/modules/shared/infrastructure/convict/convictSchemaFactory";

var convict = require('convict');

// Define a schema
var schema = ConvictSchemaFactory.create([ConvictConfigSchemas.EXPRESS, ConvictConfigSchemas.DATABASE, ConvictConfigSchemas.RABBITMQ]);
var config = convict(schema);

// Load environment dependent configuration
if (fs.existsSync(__dirname + '/' + config.get('node.env') + '.json'))
    config.loadFile([__dirname + '/' + config.get('node.env') + '.json']);

// Perform validation
config.validate({allowed: 'strict'});

export default config;