import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltySystemController } from './loyalty_system.controller';

describe('LoyaltySystemController', () => {
  let controller: LoyaltySystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltySystemController],
    }).compile();

    controller = module.get<LoyaltySystemController>(LoyaltySystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
