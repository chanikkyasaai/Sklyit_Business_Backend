import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BsproductsService } from './bsproducts.service';
import { Products } from './bsproducts.entity';
import { create } from 'domain';
import { CreateProductDto, UpdateProductDto } from './bsproducts.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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
    
    @Get('product')
    getProductsByFlag(
        @Param('business_id') bs_id: string,
    ): Promise<Products[]> {
        return this.bsproductsService.getProductsByFlag(bs_id);
    }

    @Get('product/:product_id')
    getProductByFlag(
        @Param('product_id') product_id: string,
        @Param('business_id') bs_id: string,
    ): Promise<Products> {
        return this.bsproductsService.getProductByFlag(bs_id, product_id);
    }
        
    @Post('products')
    @UseInterceptors(
        FileInterceptor('image', {
            fileFilter: (req, file, callback) => {
                const isAllowed = ['image/jpeg', 'image/png', 'image/jpg'].some(mime => mime === file.mimetype);
                callback(isAllowed ? null : new BadRequestException('Only jpeg, png, and jpg files are allowed'), isAllowed);
            },
        }),
    )
    createProducts(@Param('business_id') bs_id: string,
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() file:Express.Multer.File,
    ): Promise<Products> {
        return this.bsproductsService.createProduct(bs_id, createProductDto,file);
    }

    @Put('products/:product_id')
        @UseInterceptors(
            FileInterceptor('image', {
                fileFilter: (req, file, callback) => {
                    const isAllowed = ['image/jpeg', 'image/png', 'image/jpg'].some(mime => mime === file.mimetype);
                    callback(isAllowed ? null : new BadRequestException('Only jpeg, png, and jpg files are allowed'), isAllowed);
                },
            })
        )
    updateProducts(@Param('business_id') bs_id: string,
        @Param('product_id') product_id: string,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<Products> {
        return this.bsproductsService.updateProduct(bs_id, product_id, updateProductDto,file);
    }

    @Put('product/:product_id')
    updateFlag(
        @Param('business_id') bs_id: string,
        @Param('product_id') product_id: string,
    ): Promise<Products>{
        return this.bsproductsService.updateFlag(bs_id, product_id);
    }
    
    @Delete('products/:product_id')
    deleteProducts(@Param('business_id') bs_id: string,
        @Param('product_id') product_id: string): Promise<void> {
        return this.bsproductsService.deleteProduct(bs_id, product_id);
    }
}
