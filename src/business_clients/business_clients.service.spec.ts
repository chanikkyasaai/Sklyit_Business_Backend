import { Test, TestingModule } from '@nestjs/testing';
import { BusinessClientsService } from './business_clients.service';

describe('BusinessClientsService', () => {
  let service: BusinessClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessClientsService],
    }).compile();

    service = module.get<BusinessClientsService>(BusinessClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
