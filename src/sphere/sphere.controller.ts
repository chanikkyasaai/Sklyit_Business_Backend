import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';
import { SphereService } from './sphere.service';

@Controller('sklyit-sphere/')
@UseGuards(JwtCustomerAuthGuard)
export class SphereController {
    constructor(
            private readonly postsService: SphereService,) { }
    @Get('top/all-time')
    async getTopAllTime(@Query('limit') limit: number) {
        return this.postsService.getTopPostsAllTime(limit);
    }

    @Get('top/newest')
    async getTopNewest(@Query('limit') limit: number) {
        return this.postsService.getTopPostsNewestThenLikes(limit);
    }
}