import { Module } from '@nestjs/common';
import { LoyaltySystemController } from './loyalty_system.controller';
import { LoyaltySystemService } from './loyalty_system.service';

@Module({
  controllers: [LoyaltySystemController],
  providers: [LoyaltySystemService]
})
export class LoyaltySystemModule {}
