// booking.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SklyitUsersModule } from 'src/sklyit_users/sklyit_users.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrBooking } from './entity/booking.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrBooking]),
    SklyitUsersModule,
    CacheModule.register({
      ttl: 5 * 60,
      max: 100,
    }),
  ],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
