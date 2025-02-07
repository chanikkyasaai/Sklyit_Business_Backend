import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column, JoinColumn } from 'typeorm';
import { BusinessClients } from './business_clients.entity';

@Entity('business_followers')
export class BusinessFollower {
    @PrimaryGeneratedColumn('uuid')
    followid: number;

    @Column()
    customerId: number;

    @ManyToOne(() => BusinessClients, (business) => business.followers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'business_id' })
    business: BusinessClients;

    @Column('date', { default: () => 'CURRENT_DATE' })
    followedAt: Date;
}
