import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BusinessCustomersService } from './business_customers.service';
import { Customers } from './business_customers.entity';
import { CreateBusinessCustomerDto } from './bscustomer.dto';

@Controller('bs/:business_id/')
export class BusinessCustomersController {
    constructor(private readonly businessCustomersService: BusinessCustomersService) { }
    
    @Get('bs_customers')
    async getAllBusinessCustomers(@Param('business_id') bs_id: string): Promise<Customers[]> {
        return await this.businessCustomersService.getAllBusinessCustomers(bs_id);
    }

    @Get('bs_customers/:cust_id')
    async getBusinessCustomerByID(@Param('business_id') bs_id: string, @Param('cust_id') cust_id: string): Promise<Customers> {
        return await this.businessCustomersService.getBusinessCustomerByID(bs_id, cust_id);
    }

    @Get('bs_customer')
    async getAllBusinessCustomersByFlag(@Param('business_id') bs_id: string): Promise<Customers[]> {
        return await this.businessCustomersService.getAllBusinessCustomersByFlag(bs_id);
    }

    @Get('bs_customer/:cust_id')
    async getBusinessCustomerByFlag(@Param('business_id') bs_id: string, @Param('cust_id') cust_id: string): Promise<Customers> {
        return await this.businessCustomersService.getBusinessCustomerByFlag(bs_id, cust_id);
    }
    @Post('bs_customers')
    async createBusinessCustomer(
        @Param('business_id') bs_id: string,
        @Body() createCustomerDto: CreateBusinessCustomerDto
    ): Promise<Customers> {
        return await this.businessCustomersService.createBusinessCustomer(bs_id, createCustomerDto);
    }

    @Put('bs_customers/:cust_id')
    async updateBusinessCustomer(@Param('business_id') bs_id: string, @Param('cust_id') cust_id: string, @Body() updateCustomerDto: CreateBusinessCustomerDto): Promise<Customers> {
        return await this.businessCustomersService.updateBusinessCustomer(bs_id, cust_id, updateCustomerDto);
    }

    @Put('bs_customer/:cust_id')
    async updateBusinessCustomerFlag(
        @Param('business_id') bs_id: string,
        @Param('cust_id') cust_id: string
    ): Promise<Customers> {
        return await this.businessCustomersService.updateBusinessCustomerFlag(bs_id, cust_id);
    }
    @Delete('bs_customers/:cust_id')
    async deleteBusinessCustomer(@Param('business_id') bs_id: string, @Param('cust_id') cust_id: string): Promise<void> {
        return await this.businessCustomersService.deleteBusinessCustomer(bs_id, cust_id);
    }
}
