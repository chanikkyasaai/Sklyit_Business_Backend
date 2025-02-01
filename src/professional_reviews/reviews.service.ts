import { Injectable } from '@nestjs/common';
import { Review } from './schema/reviewschema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/createreview.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Review.name) private reviewModel: Model<Review>,
    ) {}

    async createReview(reviewdto: CreateReviewDto): Promise<Review> {
        const review = new this.reviewModel(reviewdto);
        return review.save();
    }

    async getReviews(professional_id: string): Promise<{ averageRating: number; topreviews: string[]; total: number }> {
        // Aggregate to calculate the average rating
        const [result] = await this.reviewModel.aggregate([
            { $match: { professionId: professional_id } }, // Ensure professionId is matched as a string
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                },
            },
        ]);
    
        const topreviews = await this.reviewModel
            .find({ professionId: professional_id }) 
            .sort({ rating: -1 })
            .limit(5)
            .exec();

        const total = await this.reviewModel.countDocuments({ professionId: professional_id });
    
        return {
            averageRating: result ? result.averageRating : 0,
            topreviews: topreviews.map((review) => review.review),
            total: total
        };
    }
    
}
