import { Entity } from 'src/shared/entities/entity';

export class Category extends Entity {
  #name: string;
  #description: string;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    name: string,
    description: string,
  ) {
    super(id, created, updated);

    this.#name = name;
    this.#description = description;
  }

  //*** GETTERS ***//

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }
}
