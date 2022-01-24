import {ICriteria, IListQueryResult} from "@/shared/modules/shared/domain/criteria/iCriteria";
import {AggregateRoot} from "@/shared/modules/shared/domain/aggregate/aggregateRoot";

export default abstract class SequelizeRepository<T extends AggregateRoot> {

    protected model: any;

    protected constructor(protected sequelize: any) {
        this.model = this.sequelize.connection.define(this.entitySchema().modelName, this.entitySchema().schema, {tableName: this.entitySchema().tableName, timestamps: this.entitySchema().timestamps});
    }

    protected abstract entitySchema(): { modelName: string, tableName: string, schema: any, timestamps: boolean };

    protected async searchByCriteria(criteria?: ICriteria): Promise<T[]> {
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

    protected async paginateByCriteria(criteria?: ICriteria): Promise<IListQueryResult<T>> {
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

    protected async findByCriteria(criteria: ICriteria): Promise<T|undefined> {
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

    protected async countByCriteria(criteria: ICriteria): Promise<Number> {
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
                let inserted: T = await this.findByPk(result[this.model.primaryKeyAttributes[0]]);
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

    protected criteriaToSequelizeMapper(criteria: ICriteria) {

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
