import { Controller } from '@nestjs/common';
import { LoyaltySystemService } from './loyalty_system.service';

@Controller('loyalty-system')
export class LoyaltySystemController {

    constructor(
        private loyaltySystemService: LoyaltySystemService
    ) { }
    
}
