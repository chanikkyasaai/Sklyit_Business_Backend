import { Test, TestingModule } from '@nestjs/testing';
import { BsbookingsController } from './bsbookings.controller';
import { BsbookingsService } from './bsbookings.service';

describe('BsbookingsController', () => {
  let controller: BsbookingsController;

  const mockBsbookingsService = {
    // mock methods as needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BsbookingsController],
      providers: [
        {
          provide: BsbookingsService,
          useValue: mockBsbookingsService,
        },
      ],
    }).compile();

    controller = module.get<BsbookingsController>(BsbookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
