import { Sequelize } from 'sequelize-typescript';
import { Address } from '../../domain/entity/Address';
import { Customer } from '../../domain/entity/customer';
import { CustomerModel } from '../db/sequelize/model/customer.model';
import { CustomerRepository } from './customer.repository';

describe('Customer repository test', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory',
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});

	afterEach(async() => {
		await sequelize.close();
	});

	it('Should create a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1', name: 'Cliente 1' });
		const address = new Address({  street: 'Av Dona Eva', number: 20, city: 'São Paulo', zip: '74586421' });
		customer.addAddress(address);

		await customerRepository.create(customer);
		const customerModel = await CustomerModel.findOne({ where: { id: '1'}});
		expect(customerModel.toJSON()).toStrictEqual({
			id: '1',
			name: 'Cliente 1',
			street: 'Av Dona Eva',
			number: 20,
			city: 'São Paulo',
			zipCode: '74586421',
			rewardPoints: 0,
			active: false,
		});
	});

	it('Should update a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1', name: 'Cliente 1' });

		await customerRepository.create(customer);
		const customerModel = await CustomerModel.findOne({ where: { id: '1'}});
		expect(customerModel.toJSON()).toStrictEqual({
			id: '1', name: 'Cliente 1'
		});

		customer.changeName('Isaias');


		await customerRepository.update(customer);
		const customerModel2 = await CustomerModel.findOne({ where: { id: '1'}});
		expect(customerModel2.toJSON()).toStrictEqual({
			id: '1', name: 'Isaias'
		});
	});

	it('Should find a customer', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1', name: 'Cliente 1'});

		await customerRepository.create(customer);
		const customerModel = await CustomerModel.findOne({ where: { id: '1'}});
		expect(customerModel.toJSON()).toStrictEqual({
			id: '1', name: 'Cliente 1'
		});
		const foundCustomer = await customerRepository.find('1');

		expect(customerModel.toJSON()).toStrictEqual({
			id: foundCustomer.id,
			name: foundCustomer.name,
		});
	});

	it('Should find all customers', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1', name: 'Cliente 1' });

		await customerRepository.create(customer);
		
		const customer2 = new Customer({ id: '2', name: 'Cliente 2' });

		await customerRepository.create(customer2);

		const foundCustomers = await customerRepository.findAll();
		const customers = [customer, customer2];

		expect(customers.length).toBe(2);
		expect(customers).toEqual(foundCustomers);
	});

});