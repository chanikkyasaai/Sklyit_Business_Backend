import {
  IsString,
  IsEmail,
  IsOptional,
  Matches,
  Length,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsEmail()
  gmail: string;

  @Type(() => Date)
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  imgurl?: string;

  @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits' })
  mobileno: string;
   
  @Matches(/^[0-9]{10}$/, { message: 'WhatsApp number must be 10 digits' })
  wtappNo?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  addressDoorno?: string;

  @IsOptional()
  @IsString()
  addressStreet?: string;


  @IsString()
  addressCity?: string;


  @IsString()
  addressState?: string;

  @IsOptional()
  @Matches(/^[0-9]{6}$/, { message: 'Pincode must be 6 digits' })
  addressPincode?: string;

  @IsString()
  usertype: string;

  @IsString()
  password: string;
}


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;

  @IsOptional()
  @IsEmail()
  gmail?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  imgurl?: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'Mobile number must be 10 digits' })
  mobileno?: string;

  @IsOptional()
  @Matches(/^[0-9]{10}$/, { message: 'WhatsApp number must be 10 digits' })
  wtappNo?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  addressDoorno?: string;

  @IsOptional()
  @IsString()
  addressStreet?: string;

  @IsOptional()
  @IsString()
  addressCity?: string;

  @IsOptional()
  @IsString()
  addressState?: string;

  @IsOptional()
  @Matches(/^[0-9]{6}$/, { message: 'Pincode must be 6 digits' })
  addressPincode?: string;

  @IsOptional()
  @IsString()
  usertype?: string;

  @IsOptional()
  @IsNumber()
  premiumId?: string; // Foreign key to Subscribers
}
