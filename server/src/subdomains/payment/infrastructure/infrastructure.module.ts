import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/aop/db/mongo/mongo-db.module';
import { PaymentMongoRepository } from './db/mongo/repositories/payment.mongo.repository';

@Module({
  imports: [MongoDbModule],
  controllers: [],
  providers: [PaymentMongoRepository],
  exports: [MongoDbModule, PaymentMongoRepository],
})
export class InfrastructureModule {}
