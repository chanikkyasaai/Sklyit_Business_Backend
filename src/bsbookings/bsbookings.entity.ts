import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Users } from 'src/sklyit_users/sklyit_users.entity'; // Assuming Customers table exists
import { Services } from './../bsservices/services.entity'; // Assuming Services table exists
import { BusinessClients } from './../business_clients/business_clients.entity'; // Assuming BusinessClients table exists

@Entity('Booking')
export class Booking {
    @PrimaryGeneratedColumn()
    BookingID: string;

    @ManyToOne(() => Users, (user) => user.bookings, { onDelete: 'CASCADE' })
    customer: Users;

    @ManyToOne(() => Services, (service) => service.bookings, { onDelete: 'CASCADE' })
    service: Services;

    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.bookings)
    @JoinColumn({ name: 'business_id' })
    businessClient: BusinessClients;

    @Column()
    @IsString()
    Status: string;

    @Column('timestamp')
    BookedTime: Date;

    @Column()
    @IsString()
    BookedMode: string;

    @Column('time')
    ServiceTime: string;

    @Column('date')
    ServiceDate: Date;
}
