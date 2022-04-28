export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
    NONE = 'none'
}

export default class Order {

    constructor(public orderBy: string, public orderDir: OrderDirection) {}

    static createFromString(orderBy: string, orderDir: string): Order {

        let ascValues = [0, '0', 'asc', 'ASC'];
        let descValues = [1, '1', 'desc', 'DESC'];

        let orderDirection: OrderDirection;

        if (ascValues.includes(orderDir))
            orderDirection = OrderDirection.ASC;
        else if (descValues.includes(orderDir))
            orderDirection = OrderDirection.DESC;
        else
            orderDirection = OrderDirection.ASC;

        return new this(orderBy, orderDirection);

    }

    static asc(orderBy: string): Order {
        return new this(orderBy, OrderDirection.ASC);
    }

    static desc(orderBy: string): Order {
        return new this(orderBy, OrderDirection.DESC);
    }

    static none(): Order {
        return new this('', OrderDirection.NONE);
    }
}
