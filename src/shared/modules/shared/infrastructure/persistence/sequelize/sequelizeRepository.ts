import {AggregateRoot} from "@node-ts-hexagonal/shared/modules/shared/domain/aggregate/aggregateRoot";
import Criteria from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/criteria";
import {IPaginateQueryResult} from "@node-ts-hexagonal/shared/modules/shared/domain/criteria/iPaginateQueryResult";

export default abstract class SequelizeRepository<T extends AggregateRoot<T>> {

    protected model: any;

    protected constructor(protected sequelize: any) {
        this.model = this.sequelize.connection.define(this.entitySchema().modelName, this.entitySchema().schema, {tableName: this.entitySchema().tableName, timestamps: this.entitySchema().timestamps});
    }

    protected abstract entitySchema(): { modelName: string, tableName: string, schema: any, timestamps: boolean };

    protected async searchByCriteria(criteria: Criteria): Promise<T[]> {
        let params: any = this.criteriaToSequelizeMapper(criteria);

        return new Promise<any>((resolve, reject) => {

            this.model.findAll(params).then((result: any) => {
                return resolve(result);
            }).catch((err: any) => {
                console.error('[Sequelize]', 'Error on searchByCriteria', err.message);
                return reject(err);
            });

        });

    }

    protected async paginateByCriteria(criteria: Criteria): Promise<IPaginateQueryResult<T>> {
        let params: any = this.criteriaToSequelizeMapper(criteria);

        if (!params.offset)
            params.offset = 0;
        if (!params.limit)
            params.limit = 10;

        return new Promise<any>((resolve, reject) => {

            this.model.findAndCountAll(params).then((result: any) => {
                return resolve({total_rows: result.count, total_filtered_rows: result.count, rows: result.rows});
            }).catch((err: any) => {
                console.error('[Sequelize]', 'Error on paginateByCriteria', err.message);
                return reject(err);
            })

        });
    }

    protected async findByPk(id: any): Promise<T|undefined> {

        return new Promise<any>((resolve, reject) => {

            this.model.findByPk(id).then((result: T|undefined) => {
                return resolve(result);
            }).catch((err: any) => {
                console.error('[Sequelize]', 'Error on findByPk', err.message);
                return reject(err);
            });

        });
    }

    protected async findByCriteria(criteria: Criteria): Promise<T|undefined> {
        let params: any = this.criteriaToSequelizeMapper(criteria);

        return new Promise<any>((resolve, reject) => {

            this.model.findOne(params).then((result: T | undefined) => {
                return resolve(result);
            }).catch((err: any) => {
                console.error('[Sequelize]', 'Error on findByCriteria', err.message);
                return reject(err);
            });

        });
    }

    protected async countByCriteria(criteria: Criteria): Promise<Number> {
        let params: any = this.criteriaToSequelizeMapper(criteria);

        return new Promise<any>((resolve, reject) => {

            this.model.count(params).then((result: number) => {
                return resolve(result);
            })
            .catch((err: any) => {
                console.error('[Sequelize]', 'Error on countByCriteria', err.message);
                return reject(err);
            });

        });

    }

    protected async insert(T: T): Promise<T> {

        return new Promise<any>((resolve, reject) => {

            this.model.create(T).then(async (result: any) => {
                let inserted = await this.findByPk(result[this.model.primaryKeyAttributes[0]]);
                return resolve(inserted);
            }).catch((err: any) => {
                console.error('[Sequelize]', 'Error on save', err.message);
                return reject(err);
            });

        });

    }

    protected async update(T: T): Promise<T> {

        return new Promise<any>((resolve, reject) => {

            this.model.create(T).then((result: T) => {
                return resolve(result);
            }).catch((err: any) => {
                console.error('[Sequelize]', 'Error on save', err.message);
                return reject(err);
            });

        });

    }

    protected async delete(T: any): Promise<boolean> {

        return new Promise<any>((resolve, reject) => {

            T.destroy.then((result: any) => {
                return resolve(result);
            }).catch((err: any) => {
                console.error('[Sequelize]', 'Error on delete', err.message);
                return reject(err);
            });

        });

    }

    protected criteriaToSequelizeMapper(criteria: Criteria) {

        let params: any = {};

        if (criteria.filters)
            params.where = criteria.filters
        if (criteria.fields)
            params.attributes = criteria.fields;
        if (criteria.offset)
            params.offset = criteria.offset;
        if (criteria.limit)
            params.limit = criteria.limit;

        return params;

    }
}
