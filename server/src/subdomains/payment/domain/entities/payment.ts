import { Entity } from 'src/shared/entities/entity';
import { PaymentStatus } from '../enums/payment-status.enum';

export class Payment extends Entity {
  #status: PaymentStatus;

  constructor(id: string, created: Date, updated: Date, status: PaymentStatus) {
    super(id, created, updated);

    this.#status = status;
  }

  //*** GETTERS ***//

  get status(): PaymentStatus {
    return this.#status;
  }
}
