import { IsString, IsDate, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty()
    CustomerId: string;

    @IsString()
    @IsNotEmpty()
    ServiceId: string;

    @IsString()
    @IsNotEmpty()
    Status: string;

    @IsString()
    @IsNotEmpty()
    BookedMode: string;

    @IsDate()
    @IsNotEmpty()
    BookedTime: Date;

    @IsDate()
    @IsNotEmpty()
    ServiceDate: Date;

    @IsDateString()
    @IsNotEmpty()
    ServiceTime: string;
}

export class UpdateBookingDto {
    @IsString()
    @IsNotEmpty()
    Status: string;
}
