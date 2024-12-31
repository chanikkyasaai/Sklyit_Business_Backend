import { Module } from '@nestjs/common';
import { AzureBlobService } from './imageBlob.service';
import {BlobController} from './imageBlob.controller';
@Module({
controllers: [BlobController],
  providers: [AzureBlobService],
  exports: [AzureBlobService], // Make it accessible to other modules
})
export class ImageBlobModule {}


//whereever require do like this
// import { Module } from '@nestjs/common';
// import { OrderController } from './order.controller';
// import { SharedModule } from '../shared/shared.module';

// @Module({
//    
//   imports: [ImageBlobModule], // Import the shared module
//   controllers: [OrderController],
// })
// export class OrderModule {}