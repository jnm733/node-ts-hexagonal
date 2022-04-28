import globalSchema from "@node-ts-hexagonal/shared/modules/shared/infrastructure/convict/schemas/globalSchema";
import expressSchema from "@node-ts-hexagonal/shared/modules/shared/infrastructure/convict/schemas/expressSchema";
import elasticsearchSchema
    from "@node-ts-hexagonal/shared/modules/shared/infrastructure/convict/schemas/elasticsearchSchema";
import rabbitMQSchema from "@node-ts-hexagonal/shared/modules/shared/infrastructure/convict/schemas/rabbitMQSchema";
import databaseSchema from "@node-ts-hexagonal/shared/modules/shared/infrastructure/convict/schemas/databaseSchema";

export enum ConvictConfigSchemas {
    EXPRESS,
    ELASTICSEARCH,
    RABBITMQ,
    DATABASE
}

export default class ConvictSchemaFactory {

    public static create(schemas: ConvictConfigSchemas[]): object {

        let schema: any = {};

        schema['node'] = globalSchema;

        for (let i=0; i<schemas.length; i++) {

            switch (schemas[i]) {
                case ConvictConfigSchemas.EXPRESS:
                    schema['express'] = expressSchema;
                    break;
                case ConvictConfigSchemas.ELASTICSEARCH:
                    schema['elasticsearch'] = elasticsearchSchema;
                    break;
                case ConvictConfigSchemas.RABBITMQ:
                    schema['rabbitMQ'] = rabbitMQSchema;
                    break;
                case ConvictConfigSchemas.DATABASE:
                    schema['database'] = databaseSchema;
                    break;
            }
        }

        return schema;

    }

}