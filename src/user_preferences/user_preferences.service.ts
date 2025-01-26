import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreferences } from './user_preferences.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessClients } from 'src/business_clients/business_clients.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreferences.name)
    private readonly UserPreferencesModel: Model<UserPreferences>,
    @InjectRepository(BusinessClients)
    private readonly businessClientsRepository: Repository<BusinessClients>,
  ) { }

  async createEmptyDoc(userId: string): Promise<UserPreferences> {
    return this.UserPreferencesModel.create({ userId });
  }

  async addSearchHistory(userId: string, query: string, location: string): Promise<void> {
    await this.UserPreferencesModel.updateOne(
      { userId },
      {
        $push: { searchHistory: { query, location, timestamp: new Date() } },
      },
      { upsert: true },
    );
  }

  async addSavedBooking(userId: string, bookingId: string): Promise<void> {
    await this.UserPreferencesModel.updateOne(
      { userId },
      {
        $addToSet: { savedBookings: bookingId },
      },
      { upsert: true },
    );
  }

  // Throws error. Needs fix. I don't know how.
  /*async getTopBusinessClients(limit: number): Promise<any> {
    return await this.businessClientsRepository.createQueryBuilder('businessClients')
      .leftJoin('businessClients.orders', 'orders')
      .select([
        'businessClients.BusinessId',
        'businessClients.Clientname',
        `(SELECT SUM(COALESCE(item->>'cost'::numeric, 0)) 
         FROM jsonb_array_elements(orders.Services) AS item) + 
         (SELECT SUM(COALESCE(item->>'cost'::numeric, 0)) 
         FROM jsonb_array_elements(orders.Products) AS item) AS total_revenue`,
      ])
      .groupBy('businessClients.BusinessId')
      .addGroupBy('businessClients.Clientname')
      .orderBy('total_revenue', 'DESC')
      .limit(limit)
      .getRawMany();
  }*/


  async removeSavedBooking(userId: string, bookingId: string): Promise<UserPreferences> {
    const userHistory = await this.UserPreferencesModel.findOne({ userId });

    if (!userHistory) {
      throw new Error('No search history found for the specified user.');
    }

    // Remove the bookingId from the savedBookings array
    userHistory.savedBookings = userHistory.savedBookings.filter(
      (savedBooking) => savedBooking !== bookingId,
    );

    return await userHistory.save();
  }

  async updatePreferences(userId: string, preferences: Record<string, any>): Promise<void> {
    await this.UserPreferencesModel.updateOne(
      { userId },
      { $set: { preferences } },
      { upsert: true },
    );
  }

  async getAllData(userId: string): Promise<UserPreferences> {
    return this.UserPreferencesModel.findOne({ userId }).exec();
  }
}