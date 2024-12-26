import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltySystemService } from './loyalty_system.service';

describe('LoyaltySystemService', () => {
  let service: LoyaltySystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoyaltySystemService],
    }).compile();

    service = module.get<LoyaltySystemService>(LoyaltySystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
