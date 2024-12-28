
import { IsString, IsNumber, IsOptional, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    imageUrl?: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;
}
