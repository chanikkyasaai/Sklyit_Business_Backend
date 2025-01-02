import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { BusinessClients } from './../business_clients/business_clients.entity'; // Assuming BusinessClients table exists
import { Booking } from './../bsbookings/bsbookings.entity'; // Assuming Booking table exists
import { Orders } from './../bsorders/bsorders.entity'; // Assuming Orders table exists
import { HasLoyalty } from 'src/loyalty_system/loyalty_system.entity';

@Entity('Customers')
export class Customers {
    @PrimaryGeneratedColumn()
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

    @Column({ default: 0 })
    @IsNumber()
    Bflag: number;

    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.customers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'business_id' })
    businessClient: BusinessClients;

    @OneToMany(() => Booking, (booking) => booking.customer, { onDelete: 'CASCADE' })
    bookings: Booking[];

    @OneToMany(() => Orders, (order) => order.customer, { onDelete: 'CASCADE' })
    orders: Orders[];

    @OneToMany(() => HasLoyalty, (hasLoyalty) => hasLoyalty.customer, { onDelete: 'CASCADE' })
    hasLoyalty: HasLoyalty[];

    @Column('date', { default: () => 'CURRENT_DATE' })
    created_at: Date;
    
}
