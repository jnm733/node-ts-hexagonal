import moment from "moment";

type UnitTime = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

export default class DateTimeValueObject {

    private constructor(private value: moment.Moment) {}

    static create(year: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): DateTimeValueObject {
        return new this(moment({
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            millisecond: millisecond
        }));
    }

    static now(): DateTimeValueObject {
        return new this(moment());
    }

    static createFromUnix(timestamp: number): DateTimeValueObject {
        return new this(moment(timestamp*1000));
    }

    static createFromTimestamp(timestamp: number): DateTimeValueObject {
        return new this(moment(timestamp));
    }

    static createFromString(value: string, format: string): DateTimeValueObject {
        return new this(moment(value, format));
    }

    static createFromMysql(value: string): DateTimeValueObject {
        return DateTimeValueObject.createFromString(value, 'YYYY-MM-DD HH:mm:ss');
    }

    public toUnix(): number {
        return Number(this.value.format('X'));
    }

    public toTimestamp(): number {
        return Number(this.value.format('x'));
    }

    public toFormat(format: string): string {
        return this.value.format(format);
    }

    public toMysql(millis: boolean = true): string {
        return this.toFormat('YYYY-MM-DD HH:mm:ss'+((millis) ? '.SSS' : ''));
    }

    public add(value: number, unit: UnitTime): DateTimeValueObject {
        this.value = this.value.add(value, unit);

        return this;
    }

    public subtract(value: number, unit: UnitTime): DateTimeValueObject {
        this.value = this.value.subtract(value, unit);

        return this;
    }
}