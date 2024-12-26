import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Subscribers')
export class Subscribers {
    @PrimaryGeneratedColumn()
    premiumId: string;
}
