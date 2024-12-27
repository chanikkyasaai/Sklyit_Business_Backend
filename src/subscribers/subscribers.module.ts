import { Module } from '@nestjs/common';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribers } from './subscribers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscribers])],
  controllers: [SubscribersController],
  providers: [SubscribersService],
  exports: [SubscribersService, TypeOrmModule.forFeature([Subscribers])], // Exporting the repository and service
})
export class SubscribersModule {}
