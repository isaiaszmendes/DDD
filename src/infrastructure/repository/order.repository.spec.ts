import { Sequelize } from 'sequelize-typescript';
import { Address } from '../../domain/entity/Address';
import { Customer } from '../../domain/entity/customer';
import { Order } from '../../domain/entity/order';
import { OrderItem } from '../../domain/entity/order-item';
import { Product } from '../../domain/entity/product';
import { CustomerModel } from '../db/sequelize/model/customer.model';
import { OrderItemModel } from '../db/sequelize/model/order-item.model';
import { OrderModel } from '../db/sequelize/model/order.model';
import { ProductModel } from '../db/sequelize/model/product.model';
import { CustomerRepository } from './customer.repository';
import { OrderRepository } from './order.repository';
import { ProductRepository } from './product.repository';

describe('Order repository test', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ CustomerModel, OrderModel, OrderItemModel, ProductModel ]);
		await sequelize.sync();
	});

	afterEach(async() => {
		await sequelize.close();
	});

	it('should create a new Order', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '1267', name: 'John Smith' });
		const address = new Address({ street: 'Main St', zip: '12345678', city: 'New York', number: 1 });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product({ id: '95', name: 'Apple', price: 55 });
		await productRepository.create(product);

		const orderItem = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 10,
		});

		const order = new Order({ id: '123', customerId: customer.id, items: [ orderItem ] });
		const orderRepository = new OrderRepository();
		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: [ 'items' ]
		});
		expect(orderModel.toJSON()).toStrictEqual({
			id: '123',
			customer_id: customer.id,
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					product_id: orderItem.productId,
					order_id: order.id,
				}
			]
		});
	});

	it('Should update an Order', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '470', name: 'Sara Smith' });
		const address = new Address({ street: 'São Miguel Av', zip: '44687203', city: 'New York', number: 1 });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product({ id: '26', name: 'Mesa', price: 2000 });
		await productRepository.create(product);

		const orderItem1 = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 3,
		});

		const orderRepository = new OrderRepository();
		const order = new Order({ id: '31', customerId: customer.id, items: [ orderItem1 ] });
		await orderRepository.create(order);
		const orderItem2 = new OrderItem({
			id: '2',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 1,
		});

		order.addItem(orderItem2);
		await orderRepository.update(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: [ 'items' ]
		});

		expect(orderModel.toJSON()).toStrictEqual({
			id: '31',
			customer_id: customer.id,
			total: order.total(),
			items: [
				{
					id: orderItem1.id,
					name: orderItem1.name,
					price: orderItem1.price,
					quantity: orderItem1.quantity,
					product_id: orderItem1.productId,
					order_id: order.id,
				},
				{
					id: orderItem2.id,
					name: orderItem2.name,
					price: orderItem2.price,
					quantity: orderItem2.quantity,
					product_id: orderItem2.productId,
					order_id: order.id,
				}
			]
		});
	});
	it('Should get an Order by id', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '470', name: 'Sara Smith' });
		const address = new Address({ street: 'São Miguel Av', zip: '44687203', city: 'New York', number: 1 });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product({ id: '26', name: 'Mesa', price: 2000 });
		await productRepository.create(product);

		const orderItem = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 3,
		});

		const orderRepository = new OrderRepository();
		const order = new Order({ id: '31', customerId: customer.id, items: [ orderItem ] });
		await orderRepository.create(order);

		const foundOrder = await orderRepository.find(order.id);
		expect(foundOrder).toStrictEqual({

		});
	});

	it('Should throw an error when Order is not found', async () => {
		const orderRepository = new OrderRepository();

		expect(async() => {
			await orderRepository.find('1');
		}).rejects.toThrow('Order not found');
	});

	it('Should get all Orders', async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer({ id: '470', name: 'Sara Smith' });
		const address = new Address({ street: 'São Miguel Av', zip: '44687203', city: 'New York', number: 1 });
		customer.addAddress(address);
		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product({ id: '26', name: 'Mesa', price: 2000 });
		await productRepository.create(product);

		const orderItem1 = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 3,
		});
		const orderItem2 = new OrderItem({
			id: '1',
			name: product.name,
			price: product.price,
			productId: product.id,
			quantity: 3,
		});

		const orderRepository = new OrderRepository();
		const order1 = new Order({ id: '134', customerId: customer.id, items: [ orderItem1 ] });
		const order2 = new Order({ id: '135', customerId: customer.id, items: [ orderItem1, orderItem2 ] });
		await orderRepository.create(order1);
		await orderRepository.create(order2);


		const orders = await orderRepository.findAll();

		expect(orders).toStrictEqual({

		});

	});
});