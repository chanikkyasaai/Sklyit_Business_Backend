import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchBusinessClientsDto } from './search.dto';
import { JwtAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';

@Controller('search/')
@UseGuards(JwtAuthGuard)
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async searchBusinessClients(@Req() req, @Query() filters: SearchBusinessClientsDto) {
        return await this.searchService.searchBusinessClients(filters, req.user.sub);
    }

    @Get('trending/:limit')
    async getTrendingBusinesses(@Req() req, @Param('limit') limit: number) {
      return this.searchService.getTopBusinessesByOrdersYesterday(limit);
    }
  
    @Get('top-businesses/:limit')
    async getTopBusinesses(@Req() req, @Param('limit') limit: number) {
      return this.searchService.getTopBusinessesByOrders(limit);
    }
}
