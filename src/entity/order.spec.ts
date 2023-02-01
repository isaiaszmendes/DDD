import { Order } from "./order";
import { OrderItem } from "./order-item";

describe("Order unit test", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      const order = new Order({ id: "", customerId: "123", items: []});
    }).toThrowError('id is required');
  });

  it("should throw an error when customerId is empty", () => {
    expect(() => {
      const order = new Order({ id: "123", customerId: "", items: []});
    }).toThrowError('customerId is required');
  });

  it("should throw an error when items length are zero", () => {
    expect(() => {
      const order = new Order({ id: "123", customerId: "456", items: []});
    }).toThrowError('items length must be greater than 0');
  });

  it("should calculate total", () => {
    const item = new OrderItem({ id: '1', name: 'Item 1', price: 40 });
    const item2 = new OrderItem({ id: '1', name: 'Item 1', price: 100 });
    const order = new Order({ id: "123", customerId: '12456', items: [item] })

    expect(order.total()).toBe(40);

    const order2 = new Order({ id: "123", customerId: '12456', items: [item, item2] })

    expect(order2.total()).toBe(140)
  });

});
