import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BsproductsService } from './bsproducts.service';
import { Products } from './bsproducts.entity';
import { create } from 'domain';
import { CreateProductDto } from './bsproducts.dto';

@Controller('bs/:business_id')
export class BsproductsController {
    constructor(private readonly bsproductsService: BsproductsService) { }

    @Get('products')
    getProducts(@Param('business_id') bs_id: string): Promise<Products[]> {
        return this.bsproductsService.getProducts(bs_id);
    }

    @Get('products/:product_id')
    getProductById(
        @Param('business_id') bs_id: string,
        @Param('product_id') product_id: string
    ): Promise<Products> {
        return this.bsproductsService.getProductById(bs_id, product_id);
    }
    
    @Post('products')
    createProducts(@Param('business_id') bs_id: string,
        @Body() createProductDto: CreateProductDto): Promise<Products> {
        return this.bsproductsService.createProduct(bs_id, createProductDto);
    }

    @Put('products/:product_id')
    updateProducts(@Param('business_id') bs_id: string,
        @Param('product_id') product_id: string,
        @Body() updateProductDto: CreateProductDto): Promise<Products> {
        return this.bsproductsService.updateProduct(bs_id, product_id, updateProductDto);
    }

    @Delete('products/:product_id')
    deleteProducts(@Param('business_id') bs_id: string,
        @Param('product_id') product_id: string): Promise<void> {
        return this.bsproductsService.deleteProduct(bs_id, product_id);
    }
}
