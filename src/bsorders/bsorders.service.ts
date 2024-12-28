import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './bsorders.entity';
import { CreateOrdersDto, UpdateOrdersDto } from './bsorders.dto';

@Injectable()
export class BsordersService {
    constructor(
        @InjectRepository(Orders)
        private readonly ordersRepository: Repository<Orders>,
    ) { }

    async getAllOrders(bs_id: string): Promise<Orders[]> {
        return await this.ordersRepository.find({
            where: { businessClient: { BusinessId: bs_id } },
            relations: ['businessClient'],
        }
        );
    }

    async getOrderById(bs_id: string, Oid: string): Promise<Orders> {
        try {
            return await this.ordersRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, Oid: Oid },
                relations: ['businessClient']
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async createOrder(bs_id: string, createOrderDto: CreateOrdersDto): Promise<Orders> {
        if (!bs_id) {
            throw new Error('Business ID is required');
        }
        const { custid, services, products } = createOrderDto;
        try {
            const order = this.ordersRepository.create({
                Services: services,
                Products: products,
                customer: { CustId: custid },
                businessClient: { BusinessId: bs_id }
            });
            return await this.ordersRepository.save(order);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateOrder(bs_id: string, Oid: string, updateOrderDto: UpdateOrdersDto): Promise<Orders> {
        if (!bs_id || !Oid) {
            throw new Error('Business ID and Order ID are required');
        }
        const { services, products } = updateOrderDto;
        try {
            const order = await this.ordersRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, Oid: Oid },
                relations: ['businessClient', 'customer']
            });
            if (!order) {
                throw new Error('Order not found');
            }
            order.Services = services || order.Services;
            order.Products = products || order.Products;
            
            return await this.ordersRepository.save(order);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteOrder(bs_id: string, Oid: string): Promise<void> {
        if (!bs_id || !Oid) {
            throw new Error('Business ID and Order ID are required');
        }
        try {
            const order = await this.ordersRepository.findOne({
                where: { businessClient: { BusinessId: bs_id }, Oid: Oid },
                relations: ['businessClient']
            });
            if (!order) {
                throw new Error('Order not found');
            }
            await this.ordersRepository.remove(order);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
