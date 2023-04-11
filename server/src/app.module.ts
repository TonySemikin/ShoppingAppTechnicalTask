import { Module } from '@nestjs/common';
import { CartModule } from './subdomains/cart/cart.module';
import { PaymentModule } from './subdomains/payment/payment.module';
import { ShoppingModule } from './subdomains/shopping/shopping.module';
import { UserModule } from './subdomains/user/user.module';

@Module({
  imports: [UserModule, ShoppingModule, CartModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
