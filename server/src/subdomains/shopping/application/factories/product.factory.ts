import { Category } from '../../domain/entities/category';
import { Product } from '../../domain/entities/product';
import { CreateProductDto } from '../dto/create-product.dto';

export class ProductFactory {
  static create(
    { name, description, price }: CreateProductDto,
    categories: Category[],
  ): Product {
    return new Product(
      null,
      new Date(),
      new Date(),
      name,
      description,
      categories,
      price,
    );
  }
}
