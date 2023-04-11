import { Entity } from 'src/shared/entities/entity';

export class Address extends Entity {
  #shortDescription: string;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    shortDescription: string,
  ) {
    super(id, created, updated);

    this.#shortDescription = shortDescription;
  }

  //*** GETTERS ***//

  get shortDescription(): string {
    return this.#shortDescription;
  }
}
