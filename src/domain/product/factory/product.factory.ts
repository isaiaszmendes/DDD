import { Product } from '../entity/product';
import { randomUUID } from 'crypto';
import { ProductB } from '../entity/product-b';

interface ProductFactoryProps {
  type: string;
  name: string;
  price: number
}

export class ProductFactory {
	public static create({ type, name, price }: ProductFactoryProps): Product | ProductB {
		switch (type) {
		case 'a':
			return new Product({ id: randomUUID(), name, price });
		case 'b':
			return new ProductB({ id: randomUUID(), name, price });
		default:
			throw new Error('Product type is not supported');
		}
	}
}