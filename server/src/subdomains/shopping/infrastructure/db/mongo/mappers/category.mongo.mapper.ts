import { Category } from 'src/subdomains/shopping/domain/entities/category';
import { CategoryMongoDocument } from '../documents/category.mongo.document';

export class CategoryMongoDocumentMapper {
  public static entityToDocument(entity: Category): CategoryMongoDocument {
    const { id, created, updated, name, description } = entity;

    return {
      id,
      created,
      updated,
      name,
      description,
    };
  }

  public static documentToEntity(document: CategoryMongoDocument): Category {
    const { id, created, updated, name, description } = document;

    return new Category(id, created, updated, name, description);
  }
}
