import { Order } from '../../domain/entity/order';
import { OrderItemModel } from '../db/sequelize/model/order-item.model';
import { OrderModel } from '../db/sequelize/model/order.model';

/**
 * Aqui sim nós fazemos acoplamento de dependencias
 */
export class OrderRepository {
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

}
