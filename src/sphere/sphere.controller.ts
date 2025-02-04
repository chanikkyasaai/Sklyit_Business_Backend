import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';
import { SphereService } from './sphere.service';

@Controller('sklyit-sphere/')
@UseGuards(JwtCustomerAuthGuard)
export class SphereController {
    constructor(
            private readonly postsService: SphereService,) { }
    @Get('posts/top/all-time')
    async getTopAllTime(@Query('limit') limit: number) {
        return this.postsService.getTopPostsAllTime(limit);
    }

    @Get('posts/top/newest')
    async getTopNewest(@Query('limit') limit: number) {
        return this.postsService.getTopPostsNewestThenLikes(limit);
    }

    @Get('business/services/id/:businessId')
    async getServicesByBusinessId(@Param('businessId') businessId: string) {
        return this.postsService.fetchServicesByBusinessId(businessId);
    }

    @Get('business/services/top')
    async getServicesOrderedByMostBookings(@Query('limit') limit: number) {
        return this.postsService.fetchServicesOrderedByMostBookings(limit);
    }

    @Get('professional/services/id/:professionalId')
    async getServicesByProfessionalId(@Param('professionalId') professionalId: string) {
        return this.postsService.fetchServicesByProfessionId(professionalId);
    }

    @Get('professional/services/top')
    async getServicesOrderedByMostBookingsByProfessional(@Query('limit') limit: number) {
        return this.postsService.fetchProfessionalServicesOrderedByBookingCount(limit);
    }

    @Get('business/products/id/:businessId')
    async getProductsByBusinessId(@Param('businessId') businessId: string) {
        return this.postsService.fetchProductsByBusinessId(businessId);
    }

    @Get('business/posts/id/:businessId')
    async getPostsByBusinessId(@Param('businessId') businessId: string) {
        return this.postsService.getAllPosts(businessId);
    }

}