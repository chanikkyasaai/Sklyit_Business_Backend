import { Injectable } from '@nestjs/common';
import { Services } from './services.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/createServiceDto';

@Injectable()
export class BsservicesService {
    constructor(@InjectRepository(Services) private readonly serviceRepository: Repository<Services>,) { }
    getHello(): string {
        return 'Hello World!';
    }

    async getServices(bs_id: string): Promise<Services[]> {
        if (bs_id === null || bs_id === undefined) {
            throw new Error('bs_id is null or undefined');
        }
        try {
            return await this.serviceRepository
                .createQueryBuilder('service')
                .innerJoin('service.businessClient', 'businessClient')
                .where('businessClient.business_id = :bs_id', { bs_id })
                .getMany();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createServices(bs_id: string, createServicesDto: CreateServiceDto): Promise<Services> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }
        
        const { name, description, price } = createServicesDto;
        
        if (!name || !price) {
            throw new Error('Name and Price are required fields');
        }

        const service = this.serviceRepository.create({
            ServiceName: name,
            ServiceDesc: description || '',
            ServiceCost: price,
            businessClient: { BusinessId: bs_id }
        });

        try {
            return await this.serviceRepository.save(service);
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
