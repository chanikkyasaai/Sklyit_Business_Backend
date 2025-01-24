import { Injectable } from '@nestjs/common';
import { Services } from './services.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto, UpdateServiceDto } from './dto/createServiceDto';
import { AzureBlobService } from 'src/imageBlob/imageBlob.service';

@Injectable()
export class BsservicesService {

    private readonly containerName = 'upload-file';

    constructor(
        @InjectRepository(Services)
        private readonly serviceRepository: Repository<Services>,
        private azureBlobService: AzureBlobService

    ) { }
    getHello(): string {
        return 'Hello World!';
    }

    async getServices(bs_id: string): Promise<Services[]> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }
        try {
            return await this.serviceRepository.find({
                where: { businessClient: { BusinessId: bs_id } },
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getServiceById(bs_id: string, service_id: string): Promise<Services> {
        if (!bs_id || !service_id) {
            throw new Error('Business ID and Service ID are required');
        }
        try {
            return await this.serviceRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, Sid: service_id },
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getServicesByFlag(
        bs_id:string
    ): Promise<Services[]>{
        if (!bs_id) {
            throw new Error("Business id is required")
        }
        try {
            return await this.serviceRepository.find({
                where: { businessClient: { BusinessId: bs_id } ,Sflag:0},
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getServiceByFlag(bs_id: string, service_id: string): Promise<Services>{
        if (!bs_id || !service_id) {
            throw new Error('Business ID and Service ID are required');
        }
        try {
            return await this.serviceRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, Sid: service_id },
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async createServices(bs_id: string, createServicesDto: CreateServiceDto, file?: Express.Multer.File): Promise<Services> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }

        const { name, description, price } = createServicesDto;
        let imageUrl = '';
        if(file){
            imageUrl = await this.azureBlobService.upload(file, this.containerName)

        }
        if (!name || !price) {
            throw new Error('Name and Price are required fields');
        }

        const service = this.serviceRepository.create({
            ServiceName: name,
            ServiceDesc: description || '',
            ServiceCost: price,
            ImageUrl:imageUrl||'',
            businessClient: { BusinessId: bs_id }
        });

        try {
            return await this.serviceRepository.save(service);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateServices(bs_id: string, service_id: string, updateServicesDto: UpdateServiceDto,file?: Express.Multer.File): Promise<Services> {
        if (!bs_id || !service_id) {
            throw new Error('Business ID and Service ID are required');
        }
        const { name, description, price, imageUrl } = updateServicesDto;
        const service = await this.serviceRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, Sid: service_id },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
        if (!service) {
            throw new Error('Service not found');
        }
        if(file){
            const imageUrl = await this.azureBlobService.upload(file, this.containerName);
            service.ImageUrl = imageUrl;
        }
        if(imageUrl){
            service.ImageUrl = imageUrl;
        }
        service.ServiceName = name || service.ServiceName;
        service.ServiceDesc = description || service.ServiceDesc;
        service.ServiceCost = price || service.ServiceCost;
        try {
            return await this.serviceRepository.save(service);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateServiceFlag(
        bs_id: string,
        service_id: string
    ):Promise<Services> {
        if (!bs_id || !service_id) {
            throw new Error('Business ID and Service ID are required');
        }
        const service = await this.serviceRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, Sid: service_id },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
        if (!service) {
            throw new Error('Service not found');
        }
        service.Sflag = 1;
        try {
            return await this.serviceRepository.save(service);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteServices(bs_id: string, service_id: string): Promise<void> {
        if (!bs_id || !service_id) {
            throw new Error('Business ID and Service ID are required');
        }
        const service = await this.serviceRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, Sid: service_id },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
        if (!service) {
            throw new Error('Service not found');
        }
        try {
            await this.serviceRepository.remove(service);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
