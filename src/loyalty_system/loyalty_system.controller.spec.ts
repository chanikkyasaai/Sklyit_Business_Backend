import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltySystemController } from './loyalty_system.controller';
import { LoyaltySystemService } from './loyalty_system.service';

describe('LoyaltySystemController', () => {
  let controller: LoyaltySystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltySystemController],
      providers: [
        {
          provide: LoyaltySystemService,
          useValue: {}, // Mock implementation
        },
      ],
    }).compile();

    controller = module.get<LoyaltySystemController>(LoyaltySystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
