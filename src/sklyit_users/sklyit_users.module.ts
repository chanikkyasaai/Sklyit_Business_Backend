import { Module } from '@nestjs/common';
import { SklyitUsersController } from './sklyit_users.controller';
import { SklyitUsersService } from './sklyit_users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './sklyit_users.entity';
import { SubscribersModule } from 'src/subscribers/subscribers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), SubscribersModule], // Import the SubscribersModule
  controllers: [SklyitUsersController],
  providers: [SklyitUsersService],
  exports: [SklyitUsersService],
})
export class SklyitUsersModule {}
