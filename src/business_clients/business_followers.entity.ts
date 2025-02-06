import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column } from 'typeorm';
import { BusinessClients } from './business_clients.entity';

@Entity('business_followers')
export class BusinessFollower {
    @PrimaryGeneratedColumn()
    followid: number;

    @Column()
    customerId: number;

    @ManyToOne(() => BusinessClients, (business) => business.followers, { onDelete: 'CASCADE' })
    business: BusinessClients;

    @Column('date', { default: () => 'CURRENT_DATE' })
    followedAt: Date;
}
