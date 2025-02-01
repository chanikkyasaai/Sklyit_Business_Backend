import { Module } from '@nestjs/common';
import { SphereService } from './sphere.service';
import { SphereController } from './sphere.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../bspost/bspost.schema';
import { ImageBlobModule } from 'src/imageBlob/imageBlob.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),ImageBlobModule],
    controllers: [SphereController],
    providers: [SphereService],
})
export class SphereModule {}