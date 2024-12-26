import { Injectable } from '@nestjs/common';
import { Service } from './services.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BsservicesService {
    constructor(@InjectRepository(Service) private readonly serviceRepository: Repository<Service>,) { }
    getHello(): string {
        return 'Hello World!';
    }

    // async getServices(bs_id: number): Promise<Service[]> {
    //     return await this.serviceRepository.find({});
    // }

    
}
