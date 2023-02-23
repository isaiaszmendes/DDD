import { EventHandlerInterface } from '../../@shared/event-handler.interface';
import { CustomerChangedAddressEvent } from '../customer-changed-address.event';

export class SendLogWhenCustomerAddressIsChangeHandler implements EventHandlerInterface<CustomerChangedAddressEvent>{
	handle(event: CustomerChangedAddressEvent): void {
		console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`);
	}
}