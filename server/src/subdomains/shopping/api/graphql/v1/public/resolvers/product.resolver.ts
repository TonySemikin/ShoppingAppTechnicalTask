import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ShoppingService } from 'src/subdomains/shopping/application/services/shopping.service';
import { Product } from 'src/subdomains/shopping/domain/entities/product';
import { ProductSchema } from '../schemas/product.schema';

@Resolver((of) => ProductSchema)
export class ProductResolver {
  constructor(private shoppingService: ShoppingService) {}

  @Query((returns) => ProductSchema)
  async product(@Args('id', { type: () => String }) id: string) {
    return this.shoppingService.getProductById(id);
  }

  @Query((returns) => [ProductSchema])
  async productsByCategory(
    @Args('categoryId', { type: () => String }) categoryId: string,
    @Args('from', { type: () => Number }) from: number,
    @Args('to', { type: () => Number }) to: number,
  ) {
    return this.shoppingService.getProductsByCategory(categoryId, from, to);
  }

  @ResolveField()
  async categories(@Parent() product: Product) {
    const { categoriesIds } = product;

    return this.shoppingService.getCategoriesByIds(categoriesIds);
  }
}
