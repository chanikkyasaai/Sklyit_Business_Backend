import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BsbookingsService } from './bsbookings.service';
import { CreateBookingDto, UpdateBookingDto } from './bsbookings.dto';
import { Booking } from './bsbookings.entity';

@Controller('bs/bookings')
export class BsbookingsController {
    constructor(private readonly bookingService: BsbookingsService) {}

    @Get('business/:business_id')
    async getAllBookings(@Param('business_id') businessId: string): Promise<Booking[]> {
        return this.bookingService.getAllBookings(businessId);
    }

    @Get('booking/:id')
    async getBookingById(@Param('id') id: string): Promise<Booking> {
        return this.bookingService.getBookingById(id);
    }

    @Get('customer/:customer_id')
    async getBookingByCustomerId(@Param('customer_id') customerId: string): Promise<Booking[]> {
        return this.bookingService.getBookingByCustomerId(customerId);
    }

    @Post('booking/:business_id')
    async createBooking(@Param('business_id') businessId: string, @Body() createBookingDto: CreateBookingDto): Promise<Booking> {
        return this.bookingService.createBooking(businessId, createBookingDto);
    }

    @Put('booking/:id')
    async updateBooking(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto): Promise<Booking> {
        return this.bookingService.updateBooking(id, updateBookingDto);
    }

    @Delete('booking/:id')
    async deleteBooking(@Param('id') id: string): Promise<void> {
        return this.bookingService.deleteBooking(id);
    }
}
