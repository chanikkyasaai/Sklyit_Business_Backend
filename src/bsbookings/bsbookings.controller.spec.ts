import { Test, TestingModule } from '@nestjs/testing';
import { BsbookingsController } from './bsbookings.controller';

describe('BsbookingsController', () => {
  let controller: BsbookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BsbookingsController],
    }).compile();

    controller = module.get<BsbookingsController>(BsbookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
