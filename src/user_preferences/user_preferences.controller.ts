import { Controller, Post, Body, Param, Patch, Get, Delete, UseGuards, Req } from '@nestjs/common';
import { UserPreferencesService } from './user_preferences.service';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';
import { SklyitUsersService } from 'src/sklyit_users/sklyit_users.service';
@Controller('user-data')
@UseGuards(JwtCustomerAuthGuard)
export class UserPreferencesController {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
    private readonly userService: SklyitUsersService,
  ) {}

  @Patch('bookings')
  async addSavedBooking(@Req() req, @Body('bookingId') bookingId: string) {
    await this.userPreferencesService.addSavedBooking(req.user.userid, bookingId);
  }
  
  @Patch('preferences')
  async updatePreferences(@Req() req, @Body() preferences: Record<string, any>) {
    await this.userPreferencesService.updatePreferences(req.user.userid, preferences);
  }

  @Get('data')
  async getData(@Req() req) {
    return this.userService.getUserById(req.user.userid);
  }

  @Get('preferences')
  async getAllData(@Req() req) {
    console.log(req);
    return this.userPreferencesService.getAllData(req.user.userid);
  }

  @Delete('/bookings/:bookingId')
  async removeSavedBooking(@Req() req,@Param('bookingId') bookingId: string) {
    await this.userPreferencesService.removeSavedBooking(req.user.userid, bookingId);
  }

  @Patch('followed-businesses/:businessId')
  async followBusiness(@Req() req,@Param('businessId') businessId: string) {
    await this.userPreferencesService.followBusiness(req.user.userid, businessId);
  }

  @Delete('followed-businesses/:businessId')
  async unfollowBusiness(@Req() req,@Param('businessId') businessId: string) {
    await this.userPreferencesService.unfollowBusiness(req.user.userid, businessId);
  }

}