import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastrucutre.module';

@Module({
  imports: [InfrastructureModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
