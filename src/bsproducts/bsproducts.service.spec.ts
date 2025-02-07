import { Test, TestingModule } from '@nestjs/testing';
import { BsproductsService } from './bsproducts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Products } from './bsproducts.entity'; // Adjust the import path as necessary
import { AzureBlobService } from '../imageBlob/imageBlob.service'; // Adjust the import path as necessary
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('BsproductsService', () => {
  let service: BsproductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BsproductsService,
        AzureBlobService,
        {
          provide: getRepositoryToken(Products),
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

    service = module.get<BsproductsService>(BsproductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});