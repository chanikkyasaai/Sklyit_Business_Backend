import { Test, TestingModule } from '@nestjs/testing';
import { SklyitUsersService } from './sklyit_users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './sklyit_users.entity'; // Adjust the import path as necessary
import { AzureBlobService } from '../imageBlob/imageBlob.service'; // Adjust the import path as necessary
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('SklyitUsersService', () => {
  let service: SklyitUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SklyitUsersService,
        AzureBlobService,
        {
          provide: getRepositoryToken(Users),
          useValue: {}, // Provide a mock implementation here
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('mocked_connection_string'), // Mock implementation for get method
          },
        },
      ],
    }).compile();

    service = module.get<SklyitUsersService>(SklyitUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});