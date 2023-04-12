import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CartService } from 'src/subdomains/cart/application/services/cart.service';
import { Order } from '../../domain/entities/order';
import { ICreateOrderDto } from '../dto/create-order.dto';
import { OrderFactory } from '../factories/order.factory';
import {
  OrderRepository,
  ORDER_REPOSITORY,
} from '../repositories/order.repository';

@Injectable()
export class CheckoutService {
  constructor(
    @Inject(ORDER_REPOSITORY) private orderRepository: OrderRepository,
    private readonly cartService: CartService,
  ) {}

  //*** PUBLIC API ***//

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.loadById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async createOrder(dto: ICreateOrderDto): Promise<Order> {
    const cart = await this.cartService.getCartById(dto.cartId);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${dto.cartId} not found.`);
    }

    const deliveryAddress = OrderFactory.createAddress(dto.address);
    const newOrder = OrderFactory.create(cart, deliveryAddress);

    return await this.orderRepository.save(newOrder);
  }

  async proceedToPayment(orderId: string): Promise<Order> {
    const order = await this.getOrderById(orderId);
    const cart = await this.cartService.getCartById(order.cartId);
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${order.cartId} not found.`);
    }

    order.proceedToPayment(cart);

    return await this.orderRepository.save(order);
  }

  async paymentSucceeded(orderId: string): Promise<Order> {
    const order = await this.getOrderById(orderId);

    order.paymentSucceeded();

    return await this.orderRepository.save(order);
  }
}
