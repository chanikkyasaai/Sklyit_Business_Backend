import { Module } from '@nestjs/common';
import { UserPreferencesService } from './user_preferences.service';
import { UserPreferencesController } from './user_preferences.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferences, UserPreferencesSchema } from './user_preferences.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserPreferences.name, schema: UserPreferencesSchema }]),
  ],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService],
  exports: [UserPreferencesService],
})
export class UserPreferencesModule {}