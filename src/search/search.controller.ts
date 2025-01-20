import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchBusinessClientsDto } from './search.dto';

@Controller('search')
export class SearchController {
    constructor(private readonly businessClientsService: SearchService) {}

    @Get()
    async searchBusinessClients(@Query() filters: SearchBusinessClientsDto) {
        return await this.businessClientsService.searchBusinessClients(filters);
    }
}
