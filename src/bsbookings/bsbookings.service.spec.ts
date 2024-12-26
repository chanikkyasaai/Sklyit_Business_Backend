import { Test, TestingModule } from '@nestjs/testing';
import { BsbookingsService } from './bsbookings.service';

describe('BsbookingsService', () => {
  let service: BsbookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BsbookingsService],
    }).compile();

    service = module.get<BsbookingsService>(BsbookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
