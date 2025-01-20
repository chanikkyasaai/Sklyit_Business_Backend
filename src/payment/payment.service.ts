import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
    private readonly stripe: Stripe;
    private readonly logger = new Logger(PaymentService.name);

    constructor(private readonly configService: ConfigService) {
        this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'), {
            apiVersion: this.configService.get('STRIPE_API_VERSION', '2024-12-18.acacia'),
        });
    }

    async createCheckoutSession(lookupKey: string, domain: string): Promise<string> {
        const prices = await this.stripe.prices.list({
            lookup_keys: [lookupKey],
            expand: ['data.product'],
        });

        const session = await this.stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: prices.data[0].id,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${domain}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domain}?canceled=true`,
        });

        return session.url;
    }

    async createBillingPortalSession(sessionId: string, domain: string): Promise<string> {
        const checkoutSession = await this.stripe.checkout.sessions.retrieve(sessionId);

        const portalSession = await this.stripe.billingPortal.sessions.create({
            customer: checkoutSession.customer as string,
            return_url: domain,
        });

        return portalSession.url;
    }

    async handleWebhook(payload: Buffer, sig: string, endpointSecret: string): Promise<void> {
        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            this.logger.error(`Webhook signature verification failed: ${err.message}`);
            throw new Error('Webhook Error');
        }

        switch (event.type) {
            case 'customer.subscription.trial_will_end':
                this.logger.log('Subscription trial will end.');
                break;
            case 'customer.subscription.deleted':
                this.logger.log('Subscription deleted.');
                break;
            case 'customer.subscription.created':
                this.logger.log('Subscription created.');
                break;
            case 'customer.subscription.updated':
                this.logger.log('Subscription updated.');
                break;
            default:
                this.logger.warn(`Unhandled event type: ${event.type}`);
        }
    }

}
