import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customers } from './../business_customers/business_customers.entity';
import { BusinessClients } from './../business_clients/business_clients.entity'; // Assuming BusinessClients table exists

@Entity('Orders')
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    Oid: string;

    @ManyToOne(() => Customers, (customer) => customer.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'CustId' })
    customer: Customers;

    @Column('date', { default: () => 'CURRENT_DATE' })
    Odate: Date;

    @Column('jsonb', { nullable: true })
    Services: object[];

    @Column('jsonb', { nullable: true })
    Products: object[];

    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'business_id' })
    businessClient: BusinessClients;
}
