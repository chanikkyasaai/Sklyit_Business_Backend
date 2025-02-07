import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SklyitUsersService } from 'src/sklyit_users/sklyit_users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BusinessClients } from 'src/business_clients/business_clients.entity';
import { RefreshToken } from 'src/auth/refreshtoken.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockSklyitUsersService = {
    findOne: jest.fn(),
  };

  const mockBusinessClientsRepository = {
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
        AuthService,
        {
          provide: SklyitUsersService,
          useValue: mockSklyitUsersService,
        },
        {
          provide: getRepositoryToken(BusinessClients),
          useValue: mockBusinessClientsRepository,
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
