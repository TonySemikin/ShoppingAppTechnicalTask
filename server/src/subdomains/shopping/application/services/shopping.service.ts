import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../../domain/entities/category';
import { Product } from '../../domain/entities/product';
import {
  CategoryRepository,
  CATEGORY_REPOSITORY,
} from '../repositories/category.repository';
import {
  ProductRepository,
  PRODUCT_REPOSITORY,
} from '../repositories/product.repository';

@Injectable()
export class ShoppingService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository,
    @Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository,
  ) {}

  //*** PUBLIC API ***//

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.loadAll();
  }

  async getCategoriesByIds(categoriesIds: string[]): Promise<Category[]> {
    return await this.categoryRepository.loadByIds(categoriesIds);
  }

  async getProductsByCategory(
    categoryId: string,
    from: number,
    to: number,
  ): Promise<Product[]> {
    return await this.productRepository.loadForCategory(categoryId, from, to);
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productRepository.loadById(productId);
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }
}
