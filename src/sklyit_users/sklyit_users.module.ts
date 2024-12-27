import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SklyitUsersController } from './sklyit_users.controller';
import { SklyitUsersService } from './sklyit_users.service';
import { Users } from './sklyit_users.entity';
import { SubscribersModule } from 'src/subscribers/subscribers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), SubscribersModule], // Import the SubscribersModule
  controllers: [SklyitUsersController],
  providers: [SklyitUsersService],
  exports: [SklyitUsersService,TypeOrmModule.forFeature([Users])],
})
export class SklyitUsersModule {}

