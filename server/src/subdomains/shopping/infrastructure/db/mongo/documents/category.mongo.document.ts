import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';

export interface CategoryMongoDocument extends EntityMongoDocument {
  readonly name: string;
  readonly description: string;
  readonly [key: string]: any;
}
