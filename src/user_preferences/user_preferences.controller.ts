import { Controller, Post, Body, Param, Patch, Get, Delete, UseGuards, Req } from '@nestjs/common';
import { UserPreferencesService } from './user_preferences.service';
import { JwtAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';
@Controller('user-data')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @Patch('bookings')
  async addSavedBooking(@Req() req, @Body('bookingId') bookingId: string) {
    await this.userPreferencesService.addSavedBooking(req.user.sub, bookingId);
  }
  
  @Patch('preferences')
  async updatePreferences(@Req() req, @Body() preferences: Record<string, any>) {
    await this.userPreferencesService.updatePreferences(req.user.sub, preferences);
  }

  @Get()
  async getAllData(@Req() req) {
    return this.userPreferencesService.getAllData(req.user.sub);
  }

  @Delete('/bookings/:bookingId')
  async removeSavedBooking(@Req() req,@Param('bookingId') bookingId: string) {
    await this.userPreferencesService.removeSavedBooking(req.user.sub, bookingId);
  }
}