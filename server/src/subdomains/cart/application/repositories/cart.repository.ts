import { Repository } from 'src/shared/repositories/repository';
import { Cart } from '../../domain/entities/cart';

export interface CartRepository extends Repository<Cart> {}
