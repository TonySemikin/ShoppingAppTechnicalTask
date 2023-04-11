import { Category } from '../../domain/entities/category';
import { CreateCategoryDto } from '../dto/create-category.dto';

export class CategoryFactory {
  static create({ name, description }: CreateCategoryDto): Category {
    return new Category(null, new Date(), new Date(), name, description);
  }
}
