import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsString, IsDecimal } from 'class-validator';
import { BusinessClients } from './../business_clients/business_clients.entity'; // Assuming BusinessClients table exists
import { Booking } from './../bsbookings/bsbookings.entity'; // Assuming Booking table exists

@Entity('Services')
export class Services {
    @PrimaryGeneratedColumn()
    Sid: string;

    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.services, { onDelete: 'CASCADE' })
    businessClient: BusinessClients;

    @Column({ nullable: true })
    @IsString()
    ImageUrl?: string;

    @Column()
    @IsString()
    ServiceName: string;

    @Column({nullable:true})
    @IsString()
    ServiceDesc?: string;

    @Column('decimal')
    @IsDecimal()
    ServiceCost: number;

    @OneToMany(() => Booking, (booking) => booking.service, { onDelete: 'CASCADE' })
    bookings: Booking[];
}
