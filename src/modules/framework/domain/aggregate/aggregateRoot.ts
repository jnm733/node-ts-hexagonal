import {IDomainEvent} from "@/framework/domain/aggregate/iDomainEvent";

export abstract class AggregateRoot<T> {

    private _domainEvents: IDomainEvent[] = [];

    get domainEvents(): IDomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: IDomainEvent): void {
        this._domainEvents.push(domainEvent);

        this.logDomainEventAdded(domainEvent);
    }

    public clearEvents (): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }

    private logDomainEventAdded (domainEvent: IDomainEvent): void {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name)
    }

}