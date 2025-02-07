import { Test, TestingModule } from '@nestjs/testing';
import { BsordersService } from './bsorders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Orders } from './bsorders.entity';
import { Customers } from '../business_customers/business_customers.entity';


describe('BsordersService', () => {
  let service: BsordersService;

  const mockOrdersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockCustomersRepository = {
    findOne: jest.fn(),
    // ...add other methods as needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BsordersService,
        {
          provide: getRepositoryToken(Orders),
          useValue: mockOrdersRepository,
        },
        {
          provide: getRepositoryToken(Customers),
          useValue: mockCustomersRepository,
        },
      ],
    }).compile();

    service = module.get<BsordersService>(BsordersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
