import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '../../domain/entities/category';
import { Product } from '../../domain/entities/product';
import { CategoriesQuery } from '../dto/categories.query';
import { ProductsQuery } from '../dto/products.query';
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

  async getCategoriesByQuery(query: CategoriesQuery): Promise<Category[]> {
    return query?.categoriesIds?.length > 0
      ? await this.getCategoriesByIds(query.categoriesIds)
      : await this.getAllCategories();
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.loadAll();
  }

  async getCategoriesByIds(categoriesIds: string[]): Promise<Category[]> {
    return await this.categoryRepository.loadByIds(categoriesIds);
  }

  async getProductsByQuery(query: ProductsQuery): Promise<Product[]> {
    const { categoryId, from, to } = query;

    return await this.getProductsByCategory(categoryId, from, to);
  }

  async getProductsByCategory(
    categoryId: string,
    from: number,
    to: number,
  ): Promise<Product[]> {
    if (from <= 0) {
      throw new BadRequestException(
        `Starting product sequence ('from') must be a positive integer`,
      );
    }

    if (from >= to) {
      throw new BadRequestException(
        `Ending product sequence ('to') must be bigger than starting product sequence ('from')`,
      );
    }

    return await this.productRepository.loadForCategory(categoryId, from, to);
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productRepository.loadById(productId);
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }
}
