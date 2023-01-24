import { OrderItem } from "./order-item";

export type OrderProps = {
  id: string;
  customerId: string;
  items: Array<OrderItem>
}

export class Order {
  _id: string;
  _customerId: string;
  _items: Array<OrderItem>

  constructor({ id, customerId, items }: OrderProps) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
  }
}