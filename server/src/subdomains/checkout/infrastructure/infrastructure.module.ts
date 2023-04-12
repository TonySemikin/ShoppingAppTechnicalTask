import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/aop/db/mongo/mongo-db.module';
import { OrderMongoRepository } from './db/mongo/repositories/order.mongo.repository';

@Module({
  imports: [MongoDbModule],
  controllers: [],
  providers: [OrderMongoRepository],
  exports: [MongoDbModule, OrderMongoRepository],
})
export class InfrastructureModule {}
