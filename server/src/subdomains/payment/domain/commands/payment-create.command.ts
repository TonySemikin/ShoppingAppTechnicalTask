import { BaseEvent } from 'src/aop/messaging/events/base.event';

export class PaymentCreateCommand implements BaseEvent {
  static readonly _name = 'payment.create.command';

  readonly name: string;
  readonly payload: {
    orderId: string;
  };

  constructor(orderId: string) {
    this.name = PaymentCreateCommand._name;
    this.payload = { orderId };
  }
}
