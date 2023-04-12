export abstract class Entity {
  #id: string;
  #created: Date;
  #updated: Date;

  constructor(id: string, created: Date, updated: Date) {
    this.#id = id;
    this.#created = created;
    this.#updated = updated;
  }

  //*** GETTERS ***//

  get id(): string {
    return this.#id;
  }

  get created(): Date {
    return this.#created;
  }

  get updated(): Date {
    return this.#updated;
  }

  public serialize(): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    let currentPrototype = Object.getPrototypeOf(this);
    while (currentPrototype !== Object.prototype) {
      Object.getOwnPropertyNames(currentPrototype).forEach((prop) => {
        const descriptor = Object.getOwnPropertyDescriptor(
          currentPrototype,
          prop,
        );

        if (descriptor && descriptor.get) {
          const value = (descriptor.get as () => unknown).call(this);

          // Exclude null or undefined values from the serialized object
          if (value !== null && value !== undefined) {
            result[prop] = value;
          }
        }
      });

      currentPrototype = Object.getPrototypeOf(currentPrototype);
    }

    return result;
  }
}
