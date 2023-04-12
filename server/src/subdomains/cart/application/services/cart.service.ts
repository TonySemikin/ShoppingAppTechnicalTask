import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ShoppingService } from 'src/subdomains/shopping/application/services/shopping.service';
import { Cart } from '../../domain/entities/cart';
import { ICartItemDto } from '../dto/cart-item.dto';
import { CartFactory } from '../factories/cart.factory';
import {
  CartRepository,
  CART_REPOSITORY,
} from '../repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY) private cartRepository: CartRepository,
    private readonly shoppingService: ShoppingService,
  ) {}

  //*** PUBLIC API ***//

  async getCartById(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.loadById(cartId);
    if (!cart) throw new NotFoundException('Product not found');

    return cart;
  }

  async createCart(userId: string): Promise<Cart> {
    const newCart = CartFactory.create(userId);

    return await this.cartRepository.save(newCart);
  }

  async addItemToCart(cartId: string, dto: ICartItemDto): Promise<Cart> {
    const cart = await this.getCartById(cartId);

    /**
     * @note
     * in real-life situation would be accessed by RPC, REST or async messaging call via Shopping API or Infrastructure layer
     */
    const product = await this.shoppingService.getProductById(dto.productId);
    const item = CartFactory.createItem(dto, product);

    cart.addItemToCart(item);

    return await this.cartRepository.save(cart);
  }

  async removeItemFromCart(cartId: string, productId: string): Promise<Cart> {
    const cart = await this.getCartById(cartId);

    cart.removeItemFromCart(productId);

    return await this.cartRepository.save(cart);
  }

  async clearCart(cartId: string): Promise<Cart> {
    const cart = await this.getCartById(cartId);

    cart.clearCart();

    return await this.cartRepository.save(cart);
  }

  async setItemQuantity(
    cartId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.getCartById(cartId);

    /**
     * @note
     * in real-life situation would be accessed by RPC, REST or async messaging call via Shopping API or Infrastructure layer
     */
    const product = await this.shoppingService.getProductById(productId);

    cart.setItemQuantity(product, quantity);

    return await this.cartRepository.save(cart);
  }
}
