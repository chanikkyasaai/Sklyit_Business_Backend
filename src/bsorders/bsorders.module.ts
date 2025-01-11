import { Module } from '@nestjs/common';
import { BsordersController } from './bsorders.controller';
import { BsordersService } from './bsorders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './bsorders.entity';
import { Customers } from 'src/business_customers/business_customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders,Customers])],
  controllers: [BsordersController],
  providers: [BsordersService],
  exports: [BsordersService],
})
export class BsordersModule {}
