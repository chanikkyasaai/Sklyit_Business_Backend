import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BusinessCustomersService } from './business_customers.service';
import { Customers } from './business_customers.entity';
import { CreateBusinessCustomerDto } from './bscustomer.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('bs/')
@UseGuards(JwtAuthGuard)
export class BusinessCustomersController {
    constructor(private readonly businessCustomersService: BusinessCustomersService) { }

    @Get('bs_customers')
    async getAllBusinessCustomers(@Req() req): Promise<Customers[]> {
        return await this.businessCustomersService.getAllBusinessCustomers(req.user.bs_id);
    }

    @Get('bs_customers/:cust_id')
    async getBusinessCustomerByID(@Req() req, @Param('cust_id') cust_id: string): Promise<Customers> {
        return await this.businessCustomersService.getBusinessCustomerByID(req.user.bs_id, cust_id);
    }

    @Get('bs_customer')
    async getAllBusinessCustomersByFlag(@Req() req): Promise<Customers[]> {
        return await this.businessCustomersService.getAllBusinessCustomersByFlag(req.user.bs_id);
    }

    @Get('bs_customer/:cust_id')
    async getBusinessCustomerByFlag(@Req() req, @Param('cust_id') cust_id: string): Promise<Customers> {
        return await this.businessCustomersService.getBusinessCustomerByFlag(req.user.bs_id, cust_id);
    }
    @Post('bs_customers')
    async createBusinessCustomer(
        @Req() req,
        @Body() createCustomerDto: CreateBusinessCustomerDto
    ): Promise<Customers> {
        return await this.businessCustomersService.createBusinessCustomer(req.user.bs_id, createCustomerDto);
    }

    @Put('bs_customers/:cust_id')
    async updateBusinessCustomer(@Req() req, @Param('cust_id') cust_id: string, @Body() updateCustomerDto: CreateBusinessCustomerDto): Promise<Customers> {
        return await this.businessCustomersService.updateBusinessCustomer(req.user.bs_id, cust_id, updateCustomerDto);
    }

    @Put('bs_customer/:cust_id')
    async updateBusinessCustomerFlag(
        @Req() req,
        @Param('cust_id') cust_id: string
    ): Promise<Customers> {
        return await this.businessCustomersService.updateBusinessCustomerFlag(req.user.bs_id, cust_id);
    }
    @Delete('bs_customers/:cust_id')
    async deleteBusinessCustomer(@Req() req, @Param('cust_id') cust_id: string): Promise<void> {
        return await this.businessCustomersService.deleteBusinessCustomer(req.user.bs_id, cust_id);
    }

    @Get('new_old_customers')
    async getNewOldCustomers(@Req() req):
        Promise<{ newCustomers: number; oldCustomers: number; newPercentage: number; oldPercentage: number }> {
        return await this.businessCustomersService.getNewOldCustomers(req.user.bs_id);
    }

}
