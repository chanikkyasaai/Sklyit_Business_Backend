import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchBusinessClientsDto } from './search.dto';

@Controller('search/:userId')
export class SearchController {
    constructor(private readonly businessClientsService: SearchService) {}

    @Get()
    async searchBusinessClients(@Param ('userId') userId: string, @Query() filters: SearchBusinessClientsDto) {
        return await this.businessClientsService.searchBusinessClients(filters, userId);
    }
}
