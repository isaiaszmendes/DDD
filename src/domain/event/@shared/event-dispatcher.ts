import { EventDispatcherInterface } from './event-dispatcher.interface';
import { EventHandlerInterface } from './event-handler.interface';
import { EventInterface } from './event.interface';

export class EventDispatcher implements EventDispatcherInterface {

	private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

	get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
		return this.eventHandlers;
	}

	register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
		if (!this.eventHandlers[eventName]){
			this.eventHandlers[eventName] = [];
		}
		this.eventHandlers[eventName].push(eventHandler);
	}


	unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
		if (this.eventHandlers[eventName]){
			const index = this.eventHandlers[eventName].indexOf(eventHandler);
			if (index !== -1) this.eventHandlers[eventName].splice(index, 1);
		}
	}

	notify(event: EventInterface): void {
		throw new Error('Method not implemented.');
	}

	unregisterAll(): void {
		throw new Error('Method not implemented.');
	}

}