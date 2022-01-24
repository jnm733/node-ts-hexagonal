import {IDomainValidatorResult} from "@/shared/modules/shared/domain/validation/iDomainValidator";
import {AggregateRoot} from "@/shared/modules/shared/domain/aggregate/aggregateRoot";

export interface INotificationPayload {
    title: string,
    body: string,
    url_redirect: string,
    icon: string,
    image: string,
    badge: string
}

export interface INotification {
    id: number,
    idUser: number,
    title: string,
    body: string,
    icon: string,
    image: string,
    urlRedirect: string,
    utmSource: string,
    utmMedium: string,
    utmCampaign: string,
    createdAt: string,
    updatedAt: string
}

export default class Notification extends AggregateRoot{

    private _id: number;
    private _idUser: number;
    private _title: string;
    private _body: string;
    private _icon: string;
    private _image: string;
    private _urlRedirect: string;
    private _utmSource: string;
    private _utmMedium: string;
    private _utmCampaign: string;
    private _createdAt: string;
    private _updatedAt: string;

    private constructor(params: any, id?: number) {

        super();

        this.id = id;
        this.idUser = params.idUser;
        this.title = params.title;
        this.body = params.body;
        this.icon = params.icon;
        this.image = params.image;
        this.urlRedirect = params.urlRedirect;
        this.utmSource = params.utmSource;
        this.utmMedium = params.utmMedium;
        this.utmCampaign = params.utmCampaign;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }

    public static create(params: any, id?: number): Notification | undefined {

        const notification = new this(params);

        if (!id) {
            //todo Add domain event to the object param
            //notification.addDomainEvent();
        }

        return notification;
    }


    /** SETTERS **/
    set id(value: number) {
        this._id = value;
    }

    set idUser(value: number) {
        let validate: IDomainValidatorResult = this.validator.isNotEmpty(value, 'idUser');
        if (!validate.valid)
            throw new Error(validate.msg);
        this._idUser = value;
    }

    set title(value: string) {
        let validate: IDomainValidatorResult = this.validator.isNotEmpty(value, 'idUser');
        if (!validate.valid)
            throw new Error(validate.msg);
        this._title = value;
    }

    set body(value: string) {
        this._body = value;
    }

    set icon(value: string) {
        this._icon = value;
    }

    set image(value: string) {
        this._image = value;
    }

    set urlRedirect(value: string) {
        if (value) {
            let validate: IDomainValidatorResult = this.validator.isURL(value, 'URL');
            if (!validate.valid)
                throw new Error(validate.msg);

            this._urlRedirect = value;
        }
    }

    set utmSource(value: string) {
        this._utmSource = value;
    }

    set utmMedium(value: string) {
        this._utmMedium = value;
    }

    set utmCampaign(value: string) {
        this._utmCampaign = value;
    }

    set createdAt(value: string) {
        this._createdAt = value;
    }

    set updatedAt(value: string) {
        this._updatedAt = value;
    }

    /** GETTERS **/
    get id(): number {
        return this._id;
    }

    get idUser(): number {
        return this._idUser;
    }

    get title(): string {
        return this._title;
    }

    get body(): string {
        return this._body;
    }

    get icon(): string {
        return this._icon;
    }

    get image(): string {
        return this._image;
    }

    get urlRedirect(): string {
        return this._urlRedirect;
    }

    get utmSource(): string {
        return this._utmSource;
    }

    get utmMedium(): string {
        return this._utmMedium;
    }

    get utmCampaign(): string {
        return this._utmCampaign;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    public getNotificationPayload(): INotificationPayload {

        //Creamos la url con los parámetros utm
        let url_redirect: string = "";
        if (this._urlRedirect) {
            let utm_parameters = [];
            url_redirect = this._urlRedirect;

            if (this._utmSource)
                utm_parameters.push("utm_source="+this._utmSource);
            if (this._utmMedium)
                utm_parameters.push("utm_medium="+this._utmMedium);
            if (this._utmCampaign)
                utm_parameters.push("utm_campaign="+this._utmCampaign);

            if (utm_parameters.length > 0)
                url_redirect += '?'+utm_parameters.join('&');

        }

        return {
            title: this._title,
            body: this._body || '',
            url_redirect: url_redirect,
            icon: this._icon || '',
            image: this._image || '',
            badge: 'https://www.motor.es/imagenes/logos/motor_notificacion_badge.png',
        };

    }

}