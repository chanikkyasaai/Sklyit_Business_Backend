import { Module } from '@nestjs/common';
import { AuthCustomerService } from './auth_customer.service';
import { AuthCustomerController } from './auth_customer.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SklyitUsersModule } from 'src/sklyit_users/sklyit_users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from 'src/auth/refreshtoken.entity';

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
    SklyitUsersModule,TypeOrmModule.forFeature([RefreshToken])
  ],
  providers: [AuthCustomerService, JwtStrategy],
  controllers: [AuthCustomerController],
  exports: [AuthCustomerService]
})
export class AuthCustomerModule {}
