import { Module } from '@nestjs/common';
import { OrderMongoRepository } from '../infrastructure/db/mongo/repositories/order.mongo.repository';
import { ApplicationModule as CartApplicationModule } from 'src/subdomains/cart/application/application.module';
import { InfrastructureModule } from '../infrastructure/infrastrucutre.module';
import { ORDER_REPOSITORY } from './repositories/order.repository';
import { CheckoutService } from './services/checkout.service';

@Module({
  /**
   * @note on CartApplicationModule import
   * in real-life situation Checkout would access Cart by RPC, REST or async messaging call via Shopping API or Infrastructure layer
   */
  imports: [InfrastructureModule, CartApplicationModule],
  controllers: [],
  providers: [
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderMongoRepository,
    },
    CheckoutService,
  ],
  exports: [CheckoutService],
})
export class ApplicationModule {}
