export type OrderItemProps = {
  id: string
  name: string
  price: number
}

export class OrderItem {
  _id: string
  _name: string
  _price: number

  constructor({ id, name, price }: OrderItemProps) {
    this._id = id;
    this._name = name;
    this._price = price;
  }
}