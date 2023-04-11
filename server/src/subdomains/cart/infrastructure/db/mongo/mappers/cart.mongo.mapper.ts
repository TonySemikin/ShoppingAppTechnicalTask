import { Cart } from 'src/subdomains/cart/domain/entities/cart';
import { CartItem } from 'src/subdomains/cart/domain/values/cart-item';
import { CartMongoDocument } from '../documents/cart.mongo.document';

export class CartMongoDocumentMapper {
  public static entityToDocument(entity: Cart): CartMongoDocument {
    const { id, created, updated, userId, items, total } = entity;

    return {
      id,
      created,
      updated,
      userId,
      items: items.map(({ productId, productName, quantity, total }) => ({
        productId,
        productName,
        quantity,
        total,
      })),
      total,
    };
  }

  public static documentToEntity(document: CartMongoDocument): Cart {
    const { id, created, updated, userId, items, total } = document;

    return new Cart(
      id,
      created,
      updated,
      userId,
      items.map(
        ({ productId, productName, quantity, total }) =>
          new CartItem(productId, productName, quantity, total),
      ),
      total,
    );
  }
}
