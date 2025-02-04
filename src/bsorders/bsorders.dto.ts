
import { IsArray, IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateOrdersDto {
    @IsString()
    custid: string;
    
    @IsDate()
    ODate: Date;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    services: ServiceDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];
}

export class UpdateOrdersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServiceDto)
    services: ServiceDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];
}

class ServiceDto {
    @IsString()
    sname: string;

    @IsNumber()
    cost: number;
}

class ProductDto {
    @IsString()
    pname: string;
  
    @IsNumber()
    cost: number;

    @IsNumber()
    quantity: number;
}