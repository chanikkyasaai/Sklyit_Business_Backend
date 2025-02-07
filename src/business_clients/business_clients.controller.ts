import { Body, Controller, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessClientsService } from './business_clients.service';
import { AddressDto, CreateBusinessClientDto, UpdateBusinessClientDto } from './business_clients.dto';
import { BusinessClients } from './business_clients.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('bs')
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

  @Get('clients/')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Req() req): Promise<BusinessClients> {
    return this.userService.getBusinessClientByID(req.user.bs_id);
  }


  @Put('clients')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateBusinessClientDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<BusinessClients> {
    return this.userService.updateBusinessClient(req.user.bs_id, updateUserDto, file);
  }

  @Put('clients/address/add')
  @UseGuards(JwtAuthGuard)
  async addAdresses(
    @Req() req,
    @Body() addresses:AddressDto[]
  ) {
    return await this.userService.addAddresses(req.user.bs_id, addresses);
  }

  @Put('clients/address/')
  @UseGuards(JwtAuthGuard)
  async editAddress(
    @Req() req,
    @Body('newAddress') newAddressDto: AddressDto,
    @Body('oldAddress') oldAddressDto: AddressDto
  ): Promise<BusinessClients> {
    return await this.userService.editAddress(oldAddressDto, newAddressDto, req.user.bs_id);
  }

  
  @Put('clients/address/delete')
  @UseGuards(JwtAuthGuard)
  async deleteAddress(
    @Req() req,
    @Body('address') addressDto: AddressDto
  ): Promise<BusinessClients> {
    return await this.userService.deleteAddress(req.user.bs_id, addressDto);
  }
}
