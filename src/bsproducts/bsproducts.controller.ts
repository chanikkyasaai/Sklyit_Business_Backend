import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { BsproductsService } from './bsproducts.service';
import { Products } from './bsproducts.entity';
import { create } from 'domain';
import { CreateProductDto, UpdateProductDto } from './bsproducts.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('bs')
@UseGuards(JwtAuthGuard)
export class BsproductsController {
    constructor(private readonly bsproductsService: BsproductsService) { }

    @Get('/products')
    getProducts(@Req() req): Promise<Products[]> {
        return this.bsproductsService.getProducts(req.user.bs_id);
    }

    @Get('products/:product_id')
    getProductById(
        @Req() req,
        @Param('product_id') product_id: string
    ): Promise<Products> {
        return this.bsproductsService.getProductById(req.user.bs_id, product_id);
    }
    
    @Get('/product')
    getProductsByFlag(
        @Req() req,
    ): Promise<Products[]> {
        return this.bsproductsService.getProductsByFlag(req.user.bs_id);
    }

    @Get('product/:product_id')
    getProductByFlag(
        @Param('product_id') product_id: string,
        @Req() req,
    ): Promise<Products> {
        return this.bsproductsService.getProductByFlag(req.user.bs_id, product_id);
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
    createProducts(@Req() req,
        @Body() createProductDto: CreateProductDto,
        @UploadedFile() file:Express.Multer.File,
    ): Promise<Products> {
        return this.bsproductsService.createProduct(req.user.bs_id, createProductDto,file);
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
    updateProducts(@Req() req,
        @Param('product_id') product_id: string,
        @Body() updateProductDto: UpdateProductDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<Products> {
        return this.bsproductsService.updateProduct(req.user.bs_id, product_id, updateProductDto,file);
    }

    @Put('product/:product_id')
    updateFlag(
        @Req() req,
        @Param('product_id') product_id: string,
    ): Promise<Products>{
        return this.bsproductsService.updateFlag(req.user.bs_id, product_id);
    }
    
    @Delete('products/:product_id')
    deleteProducts(@Req() req,
        @Param('product_id') product_id: string): Promise<void> {
        return this.bsproductsService.deleteProduct(req.user.bs_id, product_id);
    }
}
