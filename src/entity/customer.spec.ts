import { Customer } from "./customer"

describe("custormer unit test", () => {
  it("should throw a error when id is empty", () => {
    expect( () => {
      const customer = new Customer()
    }).toThrowError('Id is required')
  })
})