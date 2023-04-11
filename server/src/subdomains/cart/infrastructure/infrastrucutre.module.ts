import { Module } from '@nestjs/common';
import { MongoDbModule } from 'src/aop/db/mongo/mongo-db.module';

@Module({
  imports: [MongoDbModule],
  controllers: [],
  providers: [],
})
export class InfrastructureModule {}
