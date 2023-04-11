import { Inject, Injectable } from '@nestjs/common';
import {
  CartRepository,
  CART_REPOSITORY,
} from '../repositories/cart.repository';

@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY) private cartRepository: CartRepository,
  ) {}
}
