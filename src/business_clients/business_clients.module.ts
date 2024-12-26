import { Module } from '@nestjs/common';
import { BusinessClientsController } from './business_clients.controller';
import { BusinessClientsService } from './business_clients.service';

@Module({
  controllers: [BusinessClientsController],
  providers: [BusinessClientsService]
})
export class BusinessClientsModule {}
