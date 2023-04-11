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

  //*** PUBLIC API ***//

  updateNameAndDescription(name: string, description: string): this {
    this.#name = name;
    this.#description = description;

    return this;
  }

  addCategory(category: Category): this {
    const existingCategory = this.#categories.find(
      (_category) => _category.id === category.id,
    );

    if (existingCategory) {
      return this;
    }

    this.#categories.push(category);

    return this;
  }

  removeCategory(categoryId: string): this {
    this.#categories = this.#categories.filter(
      (category) => category.id !== categoryId,
    );

    return this;
  }

  updatePrice(price: number): this {
    this.#price = price;

    return this;
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
