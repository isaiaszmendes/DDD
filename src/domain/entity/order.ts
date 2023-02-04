import { OrderItem } from './order-item';

export type OrderProps = {
  id: string;
  customerId: string;
  items: Array<OrderItem>
}

export class Order {
	private _id: string;
	private _customerId: string;
	private _items: Array<OrderItem>;
	private _total: number;

	constructor({ id, customerId, items }: OrderProps) {
		this._id = id;
		this._customerId = customerId;
		this._items = items;
		this._total = this.total();
		this.validate();
	}

	validate(): boolean {
		if (this._id.length === 0) throw new Error('id is required');
		if (this._customerId.length === 0) throw new Error('customerId is required');
		if (this._items.length === 0) throw new Error('items length must be greater than 0');
		if (this._items.some(item => item.quantity <= 0)) {
			throw new Error('Quantity must be greater than zero');
		}
		return true;
	}

	total(): number {
		return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
	}
}