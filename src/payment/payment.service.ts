import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cashfree } from 'cashfree-pg';

@Injectable()
export class PaymentService {
    constructor(private readonly configService: ConfigService) {
        // Set global configuration for Cashfree
        Cashfree.XClientId = this.configService.get<string>('AppId');
        Cashfree.XClientSecret = this.configService.get<string>('SECRET_KEY_Cashfree');
        Cashfree.XEnvironment = Cashfree.Environment.SANDBOX; // Use SANDBOX for testing, LIVE for production
    }

    async createOrder(orderDetails: any): Promise<any> {
        const version = '2023-08-01';
        const request = {
            order_amount: orderDetails.amount,
            order_currency: 'INR',
            customer_details: {
                customer_id: orderDetails.customerId || 'default_customer',
                customer_name: orderDetails.name,
                customer_email: orderDetails.email,
                customer_phone: orderDetails.phone,
            },
            order_meta: {
                return_url: orderDetails.returnUrl,
            },
            order_note: orderDetails.note || '',
        };

        try {
            const response = await Cashfree.PGCreateOrder(version, request);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error.response?.data || error.message);
            throw new HttpException(
                error.response?.data?.message || 'Failed to create order',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async fetchOrder(orderId: string): Promise<any> {
        const version = '2023-08-01';
        try {
            const response = await Cashfree.PGFetchOrder(version, orderId);
            return response.data;
        } catch (error) {
            console.error('Error fetching order:', error.response?.data || error.message);
            throw new HttpException(
                error.response?.data?.message || 'Failed to fetch order',
                error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
