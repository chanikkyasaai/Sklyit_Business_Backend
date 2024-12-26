import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleModule } from './example/example.module';
import { BsservicesModule } from './bsservices/bsservices.module';
// import { Service } from './bsservices/services.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BusinessClientsModule } from './business_clients/business_clients.module';
import { BusinessCustomersModule } from './business_customers/business_customers.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { SklyitUsersModule } from './sklyit_users/sklyit_users.module';
import { BsbookingsModule } from './bsbookings/bsbookings.module';
import { BsordersModule } from './bsorders/bsorders.module';
import { BsproductsModule } from './bsproducts/bsproducts.module';
import { LoyaltySystemModule } from './loyalty_system/loyalty_system.module';
// import * as dotenv from 'dotenv';
@Module({
  imports: [ExampleModule,BsservicesModule,
    ConfigModule.forRoot({
      envFilePath: './../.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('DB_HOST');
        const port = configService.get('DB_PORT');
        const username = configService.get('DB_USERNAME');
        const password = configService.get('DB_PASSWORD');
        const database = configService.get('DB_DATABASE');

        if (!host || !port || !username || !password || !database) {
          throw new Error('DB configuration is not set');
        }

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: ['dist//*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false, // Set this to false if you're using self-signed certificates
          },
        }
      },
      inject: [ConfigService]
    }),
    BusinessClientsModule,
    BusinessCustomersModule,
    SubscribersModule,
    SklyitUsersModule,
    BsbookingsModule,
    BsordersModule,
    BsproductsModule,
    LoyaltySystemModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
