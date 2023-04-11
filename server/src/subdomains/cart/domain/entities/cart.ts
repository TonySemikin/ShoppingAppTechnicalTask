import { Entity } from 'src/shared/entities/entity';
import { CartItem } from './cart-item';

export class Cart extends Entity {
  #userId: string;
  #cartItems: CartItem[];
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
    this.#cartItems = cartItems;
    this.#total = total;
  }

  //*** GETTERS ***//

  get userId(): string {
    return this.#userId;
  }

  get cartItems(): CartItem[] {
    return this.#cartItems;
  }

  get total(): number {
    return this.#total;
  }
}
