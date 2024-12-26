import { Test, TestingModule } from '@nestjs/testing';
import { BsproductsService } from './bsproducts.service';

describe('BsproductsService', () => {
  let service: BsproductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BsproductsService],
    }).compile();

    service = module.get<BsproductsService>(BsproductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
