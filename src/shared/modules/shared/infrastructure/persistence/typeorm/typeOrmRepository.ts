import {DataSource, EntitySchema, Repository} from "typeorm";
import Criteria from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/criteria";
import TypeOrmFindCriteriaConverter
    from "@node-ts-hexagonal/shared/modules/shared/infrastructure/persistence/typeorm/criteria/typeOrmFindCriteriaConverter";

export default abstract class TypeOrmRepository<TypeOrmModel> {

    private findCriteriaConverter = new TypeOrmFindCriteriaConverter();

    protected constructor(
        protected _connection: Promise<DataSource>,
    ) {}

    protected abstract entitySchema(): EntitySchema | EntitySchema[];

    get connection(): Promise<DataSource> {
        return this._connection;
    }

    protected async repository(index?: number): Promise<Repository<TypeOrmModel>> {
        let schema = this.entitySchema();
        if (Array.isArray(schema))
            schema = schema[(index) ? index : 0];
        return (await this.connection).getRepository(schema);
    }

    public async findByCriteria(criteria: Criteria): Promise<TypeOrmModel[]> {
        const repository = await this.repository();
        return repository.find(this.findCriteriaConverter.toQuery(criteria));
    }
}
