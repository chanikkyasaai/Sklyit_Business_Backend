import { Controller, Get } from '@nestjs/common';
import { BsservicesService } from './bsservices.service';

@Controller('bs/:business_id/')
export class BsservicesController {
    constructor(private readonly bsservicesService: BsservicesService) { }
    
    @Get('hello')
    getHello(): string {
        return this.bsservicesService.getHello();
    }
}
