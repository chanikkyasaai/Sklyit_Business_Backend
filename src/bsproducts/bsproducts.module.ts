import { Module } from '@nestjs/common';
import { BsproductsController } from './bsproducts.controller';
import { BsproductsService } from './bsproducts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './bsproducts.entity';
import { ImageBlobModule } from 'src/imageBlob/imageBlob.module';

@Module({
  imports: [TypeOrmModule.forFeature([Products]),ImageBlobModule],
  controllers: [BsproductsController],
  providers: [BsproductsService],
  exports:[BsproductsService]
})
export class BsproductsModule {}
