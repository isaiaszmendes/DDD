import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";

describe('Order service unit test', () => {
  it('Should get total of all orders' , () => {
    const item1 = new OrderItem({ id: '1', name: 'Item 1', price: 40, productId: 'p1', quantity: 2 });
    const item2 = new OrderItem({ id: '1', name: 'Item 1', price: 100, productId: 'p2', quantity: 1 });
    const order1 = new Order({ id: "123", customerId: '12456', items: [item1] })

    const order2 = new Order({ id: "123", customerId: '12456', items: [item1, item2] })

    expect(OrderService.total([order1, order2])).toBe(260)
  });

  it('Should calculate total all orders' , () => {

  });
})