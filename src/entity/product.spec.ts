describe("Product unit test", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      const product = new Product({ id: "", name: "Product 1", 100});
    }).toThrowError('id is required');
  });

});
