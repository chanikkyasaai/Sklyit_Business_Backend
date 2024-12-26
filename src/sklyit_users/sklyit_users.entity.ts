import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsEmail, IsDate } from 'class-validator';
import { Subscribers } from './../subscribers/subscribers.entity'; // Assuming the Subscribers table exists

@Entity('SKLYIT_users')
export class Users {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column()
    @IsString()
    name: string;

    @Column()
    @IsEmail()
    gmail: string;

    @Column('date')
    @IsDate()
    dob: Date;

    @Column()
    @IsString()
    imgurl: string;

    @Column()
    @IsString()
    mobileno: string;

    @Column()
    @IsString()
    wtappNo: string;

    @Column()
    @IsString()
    gender: string;

    @ManyToOne(() => Subscribers, (subscriber) => subscriber.premiumId)
    premiumId: number; // Foreign key relation with Subscribers

    @Column()
    @IsString()
    address_doorno: string;

    @Column()
    @IsString()
    address_street: string;

    @Column()
    @IsString()
    address_city: string;

    @Column()
    @IsString()
    address_state: string;

    @Column()
    @IsString()
    address_pincode: string;

    @Column()
    @IsString()
    usertype: string;

    @Column('date', { default: () => 'CURRENT_DATE' })
    dateofjoining: Date;
}
