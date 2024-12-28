import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BsservicesService } from './bsservices.service';
import { Services } from './services.entity';
import { CreateServiceDto } from './dto/createServiceDto';

@Controller('bs/:business_id/')
export class BsservicesController {
    constructor(private readonly bsservicesService: BsservicesService) { }

    @Get('hello')
    getHello(): string {
        return this.bsservicesService.getHello();
    }

    @Get('services')
    getServices(@Param('business_id')bs_id: string): Promise<Services[]> {
        return this.bsservicesService.getServices(bs_id);
    }

    @Get('services/:service_id')
    getServiceById(@Param('business_id') bs_id: string, @Param('service_id') service_id: string): Promise<Services> {
        return this.bsservicesService.getServiceById(bs_id,service_id);
    }
    @Post('services')
    createServices(
        @Param('business_id') bs_id: string,
        @Body() createServicesDto: CreateServiceDto
    ):Promise<Services>{
        return this.bsservicesService.createServices(bs_id,createServicesDto);
    }

    @Put('services/:service_id')
    updateServices(
        @Param('business_id') bs_id: string,
        @Param('service_id') service_id: string,
        @Body() updateServicesDto: CreateServiceDto
    ):Promise<Services>{
        return this.bsservicesService.updateServices(bs_id,service_id,updateServicesDto);
    }

    @Delete('services/:service_id')
    deleteServices(@Param('business_id') bs_id: string, @Param('service_id') service_id: string):Promise<void>{
        return this.bsservicesService.deleteServices(bs_id,service_id);
    }
}

