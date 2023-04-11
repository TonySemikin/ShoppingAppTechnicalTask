import { Injectable } from '@nestjs/common';
import { Collection, ObjectId } from 'mongodb';
import { MongoService } from 'src/aop/db/mongo/mongo.service';
import { CategoryRepository } from 'src/subdomains/shopping/application/repositories/category.repository';
import { Category } from 'src/subdomains/shopping/domain/entities/category';
import { CategoryMongoDocument } from '../documents/category.mongo.document';
import { CategoryMongoDocumentMapper } from '../mappers/category.mongo.mapper';

@Injectable()
export class CategoryMongoRepository implements CategoryRepository {
  private collection: Collection<CategoryMongoDocument>;

  constructor(dbService: MongoService) {
    this.collection =
      dbService.getCollection<CategoryMongoDocument>('category');
  }

  async save(entity: Category): Promise<Category> {
    const document = CategoryMongoDocumentMapper.entityToDocument(entity);

    await this.collection.updateOne(
      { _id: new ObjectId(document.id) },
      { $set: document },
      { upsert: true },
    );

    return entity;
  }

  async loadById(_id: string): Promise<Category> {
    const document = await this.collection.findOne({ _id: new ObjectId(_id) });

    if (!document) {
      return null;
    }

    return CategoryMongoDocumentMapper.documentToEntity(document);
  }

  async loadByIds(ids: string[]): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }

  async loadAll(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }

  //*** GETTERS ***//

  get _collection(): Collection<CategoryMongoDocument> {
    return this.collection;
  }
}
