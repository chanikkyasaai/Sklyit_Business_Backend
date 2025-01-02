import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customers } from './../business_customers/business_customers.entity';
import { BusinessClients } from './../business_clients/business_clients.entity'; // Assuming BusinessClients table exists

@Entity('Orders')
export class Orders {
    @PrimaryGeneratedColumn()
    Oid: string;

    @ManyToOne(() => Customers, (customer) => customer.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'CustId' })
    customer: Customers;

    @Column('timestamp', { default: () => 'CURRENT_DATE' })
    Odate: Date;

    @Column('json', { nullable: true })
    Services: object[];

    @Column('json', { nullable: true })
    Products: object[];

    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'business_id' })
    businessClient: BusinessClients;
}
