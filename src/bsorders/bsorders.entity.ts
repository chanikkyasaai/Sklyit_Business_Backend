import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';
import { Customers } from './../business_customers/business_customers.entity';
// Assuming Customers table exists
import { BusinessClients } from './../business_clients/business_clients.entity'; // Assuming BusinessClients table exists

@Entity('Orders')
export class Orders {
    @PrimaryGeneratedColumn()
    Oid: string;

    @ManyToOne(() => Customers, (customer) => customer.orders, { onDelete: 'CASCADE' })
    customer: Customers;

    @Column('timestamp')
    Odate: Date;

    @Column('json')
    Services: object[];

    @Column('json')
    Products: object[];

    // @ManyToOne(() => BusinessClients, (businessClient) => businessClient.orders)
    // businessClient: BusinessClients;
}
