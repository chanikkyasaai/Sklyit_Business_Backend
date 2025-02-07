import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessClients } from './business_clients.entity';
import { Repository } from 'typeorm';
import { CreateBusinessClientDto, UpdateBusinessClientDto, AddressDto } from './business_clients.dto';
import { Users } from 'src/sklyit_users/sklyit_users.entity';
import { AzureBlobService } from 'src/imageBlob/imageBlob.service';


@Injectable()
export class BusinessClientsService {
    constructor(
        @InjectRepository(BusinessClients)
        private readonly businessClientsRepository: Repository<BusinessClients>,

        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,    
        private azureBlobService: AzureBlobService
    ) { }

    async getAllBusinessClients(): Promise<BusinessClients[]> {
        return this.businessClientsRepository.find();
    }

    async getBusinessClientByID(id: string): Promise<BusinessClients> {
        const user = await this.businessClientsRepository.findOne({ where: { BusinessId: id }, relations: ['followers'], });
               if (!user) {
                   throw new NotFoundException('BusinessClient not found');
               }
               return user;
    }

    async registerBusinessClient(createBusinessClientDto: CreateBusinessClientDto,file?: Express.Multer.File): Promise<BusinessClients> {
        const { shopmobile, shopemail, userId } = createBusinessClientDto;

        // Check if the mobile number already exists
        const existingUser = await this.businessClientsRepository.findOne({ where: { shopmobile: shopmobile } });
        if (existingUser) {
            throw new Error('Mobile number already exists');
        }

        // Check if the email already exists
        const existingEmail = await this.businessClientsRepository.findOne({ where: { shopemail: shopemail } });
        if (existingEmail) {
            throw new Error('Email already exists');
        }

        // Check if the userId exists in the Users table
        const user = await this.usersRepository.findOne({ where: { userId: userId } });
        if (!user) {
            throw new Error('User with this ID does not exist');
        }
        if(file){
            try {
                const imageUrl = await this.azureBlobService.upload(file, 'upload-file');
                createBusinessClientDto.imgurl = imageUrl; // Add image URL to DTO
            } catch (error) {
                console.error('Error uploading file:', error);
                throw new Error('Failed to upload file');
            }
        }
        // Map the DTO to the BusinessClients entity
        const businessClient = this.businessClientsRepository.create({
            ...createBusinessClientDto,  // Spread the DTO data
            userId:user.userId,
            user: user,  // Assign the full user entity
        });


        // Save the business client to the database
        return await this.businessClientsRepository.save(businessClient);
    }

    async updateBusinessClient(id: string, updateUserDto: UpdateBusinessClientDto,file?: Express.Multer.File): Promise<BusinessClients> {
        const user = await this.businessClientsRepository.findOne({ where: { BusinessId: id } });
        if (!user) {
            throw new NotFoundException('BusinessClient not found');
        }
        if(file){
            try {
                const imageUrl = await this.azureBlobService.upload(file, 'upload-file');
                updateUserDto.imgurl = imageUrl; // Add image URL to DTO
            } catch (error) {
                console.error('Error uploading file:', error);
                throw new Error('Failed to upload file');
            }
        }
        return await this.businessClientsRepository.save({ ...user, ...updateUserDto });
    }
    
    async editAddress(oldaddressDto:AddressDto,newaddressDto:AddressDto, id: string): Promise<BusinessClients> {
        const user = await this.businessClientsRepository.findOne({ where: { BusinessId: id } });
        if (!user) {
            throw new NotFoundException('BusinessClient not found');
        }
        if (oldaddressDto) {
            const existingAddress = user.addresses.find(address => address.street === oldaddressDto.street && address.city === oldaddressDto.city && address.district === oldaddressDto.district && address.state === oldaddressDto.state && address.pincode === oldaddressDto.pincode);
            if (existingAddress) {
                Object.assign(existingAddress, newaddressDto);
            } else {
                user.addresses.push(newaddressDto);
            }
        }
        else {
            user.addresses.push(newaddressDto);
        }
        return await this.businessClientsRepository.save(user);
    }
    async addAddresses(id: string, addresses: AddressDto[]) {
        const user = await this.businessClientsRepository.findOne({ where: { BusinessId: id } });
        if (!user) {
            throw new NotFoundException('BusinessClient not found');
        }
        
        if (!addresses || addresses.length === 0) {
            throw new Error('No addresses provided');
        }

        user.addresses = [...user.addresses, ...addresses];

        try {
            await this.businessClientsRepository.save(user);
        } catch (error) {
            console.error('Error updating addresses:', error);
            throw new Error('Failed to update addresses');
        }

    }
}