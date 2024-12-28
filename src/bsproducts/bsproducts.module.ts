import { Module } from '@nestjs/common';
import { BsproductsController } from './bsproducts.controller';
import { BsproductsService } from './bsproducts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './bsproducts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [BsproductsController],
  providers: [BsproductsService],
  exports:[BsproductsService]
})
export class BsproductsModule {}
