import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '../../domain/entities/category';
import { Product } from '../../domain/entities/product';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductNameAndDescriptionDto } from '../dto/update-product-name-and-description.dto';
import { CategoryFactory } from '../factories/category.factory';
import { ProductFactory } from '../factories/product.factory';
import {
  CategoryRepository,
  CATEGORY_REPOSITORY,
} from '../repositories/category.repository';
import {
  ProductRepository,
  PRODUCT_REPOSITORY,
} from '../repositories/product.repository';

@Injectable()
export class ImsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository,
    @Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository,
  ) {}

  //*** PUBLIC API ***//

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const newCategory = CategoryFactory.create(dto);

    return await this.categoryRepository.save(newCategory);
  }

  async updateCategoryNameAndDescription(
    categoryId: string,
    dto: CreateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.loadById(categoryId);

    if (!category) throw new NotFoundException('Category not found');

    const { name, description } = dto;
    category.updateNameAndDescription(name, description);

    return await this.categoryRepository.save(category);
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const categories = await this.categoryRepository.loadByIds(
      dto.categoriesIds,
    );

    if (categories.length === 0) {
      throw new BadRequestException('Provided categoriesIds do not exist');
    }

    const newProduct = ProductFactory.create(
      dto,
      categories.map((c) => c.id),
    );

    return await this.productRepository.save(newProduct);
  }

  async updateProductNameAndDescription(
    productId: string,
    dto: UpdateProductNameAndDescriptionDto,
  ): Promise<Product> {
    const product = await this.productRepository.loadById(productId);

    if (!product) throw new NotFoundException();

    const { name, description } = dto;
    product.updateNameAndDescription(name, description);

    return await this.productRepository.save(product);
  }

  async addCategory(productId: string, categoryId: string): Promise<Product> {
    const product = await this.productRepository.loadById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const category = await this.categoryRepository.loadById(categoryId);
    if (!category) throw new NotFoundException('Category not found');

    product.addCategory(category);

    return await this.productRepository.save(product);
  }

  async removeCategory(
    productId: string,
    categoryId: string,
  ): Promise<Product> {
    const product = await this.productRepository.loadById(productId);
    if (!product) throw new NotFoundException('Product not found');

    product.removeCategory(categoryId);

    return await this.productRepository.save(product);
  }

  async updatePrice(productId: string, price: number): Promise<Product> {
    const product = await this.productRepository.loadById(productId);
    if (!product) throw new NotFoundException('Product not found');

    product.updatePrice(price);

    return await this.productRepository.save(product);
  }
}
