import { Module } from '@nestjs/common';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscribers.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscribersController],
  providers: [SubscribersService],
  exports: [SubscribersService, TypeOrmModule.forFeature([Subscription])], // Exporting the repository and service
})
export class SubscribersModule {}
