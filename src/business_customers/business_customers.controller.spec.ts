import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCustomersController } from './business_customers.controller';

describe('BusinessCustomersController', () => {
  let controller: BusinessCustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCustomersController],
    }).compile();

    controller = module.get<BusinessCustomersController>(BusinessCustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
