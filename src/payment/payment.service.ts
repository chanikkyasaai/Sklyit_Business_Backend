import { Injectable} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cashfree } from 'cashfree-pg';

@Injectable()
export class PaymentService {
    constructor(
        private readonly configService: ConfigService,

    ) { }

    async createOrder() {
        Cashfree.XClientId = this.configService.get('AppId')
        Cashfree.XClientSecret = this.configService.get('SECRET_KEY_Cashfree')
        Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
    }
}
