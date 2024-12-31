import { Module } from '@nestjs/common';
import { BspostController } from './bspost.controller';
import { BspostService } from './bspost.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './bspost.schema';
import { ImageBlobModule } from 'src/imageBlob/imageBlob.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),ImageBlobModule],
    controllers: [BspostController],
    providers: [BspostService],
    exports: [BspostService]
})
export class BspostModule { }