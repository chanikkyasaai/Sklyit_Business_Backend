import { Subscribers } from './../subscribers/subscribers.entity';
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';
import { Users } from './sklyit_users.entity';
import { CreateUserDto, UpdateUserDto } from './sklyit_users.dto';
import { AzureBlobService } from 'src/imageBlob/imageBlob.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SklyitUsersService {
    private readonly containerName = 'upload-file';

    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        @InjectRepository(Subscribers)
        private readonly subscribersRepository: Repository<Subscribers>,

        private readonly azureBlobService: AzureBlobService, // Inject AzureBlobService
    ) { }

    async registerUser(createUserDto: CreateUserDto, file: Express.Multer.File): Promise<Users> {
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
        createUserDto.password = bcrypt.hashSync(createUserDto.password, 10); // Hash the password
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

    async updatePassword(id: string, newPassword: string): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { userId: id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.password = bcrypt.hashSync(newPassword, 10); // Hash the newPassword;
        return await this.userRepository.save(user);
    }
    
    async validateUser( userid: string,password: string): Promise<Users> {
        const user = await this.userRepository.findOne({ where: [{ wtappNo:userid },{  mobileno:userid },{gmail:userid}] });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if(user && bcrypt.compareSync(password,user.password)){
            return user;
        }
        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto,file?: Express.Multer.File): Promise<Users> {
        const user = await this.userRepository.findOne({ where: { userId: id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        
        if (file) {
            try {
                const imageUrl = await this.azureBlobService.upload(file, 'upload-file');
                updateUserDto.imgurl = imageUrl; // Add image URL to DTO
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new Error('Failed to upload image');
            }
        }
        //console.log(updateUserDto);
        return await this.userRepository.save({ ...user, ...updateUserDto });
    }
}