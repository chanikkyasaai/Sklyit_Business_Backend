import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class SearchBusinessClientsDto {
    @IsOptional()
    @IsString()
    queryString?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    page?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number;
}
