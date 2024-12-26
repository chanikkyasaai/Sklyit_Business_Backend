import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { BusinessClients } from './../business_clients/business_clients.entity'; // Assuming BusinessClients table exists
import { Booking } from './../bsbookings/bsbookings.entity'; // Assuming Booking table exists
import { Orders } from './../bsorders/bsorders.entity'; // Assuming Orders table exists

@Entity('Customers')
export class Customers {
    @PrimaryGeneratedColumn('uuid')
    CustId: string;

    @Column()
    @IsString()
    Name: string;

    @Column()
    @IsString()
    MobileNo: string;

    @Column()
    @IsString()
    address: string;

    @Column()
    @IsString()
    email: string;

    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.customers)
    businessClient: BusinessClients;

    @OneToMany(() => Booking, (booking) => booking.customer)
    bookings: Booking[];

    @OneToMany(() => Orders, (order) => order.customer)
    orders: Orders[];
}
