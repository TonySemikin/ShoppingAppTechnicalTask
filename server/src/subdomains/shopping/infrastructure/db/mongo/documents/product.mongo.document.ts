import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';

export interface ProductMongoDocument extends EntityMongoDocument {
  readonly name: string;
  readonly description: string;
  readonly categoriesIds: string[];
  readonly price: number;
  readonly [key: string]: any;
}
