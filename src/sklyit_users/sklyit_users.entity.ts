import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsEmail, IsDate } from 'class-validator';
import { Subscribers } from './../subscribers/subscribers.entity'; // Assuming the Subscribers table exists

@Entity('SKLYIT_users')
export class Users {
  @PrimaryGeneratedColumn()
  userId: string;//

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  gmail: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  @IsDate()
  dob: Date;

  @Column({ nullable: true })
  @IsString()
  imgurl: string;

  @Column()
  @IsString()
  mobileno: string;

  @Column()
  @IsString()
  wtappNo: string;

  @Column({ nullable: true })
  @IsString()
  gender: string;

  @ManyToOne(() => Subscribers, (subscriber) => subscriber.premiumId)
  premiumId: string; // Foreign key relation with Subscribers

  @Column({ name: 'address_doorno', nullable: true })
  addressDoorno: string;

  @Column({ name: 'address_street', nullable: true })
  addressStreet: string;

  @Column({ name: 'address_city' })
  addressCity: string;

  @Column({ name: 'address_state' })
  addressState: string;

  @Column({ name: 'address_pincode', nullable: true })
  addressPincode: string;

  @Column()
  @IsString()
  usertype: string;

  @Column('date', { default: () => 'CURRENT_DATE' })
  dateofjoining: Date;

}
