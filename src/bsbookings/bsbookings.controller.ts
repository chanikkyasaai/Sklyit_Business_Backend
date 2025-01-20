import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BsbookingsService } from './bsbookings.service';
import { CreateBookingDto, UpdateBookingDto } from './bsbookings.dto';
import { Booking } from './bsbookings.entity';

@Controller('bs')
export class BsbookingsController {
    constructor(private readonly bookingService: BsbookingsService) {}

    @Get('/:business_id/bookings')
    async getAllBookings(@Param('business_id') businessId: string): Promise<Booking[]> {
        return this.bookingService.getAllBookings(businessId);
    }

    @Get(':business_id/bookings/:id')
    async getBookingById(@Param('business_id') businessId: string, @Param('id') id: string): Promise<Booking> {
        return this.bookingService.getBookingById(businessId, id);
    }

    @Get('customer/:customer_id')
    async getBookingByCustomerId(@Param('customer_id') customerId: string): Promise<Booking[]> {
        return this.bookingService.getBookingByCustomerId(customerId);
    }

    @Post('/:business_id/bookings')
    async createBooking(@Param('business_id') businessId: string, @Body() createBookingDto: CreateBookingDto): Promise<Booking> {
        return this.bookingService.createBooking(businessId, createBookingDto);
    }

    @Put('/:business_id/bookings/:id')
    async updateBooking(@Param('business_id') businessId: string, @Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto): Promise<Booking> {
        return this.bookingService.updateBooking(businessId, id, updateBookingDto);
    }

    @Delete('/:business_id/bookings/:id')
    async deleteBooking(@Param('business_id') businessId: string, @Param('id') id: string): Promise<void> {
        return this.bookingService.deleteBooking(businessId, id);
    }
}
