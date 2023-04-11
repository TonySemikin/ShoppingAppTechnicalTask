import { Category } from 'src/subdomains/shopping/domain/entities/category';
import { Product } from 'src/subdomains/shopping/domain/entities/product';
import { CategoryMongoDocument } from '../documents/category.mongo.document';
import { ProductMongoDocument } from '../documents/product.mongo.document';
import { CategoryMongoDocumentMapper } from './category.mongo.mapper';

export class ProductMongoDocumentMapper {
  public static entityToDocument(entity: Product): ProductMongoDocument {
    const { id, created, updated, name, description, categoriesIds, price } =
      entity;

    return {
      id,
      created,
      updated,
      name,
      description,
      categoriesIds,
      price,
    };
  }

  public static documentToEntity(document: ProductMongoDocument): Product {
    const { id, created, updated, name, description, categoriesIds, price } =
      document;

    return new Product(
      id,
      created,
      updated,
      name,
      description,
      categoriesIds,
      price,
    );
  }
}
