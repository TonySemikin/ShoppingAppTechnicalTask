import { BaseEvent } from 'src/aop/messaging/events/base.event';

export class PaymentSucceededEvent implements BaseEvent {
  static readonly _name = 'payment.succeeded.event';

  readonly name: string;
  readonly payload: {
    orderId: string;
  };

  constructor(orderId: string) {
    this.name = PaymentSucceededEvent._name;
    this.payload = { orderId };
  }
}
