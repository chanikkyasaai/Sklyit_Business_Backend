import { Module } from '@nestjs/common';
import { SphereService } from './sphere.service';
import { SphereController } from './sphere.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../bspost/bspost.schema';
import { ImageBlobModule } from 'src/imageBlob/imageBlob.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from 'src/professional-entities/entities/service.entity';
import { Services } from 'src/bsservices/services.entity';
import { ProfessionalModule } from 'src/professional-entities/entities/professional.module';
import { BsproductsModule } from 'src/bsproducts/bsproducts.module';
import { Products } from 'src/bsproducts/bsproducts.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
        ImageBlobModule, 
        ProfessionalModule,
        BsproductsModule,
        TypeOrmModule.forFeature([Service, Services, Products]),
    ],
    controllers: [SphereController],
    providers: [SphereService],
})
export class SphereModule {}