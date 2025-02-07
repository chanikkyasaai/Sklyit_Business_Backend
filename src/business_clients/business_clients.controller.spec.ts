import { Test, TestingModule } from '@nestjs/testing';
import { BusinessClientsController } from './business_clients.controller';
import { BusinessClientsService } from './business_clients.service';

describe('BusinessClientsController', () => {
  let controller: BusinessClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessClientsController],
      providers: [
        {
          provide: BusinessClientsService,
          useValue: {}, // Provide a mock implementation here
        },
      ],
    }).compile();

    controller = module.get<BusinessClientsController>(BusinessClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});