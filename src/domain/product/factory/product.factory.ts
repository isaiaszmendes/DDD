import { Product } from '../entity/product';
import { randomUUID } from 'crypto';

interface ProductFactoryProps {
  type: string;
  name: string;
  price: number
}

export class ProductFactory {
	public static create({ name, price }: ProductFactoryProps) {
		return new Product({ id: randomUUID(), name, price });
	}
}