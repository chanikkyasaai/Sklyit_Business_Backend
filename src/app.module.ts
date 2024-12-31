import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleModule } from './example/example.module';
import { BsservicesModule } from './bsservices/bsservices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BusinessClientsModule } from './business_clients/business_clients.module';
import { BusinessCustomersModule } from './business_customers/business_customers.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { SklyitUsersModule } from './sklyit_users/sklyit_users.module';
import { BsbookingsModule } from './bsbookings/bsbookings.module';
import { BsordersModule } from './bsorders/bsorders.module';
import { BsproductsModule } from './bsproducts/bsproducts.module';
import { LoyaltySystemModule } from './loyalty_system/loyalty_system.module';
import { Services } from './bsservices/services.entity';
import { BusinessClients } from './business_clients/business_clients.entity';
import { Customers } from './business_customers/business_customers.entity';
import { Booking } from './bsbookings/bsbookings.entity';
import { Orders } from './bsorders/bsorders.entity';
import { Subscribers } from './subscribers/subscribers.entity';
import { HasLoyalty } from './loyalty_system/loyalty_system.entity';
import { Products } from './bsproducts/bsproducts.entity';
import { Users } from './sklyit_users/sklyit_users.entity';
import { ChatAppModule } from './chat_app/chatapp.module';
import { ImageBlobModule } from './imageBlob/imageBlob.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

// import * as dotenv from 'dotenv';
@Module({
  imports: [ExampleModule,BsservicesModule,
    ConfigModule.forRoot({
      isGlobal: true,
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
          console.log(host, port, username)
          throw new Error('DB configuration is not set');
        }

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [Services,BusinessClients,Customers,Booking,Orders,Subscribers,HasLoyalty,Products,Users],
          autoLoadEntities: true,
          synchronize: true,
          ssl: {
            rejectUnauthorized: false, // Set this to false if you're using self-signed certificates
          },
        }
      },
      inject: [ConfigService]
    }),
   
  //   MongooseModule.forRootAsync(
  //     {
  //       useFactory: (configService: ConfigService) => ({
  //         uri: configService.get('MONGO_URI'),
  //       }),
  //       inject: [ConfigService],
  //     }
  //   ),
    BusinessClientsModule,
    BusinessCustomersModule,
    SubscribersModule,
    SklyitUsersModule,
    BsbookingsModule,
    BsordersModule,
    BsproductsModule,
    LoyaltySystemModule,
    ChatAppModule,
    BspostModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
