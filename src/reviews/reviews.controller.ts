import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';

@Controller('reviews')
@UseGuards(JwtCustomerAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get('business/:id')
  async findAllByBuinessId(@Param('id') id: string) {
    return this.reviewsService.findAllByBuinessId(id);
  }

  @Get('service/:id')
  async findAllByServiceId(@Param('id') id: string) {
    return this.reviewsService.findAllByServiceId(id);
  }

  @Get('customer')
  async findAllByCustomerId(@Req () req) {
    return this.reviewsService.findAllByCustomerId(req.user.userId);
  }

  @Get('business/average/:id')
  async findAverageRatingByBusinessId(@Param('id') id: string) {
    return this.reviewsService.findAverageRatingByBusinessId(id);
  }

  @Get('service/average/:id')
  async findAverageRatingByServiceId(@Param('id') id: string) {
    return this.reviewsService.findAverageRatingByServiceId(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewsService.remove(id);
  }
}
