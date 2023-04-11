import { Entity } from 'src/shared/entities/entity';
import { OrderStatus } from '../enums/order-status.enum';
import { Address } from './address';

export class Order extends Entity {
  #status: OrderStatus;
  #deliveryAddress: Address;

  constructor(
    id: string,
    created: Date,
    updated: Date,
    status: OrderStatus,
    deliveryAddress: Address,
  ) {
    super(id, created, updated);

    this.#status = status;
    this.#deliveryAddress = deliveryAddress;
  }

  //*** GETTERS ***//

  get status(): OrderStatus {
    return this.#status;
  }

  get deliveryAddress(): Address {
    return this.#deliveryAddress;
  }
}
