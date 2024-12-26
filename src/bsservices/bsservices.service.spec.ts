import { Test, TestingModule } from '@nestjs/testing';
import { BsservicesService } from './bsservices.service';

describe('BsservicesService', () => {
  let service: BsservicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BsservicesService],
    }).compile();

    service = module.get<BsservicesService>(BsservicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
