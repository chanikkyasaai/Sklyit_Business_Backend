import { Test, TestingModule } from '@nestjs/testing';
import { BusinessClientsService } from './business_clients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BusinessClients } from './business_clients.entity'; // Adjust the import path as necessary
import { AzureBlobService } from '../imageBlob/imageBlob.service'; // Adjust the import path as necessary
import { ConfigService } from '@nestjs/config'; // Import ConfigService
import { Users } from '../sklyit_users/sklyit_users.entity'; // Adjust the import path as necessary

describe('BusinessClientsService', () => {
  let service: BusinessClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessClientsService,
        {
          provide: AzureBlobService,
          useValue: {}, // Provide a mock implementation here
        },
        {
          provide: getRepositoryToken(BusinessClients),
          useValue: {}, // Provide a mock implementation here
        },
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

    service = module.get<BusinessClientsService>(BusinessClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});