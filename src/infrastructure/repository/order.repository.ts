import { Order } from '../../domain/checkout/entity/order';
import { OrderItem } from '../../domain/checkout/entity/order-item';
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
		let order;
		try {
			order = await OrderModel.findOne({
				where: { id },
				rejectOnEmpty: true,
				include: [ 'items' ]
			});
		} catch (error) {
			throw new Error('Order not found');
		}

		return new Order({
			id: order.id,
			customerId: order.customer_id,
			items: order.items?.map(item => new OrderItem({
				id: item.id,
				name: item.name,
				price: item.price,
				productId: item.product_id,
				quantity: item.quantity,
			}))
		});
	}

	async findAll(): Promise<Order[]> {
		const orders = await OrderModel.findAll({ include: [ 'items' ] });

		return orders.map(order => new Order({
			id: order.id,
			customerId: order.customer_id,
			items: order.items.map(item => new OrderItem({
				id: item.id,
				name: item.name,
				price: item.price,
				productId: item.product_id,
				quantity: item.quantity
			}))
		}));
	}

}
