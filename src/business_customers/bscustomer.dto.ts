
import { IsString, IsEmail, Matches, IsOptional } from 'class-validator';

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

export class UpdateBusinessCustomerDto {
    @IsOptional()
    @IsString()
    Name?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits' })
    MobileNo?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsEmail()
    email?: string;
}

