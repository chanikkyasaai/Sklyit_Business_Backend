import { Professional } from 'src/professional-entities/entities/professional.entity';
import { Service } from '../../professional-entities/entities/service.entity';
import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum payment_method_enum {
  Cash = 'Cash',
  Online = 'Online'
};

@Entity('booking')
export class PrBooking {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  service_id: string;

  @Column('timestamp')
  booking_timestamp: string;

  @Column('timestamp')
  service_date_time: string;

  @Column('varchar')
  status: string;

  @Column('varchar')
  payment_status: string;

  @Column({enum: payment_method_enum})
  payment_method: payment_method_enum;

  @Column('varchar', { nullable: true })
  cancellation_reason: string;

  @Column('decimal', { precision: 10, scale: 2 })
  payment: number;

  @Column('uuid')
  profession_id: string;

  @ManyToOne(() => Users, (user) => user.bookings)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @ManyToOne(() => Service, (Service) => Service.service_id)
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => Professional, (Professional) => Professional.bookings)
  @JoinColumn({ name: 'profession_id' })
  professional: Professional;
}
