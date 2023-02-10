import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../db/sequelize/model/customer.model';
import { OrderItemModel } from '../db/sequelize/model/order-item.model';
import { OrderModel } from '../db/sequelize/model/order.model';
import { ProductModel } from '../db/sequelize/model/product.model';

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
});