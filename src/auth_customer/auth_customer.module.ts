import { Module } from '@nestjs/common';
import { AuthCustomerService } from './auth_customer.service';
import { AuthCustomerController } from './auth_customer.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SklyitUsersModule } from 'src/sklyit_users/sklyit_users.module';
import { BusinessClients } from 'src/business_clients/business_clients.entity';
import { BusinessClientsModule } from 'src/business_clients/business_clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY'),
        signOptions: {  },
      })
    }),
    SklyitUsersModule,BusinessClientsModule,TypeOrmModule.forFeature([BusinessClients])
  ],
  providers: [AuthCustomerService, JwtStrategy],
  controllers: [AuthCustomerController]
})
export class AuthCustomerModule {}
