import { Test, TestingModule } from '@nestjs/testing';
import { BspostService } from './bspost.service';

describe('BspostService', () => {
  let service: BspostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BspostService],
    }).compile();

    service = module.get<BspostService>(BspostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
