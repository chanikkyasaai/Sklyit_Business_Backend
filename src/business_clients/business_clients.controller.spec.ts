import { Test, TestingModule } from '@nestjs/testing';
import { BusinessClientsController } from './business_clients.controller';

describe('BusinessClientsController', () => {
  let controller: BusinessClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessClientsController],
    }).compile();

    controller = module.get<BusinessClientsController>(BusinessClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
