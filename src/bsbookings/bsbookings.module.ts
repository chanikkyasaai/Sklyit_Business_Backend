import { Module } from '@nestjs/common';
import { BsbookingsController } from './bsbookings.controller';
import { BsbookingsService } from './bsbookings.service';

@Module({
  controllers: [BsbookingsController],
  providers: [BsbookingsService]
})
export class BsbookingsModule {}
