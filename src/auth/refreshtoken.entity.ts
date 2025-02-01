import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('refreshtoken')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @OneToOne(() => Users, (user) => user.refreshToken, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: Users;

    @Column()
    token: string;
}
