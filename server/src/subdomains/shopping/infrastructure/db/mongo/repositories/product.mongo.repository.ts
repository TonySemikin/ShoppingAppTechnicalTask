import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { Utils } from 'src/shared/utils/utils';
import { ProductRepository } from 'src/subdomains/shopping/application/repositories/product.repository';
import { Product } from 'src/subdomains/shopping/domain/entities/product';
import { ProductMongoDocument } from '../documents/product.mongo.document';
import { ProductMongoDocumentMapper } from '../mappers/product.mongo.mapper';
import { CategoryMongoRepository } from './category.mongo.repository';

@Injectable()
export class ProductMongoRepository implements ProductRepository {
  private collection: Collection<ProductMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection = dbService.getCollection<ProductMongoDocument>('product');
  }

  async save(entity: Product): Promise<Product> {
    const document = ProductMongoDocumentMapper.entityToDocument(entity);

    await this.collection.updateOne(
      { _id: new ObjectId(document.id) },
      { $set: document },
      { upsert: true },
    );

    return entity;
  }

  async loadById(_id: string): Promise<Product> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return ProductMongoDocumentMapper.documentToEntity(document);
  }

  async loadForCategory(
    categoryId: string,
    from: number,
    to: number,
  ): Promise<Product[]> {
    const skip = Utils.round(from - 1, 0);
    const limit = Utils.round(to - from, 0);

    const documents = await this.collection
      .find({
        categoriesIds: [categoryId],
      })
      .skip(skip)
      .limit(limit)
      .toArray();

    return documents.map((d) => ProductMongoDocumentMapper.documentToEntity(d));
  }
}
