import { Test, TestingModule } from '@nestjs/testing';
import { BsproductsController } from './bsproducts.controller';
import { BsproductsService } from './bsproducts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Products } from './bsproducts.entity'; // Adjust the import path as necessary
import { AzureBlobService } from '../imageBlob/imageBlob.service'; // Adjust the import path as necessary
import { ConfigService } from '@nestjs/config'; // Import ConfigService

describe('BsproductsController', () => {
  let controller: BsproductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BsproductsController],
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

    controller = module.get<BsproductsController>(BsproductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});