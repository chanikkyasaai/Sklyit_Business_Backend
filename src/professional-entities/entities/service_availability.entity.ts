import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';
import { Professional } from './professional.entity';

@Entity('service_avbl')
export class ServiceAvailability {
  @PrimaryGeneratedColumn('uuid')
  available_id: string;

  @ManyToOne(() => Professional)
  @JoinColumn({ name: 'profession_id' })
  profession: Professional;

  @Column()
  profession_id: string;

  @Column({ length: 20 })
  day_week: string;

  @Column('time')
  start_time: string;

  @Column('time')
  end_time: string;
  
}