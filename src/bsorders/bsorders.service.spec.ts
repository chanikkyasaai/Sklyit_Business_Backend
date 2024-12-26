import { Test, TestingModule } from '@nestjs/testing';
import { BsordersService } from './bsorders.service';

describe('BsordersService', () => {
  let service: BsordersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BsordersService],
    }).compile();

    service = module.get<BsordersService>(BsordersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
