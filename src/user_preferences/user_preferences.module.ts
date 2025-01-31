import { Module } from '@nestjs/common';
import { UserPreferencesService } from './user_preferences.service';
import { UserPreferencesController } from './user_preferences.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferences, UserPreferencesSchema } from './user_preferences.schema';
import { BusinessClients } from 'src/business_clients/business_clients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SklyitUsersService } from 'src/sklyit_users/sklyit_users.service';
import { SklyitUsersModule } from 'src/sklyit_users/sklyit_users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserPreferences.name, schema: UserPreferencesSchema }]),
    TypeOrmModule.forFeature([BusinessClients]),
    SklyitUsersModule,
  ],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService],
  exports: [UserPreferencesService],
})
export class UserPreferencesModule {}