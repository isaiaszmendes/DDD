import { Order } from '../../domain/entity/order';
import { OrderRepositoryInterface } from '../../domain/repository';
import { OrderItemModel } from '../db/sequelize/model/order-item.model';
import { OrderModel } from '../db/sequelize/model/order.model';

export class OrderRepository implements OrderRepositoryInterface {
	async create(entity: Order): Promise<void> {
		await OrderModel.create({
			id: entity.id,
			customer_id: entity.customerId,
			total: entity.total(),
			items: entity.items.map((item) => ({
				id: item.id,
				name: item.name,
				price: item.price,
				product_id: item.productId,
				quantity: item.quantity,
			}))
		}, {
			include: [ { model: OrderItemModel } ]
		});
	}
	async update(entity: Order): Promise<void> {
		const sequelize = OrderModel.sequelize;
		await sequelize.transaction(async (t) => {
			await OrderItemModel.destroy({
				where: { order_id: entity.id },
				transaction: t,
			});
			const items = entity.items.map((item) => ({
				id: item.id,
				name: item.name,
				price: item.price,
				product_id: item.productId,
				quantity: item.quantity,
				order_id: entity.id,
			}));
			await OrderItemModel.bulkCreate(items, { transaction: t });
			await OrderModel.update(
				{ customer_id: entity.customerId, total: entity.total() },
				{ where: { id: entity.id }, transaction: t },
			);
		});
	}

	async find(id: string): Promise<Order> {
		const order = await OrderModel.findOne({ where: { id }, rejectOnEmpty: true, });
		console.log({ order: order.items });
		const newOrder = new Order({
			id: order.id,
			customerId: order.customer_id,
			items: []
		});
		return newOrder;
	}
	findAll(): Promise<Order[]> {
		throw new Error('Method not implemented.');
	}

}
