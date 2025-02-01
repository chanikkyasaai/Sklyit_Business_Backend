import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrBooking } from 'src/booking/entity/booking.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CreatePrBookingDto } from './booking.dto';

var forpending = [
  'booking.status AS status',
  'booking.service_date_time AS serviceDateTime',
  'booking.payment_status AS paymentStatus',
  'user.address_doorno AS addressDoorno',
  'user.address_street AS addressStreet',
  'user.address_city AS addressCity',
  'user.address_state AS addressState',
  'user.address_pincode AS addressPincode',
  'user.name AS name',
  'user.mobileno AS mobileno',
  'service.service_name AS serviceName',
];
var forcompleted = [
  'booking.status AS status',
  'booking.service_date_time AS serviceDateTime',
  'booking.payment_status AS paymentStatus',
  'booking.payment_method AS paymentMethod',
  'booking.payment AS payment',
  'user.address_doorno AS addressDoorno',
  'user.address_street AS addressStreet',
  'user.address_city AS addressCity',
  'user.address_state AS addressState',
  'user.address_pincode AS addressPincode',
  'user.name AS name',
  'user.mobileno AS mobileno',
  'service.service_name AS serviceName',
];
var forcancelled = [
  'booking.status AS status',
  'booking.service_date_time AS serviceDateTime',
  'user.address_doorno AS addressDoorno',
  'user.address_street AS addressStreet',
  'user.address_city AS addressCity',
  'user.address_state AS addressState',
  'user.address_pincode AS addressPincode',
  'user.name AS name',
  'user.mobileno AS mobileno',
  'service.service_name AS serviceName',
];

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(PrBooking) private bookingRepository: Repository<PrBooking>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async findBookingsByProfessionalId(status: string, profession_id: string, date: string): Promise<any[]> {
    var queryBuilder;

    if(status === 'New'){
      queryBuilder = this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.service', 'service')
      .where('booking.profession_id = :profession_id', { profession_id });

      if (status) {
        queryBuilder.andWhere('booking.status = :status', { status });
      }
  
      const results = await queryBuilder.getRawMany();
      return results;

    }
    else{
      const version = await this.getCacheVersion('services');
      const cacheKey = (date) ? `v${version}:bookings:${profession_id}:status:${status}:date:${date}` : `v${version}:bookings:${profession_id}:status:${status}`;
      const cachedResult = await this.cacheManager.get<any[]>(cacheKey);

      if (cachedResult) {
        console.log('Returning cached result');
        return cachedResult;
      }
      queryBuilder = this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.service', 'service')
      .where('booking.profession_id = :profession_id', { profession_id });

      if (status) {
        queryBuilder.andWhere('booking.status = :status', { status });
      }
      if (date) {
        const [day, month, year] = date.split('/');
        const formattedDate = `${year}-${month}-${day}`; // Convert to yyyy-mm-dd format
        
        queryBuilder.andWhere('DATE(booking.service_date_time) = :date', { date: formattedDate });
      }
      
  
      const results = await queryBuilder.getRawMany();
      await this.cacheManager.set(cacheKey, results, 10  * 1000); 

      console.log('Returning fresh result');
      return results;
    }
  }

  async createBooking(createPrBookingDto: CreatePrBookingDto): Promise<PrBooking> {
    const booking = this.bookingRepository.create(createPrBookingDto);
    return await this.bookingRepository.save(booking);
  }

  async findBookingById(
    bookingId: string,
    status?: string,
  ): Promise<any[]> {
    const cacheKey = `booking:${bookingId}:status:${status || 'all'}`;
    const cachedResult = await this.cacheManager.get<any[]>(cacheKey);

    if (cachedResult) {
      console.log('Returning cached result');
      return cachedResult;
    }

    const queryBuilder = this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.service', 'service')
      .where('booking.booking_id = :bookingId', { bookingId })

    if (status) {
      queryBuilder.andWhere('booking.status = :status', { status });
    }

    const results = await queryBuilder.getRawMany();

    await this.cacheManager.set(cacheKey, results, 60 * 1000); // 1 minute

    console.log('Returning fresh result');
    return results;
  }

  async changePaymentDetails(booking_id: string, status: string, payment_status: string, payment: number, payment_method) {
    await this.bookingRepository.update({booking_id}, { status: status, payment_status: payment_status, payment: payment, payment_method: payment_method });
    await this.incrementCacheVersion('bookings');
  }

  async getBookingByCustomerId(userId: string): Promise<any[]> {
    const queryBuilder = this.bookingRepository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.user', 'user')
      .leftJoinAndSelect('booking.service', 'service')
      .where('booking.user_id = :userId', { userId });

    const results = await queryBuilder.getRawMany();
    return results;
  }

  async changeStatus(booking_id: string, status: string) {
    await this.bookingRepository.update({booking_id}, { status: status });
    if(status == 'Pending' || status == 'Cancelled'){
      await this.incrementCacheVersion('services');
      console.log('Services Cache version incremented');
      await this.incrementCacheVersion('bookings');
      console.log('Bookings Cache version incremented');
    }
  }

  private async incrementCacheVersion(namespace: string): Promise<void> {
    const versionKey = `${namespace}:version`;
    const currentVersion = await this.getCacheVersion(namespace);
    await this.cacheManager.set(versionKey, currentVersion + 1);
  }

  private async getCacheVersion(namespace: string): Promise<number> {
    const versionKey = `${namespace}:version`;
    const version = await this.cacheManager.get<number>(versionKey);
    return version || 1; // Default to version 1 if not found
  }
}
