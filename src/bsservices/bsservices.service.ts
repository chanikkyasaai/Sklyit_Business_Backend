import { Injectable } from '@nestjs/common';
import { Services } from './services.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BsservicesService {
    constructor(@InjectRepository(Services) private readonly serviceRepository: Repository<Services>,) { }
    getHello(): string {
        return 'Hello World!';
    }

    // async getServices(bs_id: number): Promise<Services[]> {
    //     return await this.serviceRepository.find({});
    // }

    
}
