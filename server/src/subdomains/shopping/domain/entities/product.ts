import { Entity } from 'src/shared/entities/entity';
import { Category } from './category';

export class Product extends Entity {
  #name: string;
  #description: string;
  #categories: Category[];
  #price: number;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    name: string,
    description: string,
    categories: Category[],
    price: number,
  ) {
    super(id, created, updated);

    this.#name = name;
    this.#description = description;
    this.#categories = categories;
    this.#price = price;
  }

  //*** GETTERS ***//

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get categories(): Category[] {
    return this.#categories;
  }

  get price(): number {
    return this.#price;
  }
}
