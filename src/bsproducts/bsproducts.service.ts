import { Injectable, Param } from '@nestjs/common';
import { Products } from './bsproducts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './bsproducts.dto';

@Injectable()
export class BsproductsService {
    constructor(
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
    ) { }
    
    async createProduct(bs_id:string,createProductDto: CreateProductDto): Promise<Products> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }
        const { name, description, imageUrl, price, quantity } = createProductDto;
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

    async updateProduct(bs_id: string, product_id: string, updateProductDto: CreateProductDto): Promise<Products> {
        if (!bs_id || !product_id) {
            throw new Error('Business ID and Product ID are required');
        }
        const { name, description, imageUrl, price, quantity } = updateProductDto;
        const product = await this.productRepository.findOne({
            where: { businessClient: { BusinessId: bs_id }, PId: product_id },
            relations: ['businessClient'], // Ensure the relation is loaded
        });
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

