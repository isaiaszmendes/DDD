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
			storage: ':memory',
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
		const address = new Address({ street: '1234 Main St', zip: '1234', city: 'New York', number: 1 });
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
});