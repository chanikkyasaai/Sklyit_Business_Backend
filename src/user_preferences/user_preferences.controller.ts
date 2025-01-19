import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { UserPreferencesService } from './user_preferences.service';

@Controller('user-history')
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @Patch(':userId/bookings')
  async addSavedBooking(@Param('userId') userId: string, @Body('bookingId') bookingId: string) {
    await this.userPreferencesService.addSavedBooking(userId, bookingId);
  }
  
  @Patch(':userId/preferences')
  async updatePreferences(@Param('userId') userId: string, @Body() preferences: Record<string, any>) {
    await this.userPreferencesService.updatePreferences(userId, preferences);
  }

  @Get(':userId')
  async getAllData(@Param('userId') userId: string) {
    return this.userPreferencesService.getAllData(userId);
  }
}