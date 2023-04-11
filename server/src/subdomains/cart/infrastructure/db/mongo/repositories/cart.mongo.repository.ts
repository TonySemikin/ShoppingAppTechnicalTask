import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { CartRepository } from 'src/subdomains/cart/application/repositories/cart.repository';
import { Cart } from 'src/subdomains/cart/domain/entities/cart';
import { CartMongoDocument } from '../documents/cart.mongo.document';
import { CartMongoDocumentMapper } from '../mappers/cart.mongo.mapper';

@Injectable()
export class CartMongoRepository implements CartRepository {
  private collection: Collection<CartMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection = dbService.getCollection<CartMongoDocument>('cart');
  }

  async save(entity: Cart): Promise<Cart> {
    const document = CartMongoDocumentMapper.entityToDocument(entity);

    await this.collection.updateOne(
      { _id: new ObjectId(document.id) },
      { $set: document },
      { upsert: true },
    );

    return entity;
  }

  async loadById(_id: string): Promise<Cart> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return CartMongoDocumentMapper.documentToEntity(document);
  }
}
