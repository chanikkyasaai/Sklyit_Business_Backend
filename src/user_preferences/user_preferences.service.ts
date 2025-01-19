import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreferences } from './user_preferences.schema';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreferences.name) private readonly UserPreferencesModel: Model<UserPreferences>,
  ) {}

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