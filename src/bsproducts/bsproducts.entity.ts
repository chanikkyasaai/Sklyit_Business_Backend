import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsDecimal, IsNumber } from 'class-validator';
import { BusinessClients } from './../business_clients/business_clients.entity'; // Assuming BusinessClients table exists

@Entity('Products')
export class Products {
    @PrimaryGeneratedColumn('uuid')
    PId: string;

    @Column()
    @IsString()
    Pname: string;

    @Column()
    @IsString()
    Pdesc: string;

    @Column()
    @IsString()
    PimageUrl: string;

    @Column('decimal')
    @IsDecimal()
    Pprice: number;

    @Column('int')
    Pqty: number;

    @Column({ default: 0 })
    @IsNumber()
    Pflag: number;
    
    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.products, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'business_id' })
    businessClient: BusinessClients;
}
