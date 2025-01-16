import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { IsEmail, IsNumber, IsString, Matches } from 'class-validator';
import { Customers } from './../business_customers/business_customers.entity'; // Assuming the Customers table exists
import { Services } from './../bsservices/services.entity'; // Assuming the Services table exists
import { Products } from './../bsproducts/bsproducts.entity'; // Assuming the Products table exists
import { HasLoyalty } from 'src/loyalty_system/loyalty_system.entity';
import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { Orders } from 'src/bsorders/bsorders.entity';
import { Booking } from 'src/bsbookings/bsbookings.entity';
import { Subscribers } from 'src/subscribers/subscribers.entity';

@Entity('SKLYIT_business_clients')
export class BusinessClients {
    @PrimaryGeneratedColumn()
    BusinessId: string;

    @Column({ unique: true })
    @IsString()
    Clientname: string;

    @Column()
    @IsString()
    domainname: string;

    @Column()
    @IsString()
    shopname: string;

    @Column()
    @IsString()
    shopdesc: string;

    @Column()
    @IsString()
    @IsEmail()
    shopemail: string;

    @Column({ nullable: true })
    @IsString()
    shopimage?: string;

    @Column()
    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits' })
    shopmobile: string;

    @Column('text', { array: true })
    shopLocations: string[];

    @Column('time')
    shopOpenTime: string;

    @Column('time')
    shopClosingTime: string;

    @Column('text', { array: true, nullable: true })
    BusinessMainTags?: string[];

    @Column('text', { array: true, nullable: true })
    BusinessSubTags?: string[];

    @Column({ type: 'jsonb', nullable: true })
    addresses: Array<{
        street: string;
        city: string;
        district: string;
        state: string;
        pincode: string;
    }>;
    
    @Column({ nullable: true })
    @IsNumber()
    loyaltypts?: number;

    @OneToOne(() => Users, { onDelete: 'CASCADE', cascade: true })
    @JoinColumn({ name: 'userId' })
    userId: Users;

    @ManyToOne(() => Subscribers, (subscriber) => subscriber.premiumId)
    premiumId: string; // Foreign key relation with Subscribers

    @OneToMany(() => Customers, (customer) => customer.businessClient, { onDelete: 'CASCADE' })
    customers: Customers[];

    @OneToMany(() => Services, (service) => service.businessClient, { onDelete: 'CASCADE' })
    services: Services[];

    @OneToMany(() => Products, (product) => product.businessClient, { onDelete: 'CASCADE' })
    products: Products[];

    @OneToMany(() => HasLoyalty, (hasLoyalty) => hasLoyalty.businessClient, { onDelete: 'CASCADE' })
    hasLoyalty: HasLoyalty[];
    
    @OneToMany(() => Orders, (order) => order.businessClient, { onDelete: 'CASCADE' })
    orders: Orders[];

    @OneToMany(() => Booking, (booking) => booking.businessClient, { onDelete: 'CASCADE' })
    bookings: Booking[];

    @Column('date', { default: () => 'CURRENT_DATE' })
    created_at: Date
}

