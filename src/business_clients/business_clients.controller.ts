import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BusinessClientsService } from './business_clients.service';
import { CreateBusinessClientDto } from './business_clients.dto';
import { BusinessClients } from './business_clients.entity';

@Controller('Sklyit/bs')
export class BusinessClientsController {
     constructor(private readonly userService: BusinessClientsService) {}
    
      @Post('register')
      async registerUser(@Body() createBusinessClientDto: CreateBusinessClientDto): Promise<BusinessClients> {
        return this.userService.registerBusinessClient(createBusinessClientDto);
      }
    
      @Get()
      async getAllUsers(): Promise<BusinessClients[]> {
        return this.userService.getAllBusinessClients();
      }
    
      @Get(':id')
      async getUserById(@Param('id') id: string): Promise<BusinessClients> {
        return this.userService.getBusinessClientByID(id);
      }
}
