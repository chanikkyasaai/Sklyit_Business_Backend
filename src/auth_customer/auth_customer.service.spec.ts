import { Test, TestingModule } from '@nestjs/testing';
import { AuthCustomerService } from './auth_customer.service';
import { SklyitUsersService } from 'src/sklyit_users/sklyit_users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshToken } from 'src/auth/refreshtoken.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthCustomerService', () => {
  let service: AuthCustomerService;

  const mockSklyitUsersService = {
    findOne: jest.fn(),
  };

  const mockRefreshTokenRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthCustomerService,
        {
          provide: SklyitUsersService,
          useValue: mockSklyitUsersService,
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: mockRefreshTokenRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthCustomerService>(AuthCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
