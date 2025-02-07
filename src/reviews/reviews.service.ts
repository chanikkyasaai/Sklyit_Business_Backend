import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review_Business } from './entities/review.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review_Business.name)
    private readonly reviewModel: Model<Review_Business>,
  ) {}
  async create(createReviewDto: CreateReviewDto) : Promise<Review_Business> {
    const review = new this.reviewModel(createReviewDto);
    console.log(createReviewDto, review);
    return await review.save();
  }

  async findAllByBuinessId(businessId: string) : Promise<Review_Business[]> {
    return this.reviewModel
      .find({ businessId: businessId })
      .exec();
  }

  async findAllByServiceId(serviceId: string,businessId:string) : Promise<Review_Business[]> {
    return this.reviewModel
      .find({ serviceId: serviceId ,businessId:businessId})
      .exec();
  }

  async findAllByCustomerId(customerId: string) : Promise<Review_Business[]> {
    return this.reviewModel
      .find({ CustId: customerId })
      .exec();
  }

  async findOne(id: string) : Promise<Review_Business> {
    return this.reviewModel
      .findOne({_id: id})
      .exec();
  }

  async findAverageRatingByBusinessId(businessId: string) : Promise<Record<string, number>> {
    const reviews = await this.reviewModel
      .find({ businessId: businessId })
      .exec();
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      "rating" : totalRatings / reviews.length,
      "count": reviews.length
    };
  }

  async findAverageRatingByServiceId(serviceId: string,businessId:string) : Promise<Record<string, number>> {
    const reviews = await this.reviewModel
      .find({ serviceId: serviceId,businessId:businessId })
      .exec();
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    return {
      "rating" : totalRatings / reviews.length,
      "count": reviews.length
    };
  }



  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review_Business> {
    return this.reviewModel
      .findOneAndUpdate({_id: id}, updateReviewDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<string> {
    await this.reviewModel
      .findOneAndDelete({ _id: id})
      .exec();
    return 'Review deleted successfully';
  }
}
