import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsDecimal } from 'class-validator';
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

    @ManyToOne(() => BusinessClients, (businessClient) => businessClient.products)
    businessClient: BusinessClients;
}
