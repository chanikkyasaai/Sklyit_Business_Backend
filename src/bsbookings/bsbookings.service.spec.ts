import { Test, TestingModule } from '@nestjs/testing';
import { BsbookingsService } from './bsbookings.service';

// Create mock versions of the repositories
const mockBookingRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

const mockUsersRepository = {
  findOne: jest.fn(),
};

describe('BsbookingsService', () => {
  let service: BsbookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BsbookingsService,
        {
          provide: 'BookingRepository', // Mock BookingRepository
          useValue: mockBookingRepository,
        },
        {
          provide: 'UsersRepository', // Mock UsersRepository
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<BsbookingsService>(BsbookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
