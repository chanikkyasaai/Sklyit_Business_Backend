import { Module } from '@nestjs/common';
import { BsordersController } from './bsorders.controller';
import { BsordersService } from './bsorders.service';

@Module({
  controllers: [BsordersController],
  providers: [BsordersService]
})
export class BsordersModule {}
