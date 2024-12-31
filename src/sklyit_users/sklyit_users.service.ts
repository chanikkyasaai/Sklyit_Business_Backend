import { Subscribers } from './../subscribers/subscribers.entity';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './sklyit_users.entity';
import { CreateUserDto } from './sklyit_users.dto';
import { AzureBlobService } from 'src/imageBlob/imageBlob.service';


@Injectable()
export class SklyitUsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        @InjectRepository(Subscribers)
        private readonly subscribersRepository: Repository<Subscribers>,

        private readonly azureBlobService: AzureBlobService, // Inject AzureBlobService
    ) { }

    async registerUser(createUserDto: CreateUserDto, file?: Express.Multer.File): Promise<Users> {
        const { gmail, mobileno, premiumId, imgurl } = createUserDto;

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

        // If a file is provided, upload it to Azure Blob Storage
        if (file) {
            try {
                const imageUrl = await this.azureBlobService.upload(file, 'upload-file');
                createUserDto.imgurl = imageUrl; // Add image URL to DTO
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new Error('Failed to upload image');
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