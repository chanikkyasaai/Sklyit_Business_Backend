import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BsbookingsController } from './bsbookings.controller';
import { BsbookingsService } from './bsbookings.service';
import { Booking } from './bsbookings.entity';
import { Customers } from './../business_customers/business_customers.entity';
import { Services } from './../bsservices/services.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Booking, Customers, Services]), // Include related entities
    ],
    controllers: [BsbookingsController],
    providers: [BsbookingsService],
})
export class BsbookingsModule {}