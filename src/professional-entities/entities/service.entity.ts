import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Professional } from './professional.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  service_id: string;

  @ManyToOne(() => Professional)
  @JoinColumn({ name: 'profession_id' })
  profession: Professional;

  @Column()
  profession_id: string;

  @Column({ length: 30 })
  service_name: string;

  @Column('text')
  service_description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price_range_start: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price_range_end: number;

  @Column('text', { array: true })
  main_tags: string[];

  @Column('text', { array: true })
  sub_tags: string[];
}