import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BsordersService } from './bsorders.service';
import { Orders } from './bsorders.entity';
import { CreateOrdersDto } from './bsorders.dto';

@Controller('bs/:business_id/')
export class BsordersController {
    constructor(private readonly bsordersService: BsordersService) { }
    
    @Get('orders')
    async getAllOrders(@Param('business_id') business_id: string): Promise<Orders[]> {
      return this.bsordersService.getAllOrders(business_id);
    }

    @Get('orders/:Oid')
    async getOrderById(@Param('business_id') business_id: string,@Param('Oid') Oid: string): Promise<Orders> {
      return this.bsordersService.getOrderById(business_id, Oid);
    }

    @Post('orders')
    async createOrder(@Param('business_id') business_id: string,@Body() createOrderDto: CreateOrdersDto): Promise<Orders> {
      return this.bsordersService.createOrder(business_id, createOrderDto);  
    }

    @Put('orders/:Oid')
    async updateOrder(@Param('business_id') business_id: string, @Param('Oid') Oid: string, @Body() updateOrderDto: CreateOrdersDto): Promise<Orders> {  
      return this.bsordersService.updateOrder(business_id, Oid, updateOrderDto);
    }

    @Delete('orders/:Oid')
    async deleteOrder(@Param('business_id') business_id: string,@Param('Oid') Oid: string): Promise<void> {
      return this.bsordersService.deleteOrder(business_id, Oid);
    }
}
