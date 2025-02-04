import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from '../bspost/bspost.schema';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/professional-entities/entities/service.entity';
import { Repository } from 'typeorm';
import { Services } from 'src/bsservices/services.entity';
import { PrBooking } from 'src/booking/entity/booking.entity';
import { Products } from 'src/bsproducts/bsproducts.entity';
import { Orders } from 'src/bsorders/bsorders.entity';

@Injectable()
export class SphereService {
    constructor(
            @InjectModel(Post.name)
            private postModel: Model<Post>,
            @InjectRepository(Service)
            private professionalServiceRepository: Repository<Service>,
            @InjectRepository(Services)
            private businessServiceRepository: Repository<Services>,
            @InjectRepository(Products)
            private productRepository: Repository<Products>,
            
        ) { }
    async getTopPostsAllTime(limit: number): Promise<Post[]> {
        return this.postModel
          .find() // Find all posts
          .sort({ likes: -1 }) // Sort by likes descending (highest first)
          .limit(limit) // Limit results to 'limit' number
          .exec(); // Execute the query
      }

      async getTopPostsNewestThenLikes(limit: number): Promise<Post[]> {
        return this.postModel
          .find() // Find all posts
          .sort({ 
            createdAt: -1, // Primary sort by newest posts first
            likes: -1      // Secondary sort by likes descending
          })
          .limit(limit) // Limit results to 'limit' number
          .exec(); // Execute the query
      }

      async fetchServicesByBusinessId(businessId: string): Promise<Services[]> {
        const services = await this.businessServiceRepository.find({
            where: { businessClient: { BusinessId: businessId } },
            relations: ['businessClient'], // Include related entities if needed
        });
        return services;
    }

    async fetchServicesOrderedByMostBookings(limit: number): Promise<Services[]> {
      return await this.businessServiceRepository
          .createQueryBuilder('Services')
          .leftJoin('Services.bookings', 'bookings') // Join with bookings
          .addSelect('COUNT(bookings."BookingID") as bookingsCount') // Corrected count using proper column name
          .groupBy('Services.Sid') // Group by service ID
          .orderBy('bookingsCount', 'DESC') // Order by bookings count in descending order
          .limit(limit) // Limit the results
          .getMany();
    }

  async fetchServicesByProfessionId(professionId: string): Promise<Service[]> {
    return await this.professionalServiceRepository.find({
        where: { profession_id: professionId },
    });
    
}

async fetchProfessionalServicesOrderedByBookingCount(limit: number): Promise<Service[]> {
  return await this.professionalServiceRepository
      .createQueryBuilder('service')
      .leftJoin(PrBooking, 'booking', 'booking.service_id = service.service_id') // Join with bookings
      .select('service') // Select all fields from the Service entity
      .addSelect('COUNT(booking.booking_id) as bookingCount') // Count bookings
      .groupBy('service.service_id') // Group by service ID
      .orderBy('bookingCount', 'DESC') // Order by booking count
      .limit(limit) // Limit results
      .getMany();
}

async fetchProductsByBusinessId(businessId: string): Promise<Products[]> {
    return await this.productRepository.find({
        where: { businessClient: { BusinessId: businessId } },
    });
}


async  fetchProductsOrderedByOrderCount(
    limit: number
): Promise<any> {
    return await this.productRepository
        .createQueryBuilder('product')
        .leftJoin(Orders, 'orders', 'orders.business_id = product.business_id') // Join with orders
        .select('product') // Select all fields of product
        .addSelect('COUNT(orders.Products::jsonb @> jsonb_build_object(\'pname\', product.pname)) as orderCount') // Count occurrences of product in orders.Products JSON
        .groupBy('product.PId') // Group by product ID
        .orderBy('orderCount', 'DESC') // Order by the count in descending order
        .limit(limit) // Limit the results
        .getRawAndEntities();
}

async getAllPosts(bs_id: string): Promise<Post[]> {
    if (!bs_id) {
        throw new Error('Business ID is required');
    }
    try {
        return await this.postModel.find({ business_id: bs_id }).exec();
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}


}