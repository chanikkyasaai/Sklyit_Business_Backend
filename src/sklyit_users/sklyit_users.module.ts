import { Module } from '@nestjs/common';
import { SklyitUsersController } from './sklyit_users.controller';
import { SklyitUsersService } from './sklyit_users.service';

@Module({
  controllers: [SklyitUsersController],
  providers: [SklyitUsersService]
})
export class SklyitUsersModule {}
