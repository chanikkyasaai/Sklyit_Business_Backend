import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';
import { Customers } from './../business_customers/business_customers.entity'; // Assuming the Customers table exists
import { Services } from './../bsservices/services.entity'; // Assuming the Services table exists
import { Products } from './../bsproducts/bsproducts.entity'; // Assuming the Products table exists

@Entity('SKLYIT_business_clients')
export class BusinessClients {
    @PrimaryGeneratedColumn('uuid')
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
    shopemail: string;

    @Column()
    @IsString()
    shopmobile: string;

    @Column('text', { array: true })
    shopLocations: string[];

    @Column('time')
    shopOpenTime: string;

    @Column('time')
    shopClosingTime: string;

    @Column('text', { array: true })
    BusinessMainTags: string[];

    @Column('text', { array: true })
    BusinessSubTags: string[];

    @OneToMany(() => Customers, (customer) => customer.businessClient)
    customers: Customers[];

    @OneToMany(() => Services, (service) => service.businessClient)
    services: Services[];

    @OneToMany(() => Products, (product) => product.businessClient)
    products: Products[];
}
