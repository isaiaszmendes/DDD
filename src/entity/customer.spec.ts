import { Address } from "./Address";
import { Customer } from "./customer"

describe("custormer unit test", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      const customer = new Customer({ id: '', name: 'isaias'});
    }).toThrowError('Id is required');
  });

  it("should throw an error when name is empty", () => {
    expect(() => {
      const customer = new Customer({ id: '123456', name: ''});
    }).toThrowError('Name is required');
  });

  it("should change name", () => {
    // arrange
    const customer = new Customer({ id: '123456', name: 'kathlyn'});

    // Act
    customer.changeName('Kathlyn Mendes');

    // Assert
    expect(customer.name).toBe('Kathlyn Mendes')
  });

  it("should throw an error when address is undefined when you active customer", () => {
  
    expect(() => {
      const customer = new Customer({ id: '123456', name: 'kathlyn'});
      customer.activate()
    }).toThrowError('Address is mandatory to activate a customer');
  });

  it("should activate customer", () => {
    const customer = new Customer({ id: '123456', name: 'kathlyn'});
    const address = new Address({street: 'Strret joao', number: 25, city: 'são paulo', zip: '08047-000'})

    customer.addAddress(address);
    customer.activate()
    
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer({ id: '123456', name: 'kathlyn'});
   
    customer.deactivate()
    
    expect(customer.isActive()).toBe(false);
  });

});
