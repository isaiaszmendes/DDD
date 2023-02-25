import { Address } from './domain/entity/Address';
import { Customer } from './domain/entity/customer';
import { Order } from './domain/checkout/entity/order';
import { OrderItem } from './domain/checkout/entity/order-item';

const customer = new Customer({
	id: '412687',  name: 'Isaias'
});

const address = new Address({
	street: 'Rua Salvador Natal', number: 2,  zip: '08000-200',  city: 'São Paulo'
});

customer.addAddress(address);

customer.activate();

const item1 = new OrderItem({
	id: '1', name: 'Item 1', price: 10, productId: 'p1', quantity: 1
});

const item2 = new OrderItem({
	id: '2', name: 'Item 2', price: 15, productId: 'p2', quantity: 1
});

new Order({
	id: '1', customerId: '412687', items: [ item1, item2 ]
});

