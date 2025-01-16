import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BsbookingsController } from './bsbookings.controller';
import { BsbookingsService } from './bsbookings.service';
import { Booking } from './bsbookings.entity';
import { Customers } from './../business_customers/business_customers.entity';
import { Services } from './../bsservices/services.entity';
import { Users } from 'src/sklyit_users/sklyit_users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Booking, Customers, Services,Users]), // Include related entities
    ],
    controllers: [BsbookingsController],
    providers: [BsbookingsService],
})
export class BsbookingsModule {}