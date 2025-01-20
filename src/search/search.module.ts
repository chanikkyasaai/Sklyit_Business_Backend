import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessClients } from '../business_clients/business_clients.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { UserPreferencesModule } from 'src/user_preferences/user_preferences.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BusinessClients]),
        CacheModule.register({
            ttl: 300, // Cache time-to-live in seconds (5 minutes)
            max: 100, // Maximum number of items in cache
        }),
        UserPreferencesModule,
    ],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
