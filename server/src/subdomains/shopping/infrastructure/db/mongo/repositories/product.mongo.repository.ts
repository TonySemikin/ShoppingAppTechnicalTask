import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { Utils } from 'src/shared/utils/utils';
import { ProductRepository } from 'src/subdomains/shopping/application/repositories/product.repository';
import { Product } from 'src/subdomains/shopping/domain/entities/product';
import { ProductMongoDocument } from '../documents/product.mongo.document';

@Injectable()
export class ProductMongoRepository implements ProductRepository {
  private collection: Collection<ProductMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection = dbService.getCollection<ProductMongoDocument>('product');
  }

  async save(entity: Product): Promise<Product> {
    const document = ProductMongoDocument.serialize(entity);

    const { upsertedId } = await this.collection.updateOne(
      document._id ? { _id: document._id } : { ...document },
      { $set: document },
      { upsert: true },
    );

    return ProductMongoDocument.appendId(document, document._id ?? upsertedId);
  }

  async loadById(_id: string): Promise<Product> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return ProductMongoDocument.deserialize(document);
  }

  async loadForCategory(
    categoryId: string,
    from: number,
    to: number,
  ): Promise<Product[]> {
    const skip = Utils.round(from - 1, 0);
    const limit = Utils.round(to - from, 0);

    const documents = await this.collection
      .find({ categoriesIds: categoryId })
      .skip(skip)
      .limit(limit)
      .toArray();

    return documents.map((d) => ProductMongoDocument.deserialize(d));
  }
}
