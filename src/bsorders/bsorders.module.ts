import { Module } from '@nestjs/common';
import { BsordersController } from './bsorders.controller';
import { BsordersService } from './bsorders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './bsorders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  controllers: [BsordersController],
  providers: [BsordersService],
  exports: [BsordersService],
})
export class BsordersModule {}
