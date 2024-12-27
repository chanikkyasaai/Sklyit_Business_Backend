import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Post('services')
    createServices(
        @Param('business_id') bs_id: string,
        @Body() createServicesDto: CreateServiceDto
    ):Promise<Services>{
        return this.bsservicesService.createServices(bs_id,createServicesDto);
    }
}
