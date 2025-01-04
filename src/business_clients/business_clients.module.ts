import { Module } from '@nestjs/common';
import { BusinessClientsController } from './business_clients.controller';
import { BusinessClientsService } from './business_clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessClients } from './business_clients.entity';
import { SklyitUsersModule } from 'src/sklyit_users/sklyit_users.module';
import { ImageBlobModule } from 'src/imageBlob/imageBlob.module';

@Module({
  imports:[TypeOrmModule.forFeature([BusinessClients]), SklyitUsersModule,ImageBlobModule],
  controllers: [BusinessClientsController],
  providers: [BusinessClientsService]
})
export class BusinessClientsModule {}
