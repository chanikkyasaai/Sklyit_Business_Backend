import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customers } from '../business_customers/business_customers.entity'; // Adjust the import path as needed
import { BusinessClients } from '../business_clients/business_clients.entity'; // Adjust the import path as needed

@Entity('hasLoyalty')
export class HasLoyalty {
    @PrimaryColumn()
    CustId: string;

    @PrimaryColumn()
    BusinessId: string;

    @Column('int', { default: 0 })
    loyaltyPts: number;

    @ManyToOne(() => Customers, (customer) => customer.hasLoyalty, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'CustId' })
    customer: Customers;

    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.hasLoyalty, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'BusinessId' })
    businessClient: BusinessClients;
}
