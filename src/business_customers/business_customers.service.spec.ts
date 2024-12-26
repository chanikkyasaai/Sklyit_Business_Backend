import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCustomersService } from './business_customers.service';

describe('BusinessCustomersService', () => {
  let service: BusinessCustomersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessCustomersService],
    }).compile();

    service = module.get<BusinessCustomersService>(BusinessCustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
