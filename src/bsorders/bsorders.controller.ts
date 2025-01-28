import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BsordersService } from './bsorders.service';
import { Orders } from './bsorders.entity';
import { CreateOrdersDto } from './bsorders.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('bs/')
@UseGuards(JwtAuthGuard)
export class BsordersController {
    constructor(private readonly bsordersService: BsordersService) { }
    
    @Get('orders')
    async getAllOrders(@Req() req): Promise<Orders[]> {
      return this.bsordersService.getAllOrders(req.user.bs_id);
    }

    @Get('orders/:Oid')
    async getOrderById(@Req() req,@Param('Oid') Oid: string): Promise<Orders> {
      return this.bsordersService.getOrderById(req.user.bs_id, Oid);
    }

    @Post('orders')
    async createOrder(@Req() req,@Body() createOrderDto: CreateOrdersDto): Promise<Orders> {
      return this.bsordersService.createOrder(req.user.bs_id, createOrderDto);  
    }

    @Put('orders/:Oid')
    async updateOrder(@Req() req, @Param('Oid') Oid: string, @Body() updateOrderDto: CreateOrdersDto): Promise<Orders> {  
      return this.bsordersService.updateOrder(req.user.bs_id, Oid, updateOrderDto);
    }

    @Delete('orders/:Oid')
    async deleteOrder(@Req() req,@Param('Oid') Oid: string): Promise<void> {
      return this.bsordersService.deleteOrder(req.user.bs_id, Oid);
    }

      // Endpoints to get top 3 services for a given period
    @Get('top-services-count')
    async getTopServicesCount(
      @Req() req,
      // @Query('startDate') startDate: string,
      // @Query('endDate') endDate: string,
    ) {
      return this.bsordersService.getTop3Services(parseInt(req.user.bs_id));
    }
    @Get('bottom-services-count')
    async getBottomServicesCount(@Req() req,
      // @Query('startDate') startDate: string,
      // @Query('endDate') endDate: string,
    ) {
      return this.bsordersService.getBottom3Services(parseInt(req.user.bs_id));
    }
    //BY REVENUE
    @Get('top-services-revenue')
    async getTopServicesRevenue(
      @Req() req,
    ) {
      return this.bsordersService.getTop3ServicesByRevenue(parseInt(req.user.bs_id));
    }
    @Get('top-services-revenue-weekly')
    async getTopServicesRevenueWeek(
      @Req() req,
    ) {
      return this.bsordersService.getTop3ServicesByRevenueWeek(parseInt(req.user.bs_id));
    }

    @Get('top-services-revenue-yearly')
    async getTopServicesRevenueYear(
      @Req() req,
    ) {
      return this.bsordersService.getTop3ServicesByRevenueYear(parseInt(req.user.bs_id));
    }

  // Endpoint for weekly analytics (with req.user.bs_id)
  @Get('total-analytics')
  async getTotalAnalytics(@Req() req) {
    return this.bsordersService.getTotalCustomersAndRevenueInBusiness(req.user.bs_id); 
  }

  @Get('top-customers-revenue')
  async getTopCustomersBySpending(
    @Req() req,
  ) {
    return this.bsordersService.getTop6CustomersBySpending(parseInt(req.user.bs_id));
  }

  @Get('bottom-customers-revenue')
  async getBottomCustomersBySpending(
    @Req() req,
  ) {
    return this.bsordersService.getBottom3CustomersBySpending(parseInt(req.user.bs_id));
  }

  @Get('top-customers-count')
  async getTopCustomersByVisited(
    @Req() req,
  ) {
    return this.bsordersService.getTop3VisitedCustomers(parseInt(req.user.bs_id));
  }
  
  @Get('bottom-customers-count')
  async getBottomCustomersByVisited(
    @Req() req,
  ) {
    return this.bsordersService.getBottom3VisitedCustomers(parseInt(req.user.bs_id));
  }

  @Get('weekly_analytics')
  async getWeeklyAnalytics(
    @Req() req)  // Include req.user.bs_id as a query parameter
   {
    return this.bsordersService.getWeeklyAnalytics(req.user.bs_id);
  }

  // Endpoint for monthly analytics (with req.user.bs_id)
  @Get('monthly_analytics')
  async getMonthlyAnalytics(
    @Req() req // Include req.user.bs_id as a query parameter
  ) {
    return this.bsordersService.getMonthlyAnalytics(req.user.bs_id);
  }

  @Get('new_old_revenue')
  async getNewOldCustomersRevenue(
    @Req() req,
  ) {
    return this.bsordersService.getNewOldCustomersRevenue(parseInt(req.user.bs_id));
  }

  @Get('monthly_comparison')
  async getMonthlyComparison(
    @Req() req,
    @Query('year') year: number,
    @Query('month') month: number,
  ) {
    return this.bsordersService.getMonthlyComparison(parseInt(req.user.bs_id), year, month);
  }
  
  @Get('past_services')
  async getPastServices(
    @Req() req,
    @Body('CustId') CustId: number,
  ) {
    return this.bsordersService.getPastServices(parseInt(req.user.bs_id), CustId);
  }
  
  @Get('retention_churn_rate')
  async getRetentionChurnRate(
    @Req() req,
    @Query('year') year: number,
    @Query('month') month: number
  ) {
    return this.bsordersService.getRetentionAndChurnRate(parseInt(req.user.bs_id), year, month);
  }
}
