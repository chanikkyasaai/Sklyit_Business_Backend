import { Test, TestingModule } from '@nestjs/testing';
import { SubscribersService } from './subscribers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subscription } from './subscribers.entity'; // Adjust the import path as necessary

describe('SubscribersService', () => {
  let service: SubscribersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscribersService,
        {
          provide: getRepositoryToken(Subscription),
          useValue: {}, // Provide a mock implementation here
        },
      ],
    }).compile();

    service = module.get<SubscribersService>(SubscribersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});