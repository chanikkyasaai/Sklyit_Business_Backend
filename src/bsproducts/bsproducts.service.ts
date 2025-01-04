import { Injectable, Param } from '@nestjs/common';
import { Products } from './bsproducts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './bsproducts.dto';
import { AzureBlobService } from 'src/imageBlob/imageBlob.service';

@Injectable()
export class BsproductsService {
    
    private readonly containerName = 'upload-file';
    
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
        private azureBlobService: AzureBlobService
    ) { }
    
    async createProduct(bs_id:string,createProductDto: CreateProductDto,file:Express.Multer.File): Promise<Products> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }
        const { name, description, price, quantity } = createProductDto;
        const imageUrl = await this.azureBlobService.upload(file, this.containerName);
        const product = this.productRepository.create({
            Pname: name,
            Pdesc: description || '',
            PimageUrl: imageUrl || '',
            Pprice: price,
            Pqty: quantity,
            businessClient: { BusinessId: bs_id }
        });
        try {
            return await this.productRepository.save(product);
        } catch (error) {
            console.log(error);
        }
    }
    async getProducts(bs_id: string): Promise<Products[]> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }
        try {
            return await this.productRepository.find({
                where: { businessClient: { BusinessId: bs_id } },
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(bs_id: string, product_id: string): Promise<Products> {
        if (!bs_id || !product_id) {
            throw new Error('Business ID and Product ID are required');
        }
        try {
            return await this.productRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, PId: product_id },
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    async getProductsByFlag( bs_id: string): Promise<Products[]> {
        if ( !bs_id) {
            throw new Error('Product ID and Business ID are required');
        }
        try {
            return await this.productRepository.find({
                where: { businessClient: { BusinessId: bs_id } ,Pflag:0},
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    async getProductByFlag(bs_id: string, product_id: string): Promise<Products> {
        if (!bs_id || !product_id) {
            throw new Error('Business ID and Product ID are required');
        }
        try {
            return await this.productRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, PId: product_id ,Pflag:0},
                relations: ['businessClient'], // Ensure the relation is loaded
            });
        } catch (error) {
            console.log(error);
        }
        
    }
    async updateFlag(bs_id: string, product_id: string): Promise<Products> {
        if (!bs_id || !product_id) {
            throw new Error('Business ID and Product ID are required');
        }
        const product = await this.productRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, PId: product_id },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
        if (!product) {
            throw new Error('Product not found');
        }
        product.Pflag = 1;
        try {
            return await this.productRepository.save(product);
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(bs_id: string, product_id: string): Promise<void> {
        if (!bs_id || !product_id) {
            throw new Error('Business ID and Product ID are required');
        }
        const product = await this.productRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, PId: product_id },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
        if (!product) {
            throw new Error('Product not found');
        }
        try {
            await this.productRepository.remove(product);
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(bs_id: string, product_id: string, updateProductDto: UpdateProductDto,file?:Express.Multer.File): Promise<Products> {
        if (!bs_id || !product_id) {
            throw new Error('Business ID and Product ID are required');
        }
        const { name, description, imageUrl, price, quantity } = updateProductDto;
        const product = await this.productRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, PId: product_id },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
        if(file){
            const imageUrl = await this.azureBlobService.upload(file, this.containerName);
            product.PimageUrl = imageUrl;
        }
        if (!product) {
            throw new Error('Product not found');
        }
        product.Pname = name || product.Pname;
        product.Pdesc = description || product.Pdesc;
        product.PimageUrl = imageUrl || product.PimageUrl;
        product.Pprice = price || product.Pprice;
        product.Pqty = quantity || product.Pqty;
        try {
            return await this.productRepository.save(product);
        } catch (error) {
            console.log(error);
        }
    }
}

