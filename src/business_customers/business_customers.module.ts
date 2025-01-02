import { Module } from '@nestjs/common';
import { BusinessCustomersController } from './business_customers.controller';
import { BusinessCustomersService } from './business_customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './business_customers.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  controllers: [BusinessCustomersController],
  providers: [BusinessCustomersService],
  exports: [BusinessCustomersService],
})
export class BusinessCustomersModule {}
