import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCustomersService } from './business_customers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customers } from './business_customers.entity';

describe('BusinessCustomersService', () => {
  let service: BusinessCustomersService;

  const mockCustomersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessCustomersService,
        {
          provide: getRepositoryToken(Customers),
          useValue: mockCustomersRepository,
        },
      ],
    }).compile();

    service = module.get<BusinessCustomersService>(BusinessCustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
