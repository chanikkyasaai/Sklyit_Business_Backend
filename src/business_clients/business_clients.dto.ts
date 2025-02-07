import { Type } from 'class-transformer';
import { IsString, IsEmail, IsArray, Matches, IsOptional, ValidateNested, IsBoolean } from 'class-validator';

export class CreateBusinessClientDto {
    @IsString()
    Clientname: string;

    @IsString()
    domainname: string;

    @IsString()
    shopname: string;

    @IsString()
    shopdesc: string;


    @IsEmail()
    shopemail: string;

    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits' })
    shopmobile: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses: AddressDto[];

    // Time validation: matches format HH:mm (No seconds)
    @Matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, { message: 'Invalid time format. Expected HH:mm' })
    shopOpenTime: string;

    @Matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, { message: 'Invalid time format. Expected HH:mm' })
    shopClosingTime: string;

    @IsOptional() // Optional because BusinessMainTags might not be required
    @IsArray()
    @IsString({ each: true })
    BusinessMainTags?: string[];

    @IsOptional() // Optional because BusinessSubTags might not be required
    @IsArray()
    @IsString({ each: true })
    BusinessSubTags?: string[];

    @IsString()
    userId?: string;
    // Foreign key for userId, assuming you pass it as a string
    @IsString()
    @IsOptional()
    imgurl: string;

    @IsBoolean()
    @IsOptional()
    openStatus: boolean;
}

export class UpdateBusinessClientDto {
    @IsString()
    Clientname?: string;

    @IsString()
    domainname?: string;

    @IsString()
    shopname?: string;

    @IsString()
    shopdesc?: string;

    @IsEmail()
    shopemail?: string;

    @IsString()
    @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits' })
    shopmobile?: string;

    @Matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, { message: 'Invalid time format. Expected HH:mm' })
    shopOpenTime?: string;

    @Matches(/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/, { message: 'Invalid time format. Expected HH:mm' })
    shopClosingTime?: string;

    @IsOptional() // Optional because BusinessMainTags might not be required
    @IsArray()
    @IsString({ each: true })
    BusinessMainTags?: string[];

    @IsOptional() // Optional because BusinessSubTags might not be required
    @IsArray()
    @IsString({ each: true })
    BusinessSubTags?: string[];

    @IsString()
    userId?: string;

    @IsString()
    @IsOptional()
    imgurl?: string;

    @IsBoolean()
    @IsOptional()
    openStatus?: boolean;
}

export class AddressDto {
    @IsString()
    street: string;

    @IsString()
    city: string;

    @IsString()
    district: string;

    @IsString()
    state: string;

    @IsString()
    pincode: string;
}