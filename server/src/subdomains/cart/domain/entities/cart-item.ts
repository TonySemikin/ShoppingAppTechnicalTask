import { Entity } from 'src/shared/entities/entity';

export class CartItem extends Entity {
  #productId: string;
  #quantity: number;
  #total: number;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    productId: string,
    quantity: number,
    total: number,
  ) {
    super(id, created, updated);

    this.#productId = productId;
    this.#quantity = quantity;
    this.#total = total;
  }

  //*** GETTERS ***//

  get productId(): string {
    return this.#productId;
  }

  get quantity(): number {
    return this.#quantity;
  }

  get total(): number {
    return this.#total;
  }
}
