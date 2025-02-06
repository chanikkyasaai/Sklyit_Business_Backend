import { IsOptional } from 'class-validator';
import { PrBooking } from 'src/booking/entity/booking.entity';
import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
enum PaymentMethod {
  Bank = 'Bank',
  Upi = 'Upi',
};
@Entity()
export class Professional {
  @PrimaryGeneratedColumn('uuid')
  profession_id: string;

  @Column({ length: 50 })
  profession: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
  })
  payment_method: PaymentMethod;

  @Column('text')
  @IsOptional()
  certificate: string;

  @Column('text')
  service_area: string;

  @OneToOne(() => Users, { onDelete: 'CASCADE', cascade: true })
    @JoinColumn({ name: 'userid' })
    user: Users;

  @Column('text')
  userid: string;

  @OneToMany(() => PrBooking, (booking) => booking.professional, { onDelete: 'CASCADE' })
  bookings: PrBooking[];
}
