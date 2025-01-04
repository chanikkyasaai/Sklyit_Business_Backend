import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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

      // Endpoints to get top 3 services for a given period
    @Get('top-services-count')
    async getTopServicesCount(
      @Param('business_id') business_id: string,
      // @Query('startDate') startDate: string,
      // @Query('endDate') endDate: string,
    ) {
      return this.bsordersService.getTop3Services(parseInt(business_id));
    }
    @Get('bottom-services-count')
    async getBottomServicesCount(
      @Param('business_id') business_id: string,
      // @Query('startDate') startDate: string,
      // @Query('endDate') endDate: string,
    ) {
      return this.bsordersService.getBottom3Services(parseInt(business_id));
    }
    //BY REVENUE
    @Get('top-services-revenue')
    async getTopServicesRevenue(
      @Param('business_id') business_id: string,
    ) {
      return this.bsordersService.getTop3ServicesByRevenue(parseInt(business_id));
    }
    @Get('top-services-revenue-weekly')
    async getTopServicesRevenueWeek(
      @Param('business_id') business_id: string,
    ) {
      return this.bsordersService.getTop3ServicesByRevenueWeek(parseInt(business_id));
    }

    @Get('top-services-revenue-yearly')
    async getTopServicesRevenueYear(
      @Param('business_id') business_id: string,
    ) {
      return this.bsordersService.getTop3ServicesByRevenueYear(parseInt(business_id));
    }

  // Endpoint for weekly analytics (with business_id)
  @Get('total-analytics')
  async getTotalAnalytics(@Param('business_id') businessId: number) {
    return this.bsordersService.getTotalCustomersAndRevenueInBusiness(businessId); 
  }

  @Get('top-customers-revenue')
  async getTopCustomersBySpending(
    @Param('business_id') business_id: string,
  ) {
    return this.bsordersService.getTop6CustomersBySpending(parseInt(business_id));
  }

  @Get('bottom-customers-revenue')
  async getBottomCustomersBySpending(
    @Param('business_id') business_id: string,
  ) {
    return this.bsordersService.getBottom3CustomersBySpending(parseInt(business_id));
  }

  @Get('top-customers-count')
  async getTopCustomersByVisited(
    @Param('business_id') business_id: string,
  ) {
    return this.bsordersService.getTop3VisitedCustomers(parseInt(business_id));
  }
  
  @Get('bottom-customers-count')
  async getBottomCustomersByVisited(
    @Param('business_id') business_id: string,
  ) {
    return this.bsordersService.getBottom3VisitedCustomers(parseInt(business_id));
  }

  @Get('weekly')
  async getWeeklyAnalytics(
    @Param('business_id') businessId: number, // Include business_id as a query parameter
  ) {
    return this.bsordersService.getWeeklyAnalytics(businessId);
  }

  // Endpoint for monthly analytics (with business_id)
  @Get('monthly')
  async getMonthlyAnalytics(
    @Param('business_id') businessId: number, // Include business_id as a query parameter
  ) {
    return this.bsordersService.getMonthlyAnalytics(businessId);
  }


}
