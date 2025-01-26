import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('createOrder')
    async createOrder(@Body() body: any) {
        return await this.paymentService.createOrder(body);
    }

    @Get('fetchOrder')
    async fetchOrder(@Param('orderId') orderId: string) {
        return await this.paymentService.fetchOrder(orderId);
    }
}
