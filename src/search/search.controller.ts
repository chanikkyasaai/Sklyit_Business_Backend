import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto, SearchProfessionalsDto } from './search.dto';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';

@Controller('search/')
@UseGuards(JwtCustomerAuthGuard)
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('business')
    async searchBusinessClients(@Req() req, @Query() filters: SearchDto) {
        return await this.searchService.searchBusinessClients(filters, req.user.userid);
    }

    @Get('business/:id')
    async getBusinessById(@Param('id') id: string) {
        return this.searchService.getBusinessById(id);
    }

    @Get('business/tag/:tag')
    async searchBusinessByTag(@Req() req, @Param('tag') tag: string) {
        return this.searchService.searchBusinessByTag(req.user.userid, tag);
    }

    @Get('business/trending/:limit')
    async getTrendingBusinesses(@Req() req, @Param('limit') limit: number) {
      return this.searchService.getTopBusinessesByOrdersYesterday(limit);
    }
  
    @Get('top-businesses/:limit')
    async getTopBusinesses(@Req() req, @Param('limit') limit: number) {
      return this.searchService.getTopBusinessesByOrders(limit);
    }

    @Get('professionals')
    async searchProfessionals(@Req() req, @Query() filters: SearchProfessionalsDto) {
        return await this.searchService.searchProfessionals(req.user.userid, filters);
    }

    @Get('professional/:id')
    async getProfessionalById(@Param('id') id: string) {
        return this.searchService.getProfessionalById(id);
    }

    @Get('professional/tag/:tag')
    async searchProfessionalByTag(@Req() req, @Param('tag') tag: string) {
        return this.searchService.searchProfessionals(req.user.userid, {tag: tag});
    }

    @Get('professional/trending/:limit')
    async getTrendingProfessionals(@Req() req, @Param('limit') limit: number) {
      return this.searchService.getTopProfessionalsByBookingsYesterday(limit);
    }

    @Get('top-professionals/:limit')
    async getTopProfessionals(@Req() req, @Param('limit') limit: number) {
      return this.searchService.getTopProfessionalsByTotalBookings(limit);
    }
}
