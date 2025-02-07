import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @UseGuards(JwtCustomerAuthGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @UseGuards(JwtAuthGuard, JwtCustomerAuthGuard)
  @Get('business/:business_id')
  async findAllByBuinessId(@Req() req,@Param('business_id')bs_id:string) {
    return this.reviewsService.findAllByBuinessId(bs_id);
  }

  @UseGuards(JwtAuthGuard,JwtCustomerAuthGuard)
  @Get('service/:service_id')
  async findAllByServiceId(
    @Req() req,
    @Param('id') id: string) {
    return this.reviewsService.findAllByServiceId(id, req.user.bs_id);
  }


  @Get('customer/:id')
  async findAllByCustomerId(@Param(':id') custId: string) {
    return this.reviewsService.findAllByCustomerId(custId);
  }

  @UseGuards(JwtAuthGuard, JwtCustomerAuthGuard)
  @Get('business/average/:business_id')
  async findAverageRatingByBusinessId(@Param('business_id') id: string) {
    return this.reviewsService.findAverageRatingByBusinessId(id);
  }

  @UseGuards(JwtAuthGuard, JwtCustomerAuthGuard)
  @Get('bs/:bs_id/service/average/:s_id')
  async findAverageRatingByServiceId(
    @Param('bs_id') bs_id: string,
    @Param('s_id') s_id: string) {
    return this.reviewsService.findAverageRatingByServiceId(s_id, bs_id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @UseGuards(JwtCustomerAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @UseGuards(JwtCustomerAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
