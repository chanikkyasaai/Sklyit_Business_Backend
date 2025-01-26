import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchBusinessClientsDto } from './search.dto';

@Controller('search/:userId')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    async searchBusinessClients(@Param ('userId') userId: string, @Query() filters: SearchBusinessClientsDto) {
        return await this.searchService.searchBusinessClients(filters, userId);
    }

    @Get('trending/:limit')
    async getTrendingBusinesses(@Param('limit') limit: number) {
      return this.searchService.getTopBusinessesByOrdersYesterday(limit);
    }
  
    @Get('top-businesses/:limit')
    async getTopBusinesses(@Param('limit') limit: number) {
      return this.searchService.getTopBusinessesByOrders(limit);
    }
}
