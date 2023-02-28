import { CustomerFactory } from './customer.factory';

describe('Customer factory unit test', () => {
	it('Should create a customer', () => {
		const customer = CustomerFactory.createCustomer({ name: 'Ana' });
		expect(customer.id).toBeDefined();
		expect(customer.name).toBe('Ana');
		expect(customer.address).toBeUndefined();
	});
});