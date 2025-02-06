// Create DTO for booking
import { IsUUID, IsString, IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { payment_method_enum } from './entity/booking.entity';

export class CreatePrBookingDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  service_id: string;

  @IsUUID()
  profession_id: string;

  @IsDateString()
  booking_timestamp: string;

  @IsDateString()
  service_date_time: string;

  @IsString()
  status: string;

  @IsString()
  payment_status: string;

  @IsEnum(payment_method_enum)
  payment_method: payment_method_enum;

  @IsOptional()
  @IsString()
  cancellation_reason?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  payment: number;
}
