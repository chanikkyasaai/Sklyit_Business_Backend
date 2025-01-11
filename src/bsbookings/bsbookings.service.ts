import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bsbookings.entity';
import { CreateBookingDto, UpdateBookingDto } from './bsbookings.dto';
import { Users } from 'src/sklyit_users/sklyit_users.entity';

@Injectable()
export class BsbookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    async getAllBookings(businessId: string): Promise<Booking[]> {
        return this.bookingRepository.find({
            where: { businessClient: { BusinessId: businessId } },
            relations: ['customer', 'service', 'businessClient'],
        });
    }

    async getBookingById(businessId: string, id: string): Promise<Booking> {
        try {
            return this.bookingRepository.findOne({
                where: { businessClient: { BusinessId: businessId }, BookingID: id },
                relations: ['customer', 'service', 'businessClient'],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getBookingByCustomerId(userId: string): Promise<Booking[]> {
        try {
            const user = await this.usersRepository.findOne({
                where: { userId: userId, usertype: 'Customer' },
            });
    
            if (!user) {
                throw new BadRequestException('Only users with usertype "Customer" can create bookings.');
            }
            return this.bookingRepository.find({
                where: { customer: { userId: userId } },
                relations: ['customer', 'service', 'businessClient'],
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createBooking(businessId: string, createBookingDto: CreateBookingDto): Promise<Booking> {
        if (!businessId) {
            throw new Error('Business ID is required');
        }
        try {
            const booking = this.bookingRepository.create({
                ...createBookingDto,
                businessClient: { BusinessId: businessId },
                customer: { userId: createBookingDto.userId },
                service: { Sid: createBookingDto.ServiceId },
            });
            console.log(booking);
            return this.bookingRepository.save(booking);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateBooking(businessId: string, id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
        const booking = await this.getBookingById(businessId, id);
        if (!booking) {
            throw new Error('Booking not found');
        }

        try {
            Object.assign(booking, updateBookingDto);
            return this.bookingRepository.save(booking);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteBooking(businessId: string, id: string): Promise<void> {
        const booking = await this.getBookingById(businessId, id);
        if (!booking) {
            throw new Error('Booking not found');
        }

        try {
            await this.bookingRepository.remove(booking);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
