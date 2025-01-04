import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BusinessClientsService } from './business_clients.service';
import { CreateBusinessClientDto } from './business_clients.dto';
import { BusinessClients } from './business_clients.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('Sklyit/bs')
export class BusinessClientsController {
  constructor(private readonly userService: BusinessClientsService) { }


  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async registerUser(
    @Body() createBusinessClientDto: CreateBusinessClientDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<BusinessClients> {
    return this.userService.registerBusinessClient(createBusinessClientDto, file);
  }

  @Get()
  async getAllUsers(): Promise<BusinessClients[]> {
    return this.userService.getAllBusinessClients();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<BusinessClients> {
    return this.userService.getBusinessClientByID(id);
  }

  
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateBusinessClientDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<BusinessClients> {
    return this.userService.updateBusinessClient(id, updateUserDto,file);
  }
}
