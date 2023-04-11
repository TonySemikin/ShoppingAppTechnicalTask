import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastrucutre.module';
import { ImsService } from './services/ims.service';
import { ShoppingService } from './services/shopping.service';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [ShoppingService, ImsService],
  exports: [ShoppingService, ImsService],
})
export class ApplicationModule {}
