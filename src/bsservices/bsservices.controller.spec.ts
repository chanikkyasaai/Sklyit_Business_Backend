import { Test, TestingModule } from '@nestjs/testing';
import { BsservicesController } from './bsservices.controller';
import { BsservicesService } from './bsservices.service';
import { AzureBlobService } from '../imageBlob/imageBlob.service';

const mockAzureBlobService = {
  upload: jest.fn(), // Mock the upload function
  delete: jest.fn(), // Mock the delete function
};

describe('BsservicesController', () => {
  let controller: BsservicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BsservicesController],
      providers: [
        BsservicesService,
        {
          provide: 'ServicesRepository', // Mock the repository as well
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
        {
          provide: AzureBlobService, // Mocking AzureBlobService
          useValue: mockAzureBlobService,
        },
      ],
    }).compile();

    controller = module.get<BsservicesController>(BsservicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
