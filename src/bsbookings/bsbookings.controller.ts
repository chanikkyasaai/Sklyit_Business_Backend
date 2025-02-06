import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { BsbookingsService } from './bsbookings.service';
import { CreateBookingDto, UpdateBookingDto } from './bsbookings.dto';
import { Booking } from './bsbookings.entity';
import { JwtCustomerAuthGuard } from 'src/auth_customer/jwt.auth_customer.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('bs/')
export class BsbookingsController {
    constructor(private readonly bookingService: BsbookingsService) { }

    @Get('bookings/business/')
    @UseGuards(JwtAuthGuard)
    async getAllBookings(@Req() req): Promise<Booking[]> {
        return this.bookingService.getAllBookings(req.user.bs_id);
    }

    @Get('booking/:id')
    @UseGuards(JwtCustomerAuthGuard, JwtAuthGuard)
    async getBookingById(@Param('id') id: string): Promise<Booking> {
        return this.bookingService.getBookingById(id);
    }

    @Get('bookings/customer/')
    @UseGuards(JwtCustomerAuthGuard)
    async getBookingByCustomerId(@Req() req): Promise<Booking[]> {
        return this.bookingService.getBookingByCustomerId(req.user.sub);
    }

    @Post('booking/:business_id')
    @UseGuards(JwtCustomerAuthGuard)
    async createBooking(@Param('business_id') businessId: string, @Body() createBookingDto: CreateBookingDto): Promise<Booking> {
        return this.bookingService.createBooking(businessId, createBookingDto);
    }

    @Put('booking/:id')
    @UseGuards(JwtAuthGuard, JwtCustomerAuthGuard)
    async updateBooking(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto): Promise<Booking> {
        return this.bookingService.updateBooking(id, updateBookingDto);
    }

    @Delete('booking/:id')
    async deleteBooking(@Param('id') id: string): Promise<void> {
        return this.bookingService.deleteBooking(id);
    }
}
