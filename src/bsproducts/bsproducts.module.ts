import { Module } from '@nestjs/common';
import { BsproductsController } from './bsproducts.controller';
import { BsproductsService } from './bsproducts.service';

@Module({
  controllers: [BsproductsController],
  providers: [BsproductsService]
})
export class BsproductsModule {}
