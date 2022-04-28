import {Entity} from "@node-ts-hexagonal/shared/modules/shared/domain/aggregate/entity";
import {DomainEvent} from "@node-ts-hexagonal/shared/modules/shared/domain/aggregate/domainEvent";

export abstract class AggregateRoot<PropsSchema> extends Entity<PropsSchema> {

    private _domainEvents: DomainEvent<any>[] = [];

    get domainEvents(): DomainEvent<any>[] {
        return this._domainEvents;
    }

    get pullDomainEvents(): DomainEvent<any>[] {
        return this._domainEvents.slice();
    }

    public addDomainEvent(domainEvent: DomainEvent<any>): void {
        this._domainEvents.push(domainEvent);

        this.logDomainEventAdded(domainEvent);
    }

    private logDomainEventAdded (domainEvent: DomainEvent<any>): void {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        console.info(`[Domain Event Created]:`, thisClass!.constructor.name, '==>', domainEventClass!.constructor.name)
    }

}
