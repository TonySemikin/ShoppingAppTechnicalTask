import { EntityMongoDocument } from 'src/shared/documents/mongo-entity.document';

export interface CartMongoDocument extends EntityMongoDocument {
  readonly userId: string;
  readonly items: CartItemMongoDocument[];
  readonly total: number;
  readonly [key: string]: any;
}

interface CartItemMongoDocument {
  readonly productId: string;
  readonly productName: string;
  readonly quantity: number;
  readonly total: number;
}
