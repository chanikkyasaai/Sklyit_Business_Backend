import { Test, TestingModule } from '@nestjs/testing';
import { SklyitUsersController } from './sklyit_users.controller';
import { SklyitUsersService } from './sklyit_users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './sklyit_users.entity';
import { AzureBlobService } from '../imageBlob/imageBlob.service';

describe('SklyitUsersController', () => {
  let controller: SklyitUsersController;

  const mockUsersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockAzureBlobService = {
    uploadFile: jest.fn(),
    deleteFile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SklyitUsersController],
      providers: [
        SklyitUsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository,
        },
        {
          provide: AzureBlobService,
          useValue: mockAzureBlobService,
        },
      ],
    }).compile();

    controller = module.get<SklyitUsersController>(SklyitUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
