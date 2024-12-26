import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('hasLoyalty')
export class HasLoyalty {
    @PrimaryColumn('uuid')
    CustId: string;

    @PrimaryColumn('uuid')
    BusinessId: string;

    @Column('int')
    loyaltyPts: number;
}
