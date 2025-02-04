import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateReviewDto {

    @IsString()
    @IsOptional()
    review: string;

    @IsNumber()
    rating: number;

    @IsString()
    businessId: string;

    @IsString()
    serviceId: string;

    @IsString()
    CustId: string;
}
