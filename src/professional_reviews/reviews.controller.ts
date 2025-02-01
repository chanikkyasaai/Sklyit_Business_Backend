import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateReviewDto } from './dto/createreview.dto';
import { ReviewsService } from './reviews.service';
import { Review } from './schema/reviewschema';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewservice: ReviewsService) {}

  @Post('create')
  async createReview(@Body() reviewdto: CreateReviewDto): Promise<Review> {
    return this.reviewservice.createReview(reviewdto);
  }

  @Get('professional/:id')
  @UseGuards(JwtCustomerAuthGuard)
  async getReviews(@Param('id') id: string, @Req() req): Promise<{averageRating: number, topreviews: string[]}> {
    return this.reviewservice.getReviews(id);
  }
}
