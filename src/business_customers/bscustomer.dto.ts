
import { IsString, IsEmail, Matches } from 'class-validator';

export class CreateBusinessCustomerDto {
    @IsString()
    Name: string;

    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits' })
    MobileNo: string;

    @IsString()
    address: string;

    @IsEmail()
    email: string;
}
