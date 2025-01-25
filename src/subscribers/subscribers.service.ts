import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './subscribers.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribersService {
    constructor(
        @InjectRepository(Subscription)
        private readonly subscriptionRepository:Repository<Subscription>,
    ) { }
    
    
}
