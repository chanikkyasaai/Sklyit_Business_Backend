import { Test, TestingModule } from '@nestjs/testing';
import { BsservicesService } from './bsservices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Services } from './services.entity'; // Adjust the import path as necessary
import { AzureBlobService } from '../imageBlob/imageBlob.service'; // Adjust the import path as necessary
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('BsservicesService', () => {
  let service: BsservicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BsservicesService,
        {
          provide: getRepositoryToken(Services),
          useValue: {}, // Provide a mock implementation here
        },
        {
          provide: AzureBlobService,
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

    service = module.get<BsservicesService>(BsservicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});