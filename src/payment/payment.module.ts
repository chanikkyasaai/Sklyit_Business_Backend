import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({})
export class PaymentModule {
  static forRootAsync(options: {
    useFactory: (...args: any[]) => Promise<any> | any;
    inject: any[];
  }): DynamicModule {
    return {
      module: PaymentModule,
      providers: [
        {
          provide: 'PAYMENT_CONFIG',
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
      exports: ['PAYMENT_CONFIG'],
    };
  }
}
