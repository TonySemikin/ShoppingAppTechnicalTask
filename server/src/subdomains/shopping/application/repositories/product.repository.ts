import { Repository } from 'src/shared/repositories/repository';
import { Product } from '../../domain/entities/product';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface ProductRepository extends Repository<Product> {}
