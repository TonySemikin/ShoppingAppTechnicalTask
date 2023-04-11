import { BadRequestException } from '@nestjs/common';
import { Entity } from 'src/shared/entities/entity';
import { Utils } from 'src/shared/utils/utils';
import { Product } from '../interfaces/product.interface';
import { CartItem } from '../values/cart-item';

export class Cart extends Entity {
  #userId: string;
  #items: CartItem[];
  #total: number;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    userId: string,
    cartItems: CartItem[],
    total: number,
  ) {
    super(id, created, updated);

    this.#userId = userId;
    this.#items = cartItems;
    this.#total = total;
  }

  //*** PUBLIC API ***//

  addItemToCart(item: CartItem): this {
    const existingItem = this.#items.find(
      (_item) => _item.productId === item.productId,
    );

    if (existingItem) {
      throw new BadRequestException(
        `Product with id ${item.productId} already exists in the Cart`,
      );
    }

    this.#items.push(item);
    this.updateTotal();

    return this;
  }

  removeItemFromCart(cartItemId: string): this {
    this.#items = this.#items.filter((item) => item.productId !== cartItemId);
    this.updateTotal();

    return this;
  }

  clearCart(): this {
    this.#items = [];
    this.updateTotal();

    return this;
  }

  setItemQuantity(productId: string, quantity: number, product: Product): this {
    const cartItem = this.#items.find((item) => item.productId === productId);

    if (!cartItem) {
      throw new BadRequestException(
        `Product with id ${productId} does not exists in the Cart`,
      );
    }

    cartItem.setProductQuantity(quantity, product);
    this.updateTotal();

    return this;
  }

  //*** PRIVATE RULES ***//

  private updateTotal(): this {
    this.#total = this.calculateCartTotal(this.#items);

    return this;
  }

  private calculateCartTotal(cartItems: CartItem[]): number {
    return Utils.round(
      cartItems.reduce((sum, item) => sum + item.total, 0),
      2,
    );
  }

  //*** GETTERS ***//

  get userId(): string {
    return this.#userId;
  }

  get items(): CartItem[] {
    return this.#items;
  }

  get total(): number {
    return this.#total;
  }
}
