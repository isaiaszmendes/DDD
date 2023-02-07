import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../domain/entity/product';
import { ProductModel } from '../db/sequelize/model/product.model';
import { ProductRepository } from './product.repository';

describe('Product repository test', () => {
	let sequelize: Sequelize;

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory',
			logging: false,
			sync: { force: true },
		});

		sequelize.addModels([ProductModel]);
		await sequelize.sync();
	});

	afterEach(async() => {
		await sequelize.close();
	});

	it('Should create a product', async () => {
		const productRepository = new ProductRepository();
		const product = new Product({ id: '1', name: 'Produto 1', price: 100});

		await productRepository.create(product);
		const productModel = await ProductModel.findOne({ where: { id: '1'}});
		expect(productModel.toJSON()).toStrictEqual({
			id: '1', name: 'Produto 1', price: 100,
		});
	});

});