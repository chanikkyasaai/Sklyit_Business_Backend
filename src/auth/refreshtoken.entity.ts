import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    userId: string;

    @OneToOne(() => Users, (user) => user.refreshToken, { onDelete: 'CASCADE' ,nullable:true})
    @JoinColumn({ name: 'userId' })
    user: Users;

    @Column()
    token: string;
}
