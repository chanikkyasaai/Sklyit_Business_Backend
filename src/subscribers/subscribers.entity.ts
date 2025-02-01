import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { BusinessClients } from 'src/business_clients/business_clients.entity';

@Entity('Subscription')
export class Subscription {
    @PrimaryGeneratedColumn()
    premiumId: number;

    @OneToOne(() => BusinessClients, (business) => business.subscriptions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'BusinessID' })
    BusinessID: string;

    @Column('smallint', { nullable: false })
    SklyShopTemplateID: number;

    @Column('smallint', { nullable: false })
    InvoiceTemplateID: number;

    @Column('boolean', { default: false })
    BookingManagement: boolean;

    @Column('boolean', { default: false })
    PromotionTools: boolean;

    @Column('boolean', { default: false })
    InventoryManagement: boolean;

    @Column('boolean', { default: false })
    LoyaltyPoints: boolean;

    @Column('smallint', { default: 0 })
    WorkersAccessLimit: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    SubscriptionDate: Date;

    @Column('varchar', { length: 20, default: 'active' })
    SubscriptionStatus: string;

    @Column('timestamp', { nullable: true })
    RenewalDate: Date;
}