import { Subscribers } from './../subscribers/subscribers.entity';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './sklyit_users.entity';
import { CreateUserDto } from './sklyit_users.dto';


@Injectable()
export class SklyitUsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        @InjectRepository(Subscribers)
        private readonly subscribersRepository: Repository<Subscribers>,
    ) { }

    async registerUser(createUserDto: CreateUserDto): Promise<Users> {
        const { gmail, mobileno, premiumId } = createUserDto;

        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
            where: [{ gmail }, { mobileno }],
        });
        if (existingUser) {
            throw new ConflictException(
                'User with this email or mobile number already exists',
            );
        }

        // Validate premiumId if provided
        let subscriber = null;
        if (premiumId) {
            subscriber = await this.subscribersRepository.findOne({ where: { premiumId } });
            if (!subscriber) {
                throw new NotFoundException(`Subscriber with premiumId ${premiumId} not found`);
            }
        }

        // Save the new user
        const user = this.userRepository.create({
            ...createUserDto,
            premiumId: subscriber ? premiumId : null, // Associate valid premiumId or set as null
        });
        return await this.userRepository.save(user);
    }
    async getAllUsers(): Promise<Users[]> {
        return await this.userRepository.find();
    }

    async getUserById(id: string): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { userId: id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

}