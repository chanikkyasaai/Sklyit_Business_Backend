import { Module } from '@nestjs/common';
import { BsservicesController } from './bsservices.controller';
import { BsservicesService } from './bsservices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './services.entity';
import { ImageBlobModule } from 'src/imageBlob/imageBlob.module';

@Module({
  imports: [TypeOrmModule.forFeature([Services]),ImageBlobModule],
  controllers: [BsservicesController],
  providers: [BsservicesService],
  exports: [BsservicesService],
})
export class BsservicesModule {}
