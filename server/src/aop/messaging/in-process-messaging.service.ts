import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BaseEvent } from './events/base.event';

@Injectable()
export class InProcessMessagingService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emitEvent(event: BaseEvent) {
    const { name, payload } = event;

    this.eventEmitter.emit(name, payload);
  }

  listenToEvent(eventName: string, callback: (data: any) => void) {
    this.eventEmitter.on(eventName, callback);
  }
}
