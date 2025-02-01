import { IsString, IsNumber, IsUUID } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    review: string;

    @IsNumber()
    rating: number;

    @IsUUID()
    userId: string;

    @IsUUID()
    serviceId: string;

    @IsUUID()
    professionId: string;
}
