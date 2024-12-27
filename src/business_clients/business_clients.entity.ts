import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { IsEmail, IsString, Matches } from 'class-validator';
import { Customers } from './../business_customers/business_customers.entity'; // Assuming the Customers table exists
import { Services } from './../bsservices/services.entity'; // Assuming the Services table exists
import { Products } from './../bsproducts/bsproducts.entity'; // Assuming the Products table exists
import { HasLoyalty } from 'src/loyalty_system/loyalty_system.entity';
import { Users } from 'src/sklyit_users/sklyit_users.entity';

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
    shopaddress: string;

    @Column()
    @IsString()
    @IsEmail()
    shopemail: string;

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

    @OneToOne(() => Users, { onDelete: 'CASCADE', cascade: true })
    @JoinColumn({ name: 'userId' })
    userId: Users;

    @OneToMany(() => Customers, (customer) => customer.businessClient, { onDelete: 'CASCADE' })
    customers: Customers[];

    @OneToMany(() => Services, (service) => service.businessClient, { onDelete: 'CASCADE' })
    services: Services[];

    @OneToMany(() => Products, (product) => product.businessClient, { onDelete: 'CASCADE' })
    products: Products[];

    @OneToMany(() => HasLoyalty, (hasLoyalty) => hasLoyalty.businessClient, { onDelete: 'CASCADE' })
    hasLoyalty: HasLoyalty[];
}