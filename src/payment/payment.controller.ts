import { Body, Controller, Logger, Post, RawBody, Req, Res } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';

@Controller('payment')
export class PaymentController {

    private readonly logger = new Logger(PaymentController.name);

    constructor(
        private readonly stripeService: PaymentService,
        private readonly configService: ConfigService,
    ) { }
    @Post('create-checkout-session')
    async createCheckoutSession(
        @Body('lookup_key') lookupKey: string,
    ): Promise<{ url: string }> {
        const domain = this.configService.get<string>('YOUR_DOMAIN', 'http://localhost:3000');
        const url = await this.stripeService.createCheckoutSession(lookupKey, domain);
        return { url };
    }

    @Post('create-portal-session')
    async createPortalSession(
        @Body('session_id') sessionId: string,
    ): Promise<{ url: string }> {
        const domain = this.configService.get<string>('YOUR_DOMAIN', 'http://localhost:3000');
        const url = await this.stripeService.createBillingPortalSession(sessionId, domain);
        return { url };
    }

    // @Post('webhook')
    // async handleWebhook(
    //     @RawBody() rawBody: Buffer,
    //     @Headers('stripe-signature') signature: string,
    // ): Promise<void> {
    //     const endpointSecret = this.configService.get<string>('STRIPE_ENDPOINT_SECRET');

    //     try {
    //         await this.stripeService.handleWebhook(rawBody, signature, endpointSecret);
    //     } catch (err) {
    //         this.logger.error(`Webhook Error: ${err.message}`);
    //         throw err; // NestJS will handle this as a 400 response.
    //     }
    // }
}
