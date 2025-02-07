import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IsString, IsEmail, IsDate } from 'class-validator';
import { Booking } from '../bsbookings/bsbookings.entity';
import { PrBooking } from '../booking/entity/booking.entity';
import { Professional } from '../professional-entities/entities/professional.entity';


@Entity('SKLYIT_users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  userId: string;//

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  gmail: string;

  @Column()
  @IsString()
  password: string;

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

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[];

  @OneToMany(() => PrBooking, (prbookings) => prbookings.user)
  prbookings: PrBooking[];

  @OneToOne(() => Users, (user) => user.refreshToken)
  refreshToken: Users;

  @OneToOne(() => Professional, (professional) => professional.user)
  professional: Professional;

  @Column({ nullable: true })
  @IsString()
  fcm_token: string;

  @Column({ default: false })
  IsEmailVerified: boolean;

  @Column({default:false})
  IsPhoneVerified: boolean
}
