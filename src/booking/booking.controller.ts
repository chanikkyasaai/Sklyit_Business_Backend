import { Controller, Get, Query, UseGuards, Param, Put, Body, Req, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtCustomerAuthGuard } from '../auth_customer/jwt.auth_customer.guard';
import { CreateBookingDto } from 'src/bsbookings/bsbookings.dto';
import { CreatePrBookingDto } from './booking.dto';

enum payment_method_enum {
  Cash = 'Cash',
  Online = 'Online'
};

@Controller('professional/bookings')
@UseGuards(JwtCustomerAuthGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('id/:booking_id')
  async getBookingDetails(@Param('booking_id') booking_id : string, @Req() req, @Query('status') status : string) {
    try {
      const bookings = await this.bookingService.findBookingById(booking_id, status);
      return bookings;
    } catch (error) {
      return { message: 'Error fetching bookings by status', error: error.message };
    }
  }

  @Put('update/status/:booking_id')
  async changeStatus(@Param('booking_id') booking_id : string,@Req() req, @Body('status') status: string) {
    try {
      await this.bookingService.changeStatus(booking_id, status);
      return { message: 'Booking status updated' };
    } catch (error) {
      return { message: 'Error updating booking status', error: error.message };
    }
  }

  @Put('update/payment/:booking_id')
  async changePaymentDetails(
    @Param('booking_id') booking_id : string,
    @Req() req,
    @Body() body : {status: string, payment_status: string, payment: number, payment_method: payment_method_enum}
  ){
    try{
      await this.bookingService.changePaymentDetails(booking_id, body.status, body.payment_status, body.payment, body.payment_method);
      return { message: 'Payment Details Updated'};
    } catch(error){
      return { message : 'Error Updating Payment Details'};
    }
  }

  @Post()
  async createBooking(@Req() req, @Body() body: CreatePrBookingDto) {
    try {
      const booking = await this.bookingService.createBooking(body);
      return booking;
    } catch (error) {
      return { message: 'Error creating booking', error: error.message };
    }
  }

  @Get('customer')
  async getBookingsByCustomerId(@Req() req) {
    try {
      const bookings = await this.bookingService.getBookingByCustomerId(req.user.userId);
      return bookings;
    } catch (error) {
      return { message: 'Error fetching bookings by customer', error: error.message };
    }
  }

}
