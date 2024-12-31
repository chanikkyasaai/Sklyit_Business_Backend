
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsUrl()
    image?: string; // Optional
}
