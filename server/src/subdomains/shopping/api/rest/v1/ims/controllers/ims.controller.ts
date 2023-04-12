import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AdjustProductCategoryDto } from 'src/subdomains/shopping/application/dto/adjust-product-category.dto';
import { CategoriesQuery } from 'src/subdomains/shopping/application/dto/categories.query';
import { CreateCategoryDto } from 'src/subdomains/shopping/application/dto/create-category.dto';
import { CreateProductDto } from 'src/subdomains/shopping/application/dto/create-product.dto';
import { ProductsQuery } from 'src/subdomains/shopping/application/dto/products.query';
import { UpdateProductPriceDto } from 'src/subdomains/shopping/application/dto/update-product-price.dto';
import { ImsService } from 'src/subdomains/shopping/application/services/ims.service';
import { ShoppingService } from 'src/subdomains/shopping/application/services/shopping.service';
import { CategoryOutputDto } from '../dto/category.output-dto';
import { ProductOutputDto } from '../dto/product.output-dto';
import { CategoryOutputDtoMapper } from '../mappers/category.output-dto.mapper';
import { ProductOutputDtoMapper } from '../mappers/product.output-dto.mapper';

@Controller('/ims')
export class ImsController {
  constructor(
    private imsService: ImsService,
    private shoppingService: ShoppingService,
  ) {}

  //*** CATEGORY ***//

  @Get('categories')
  async getCategories(
    @Query(new ValidationPipe()) query: CategoriesQuery,
  ): Promise<CategoryOutputDto[]> {
    const categories = await this.shoppingService.getCategoriesByQuery(query);

    return categories.map((c) => CategoryOutputDtoMapper.entityToDto(c));
  }

  @Post('categories')
  async createCategory(
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryOutputDto> {
    const category = await this.imsService.createCategory(dto);

    return CategoryOutputDtoMapper.entityToDto(category);
  }

  @Patch('categories/:id/update')
  async updateCategoryNameAndDescription(
    @Param('id') id: string,
    @Body() dto: CreateCategoryDto,
  ): Promise<CategoryOutputDto> {
    const category = await this.imsService.updateCategoryNameAndDescription(
      id,
      dto,
    );

    return CategoryOutputDtoMapper.entityToDto(category);
  }

  //*** PRODUCT ***//

  @Get('products')
  async getProducts(
    @Query(new ValidationPipe()) query: ProductsQuery,
  ): Promise<ProductOutputDto[]> {
    const products = await this.shoppingService.getProductsByQuery(query);

    return products.map((p) => ProductOutputDtoMapper.entityToDto(p));
  }

  @Get('products/:id')
  async getProductById(@Param('id') id: string): Promise<ProductOutputDto> {
    const product = await this.shoppingService.getProductById(id);

    return ProductOutputDtoMapper.entityToDto(product);
  }

  @Post('products')
  async createProduct(
    @Body() dto: CreateProductDto,
  ): Promise<ProductOutputDto> {
    const product = await this.imsService.createProduct(dto);

    return ProductOutputDtoMapper.entityToDto(product);
  }

  @Patch('products/:id/update')
  async updateProductNameAndDescription(
    @Param('id') id: string,
    @Body() dto: CreateProductDto,
  ): Promise<ProductOutputDto> {
    const product = await this.imsService.updateProductNameAndDescription(
      id,
      dto,
    );

    return ProductOutputDtoMapper.entityToDto(product);
  }

  @Patch('products/:id/add-category')
  async addCategoryToProduct(
    @Param('id') id: string,
    @Body() dto: AdjustProductCategoryDto,
  ): Promise<ProductOutputDto> {
    const product = await this.imsService.addCategoryToProduct(
      id,
      dto.categoryId,
    );

    return ProductOutputDtoMapper.entityToDto(product);
  }

  @Patch('products/:id/remove-category')
  async removeCategoryFromProduct(
    @Param('id') id: string,
    @Body() dto: AdjustProductCategoryDto,
  ): Promise<ProductOutputDto> {
    const product = await this.imsService.removeCategoryFromProduct(
      id,
      dto.categoryId,
    );

    return ProductOutputDtoMapper.entityToDto(product);
  }

  @Patch('products/:id/update-price')
  async updateProductPrice(
    @Param('id') id: string,
    @Body() dto: UpdateProductPriceDto,
  ): Promise<ProductOutputDto> {
    const product = await this.imsService.updateProductPrice(id, dto.price);

    return ProductOutputDtoMapper.entityToDto(product);
  }
}
