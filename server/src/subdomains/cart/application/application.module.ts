import { Module } from '@nestjs/common';
import { CartMongoRepository } from '../infrastructure/db/mongo/repositories/cart.mongo.repository';
import { InfrastructureModule } from '../infrastructure/infrastrucutre.module';
import { CART_REPOSITORY } from './repositories/cart.repository';
import { CartService } from './services/cart.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [
    {
      provide: CART_REPOSITORY,
      useClass: CartMongoRepository,
    },
    CartService,
  ],
})
export class ApplicationModule {}
