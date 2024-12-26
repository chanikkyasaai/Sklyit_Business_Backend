import { Module } from '@nestjs/common';
import { BusinessCustomersController } from './business_customers.controller';
import { BusinessCustomersService } from './business_customers.service';

@Module({
  controllers: [BusinessCustomersController],
  providers: [BusinessCustomersService]
})
export class BusinessCustomersModule {}
