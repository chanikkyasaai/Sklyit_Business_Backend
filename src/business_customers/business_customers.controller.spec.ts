import { Test, TestingModule } from '@nestjs/testing';
import { BusinessCustomersController } from './business_customers.controller';
import { BusinessCustomersService } from './business_customers.service';

describe('BusinessCustomersController', () => {
  let controller: BusinessCustomersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessCustomersController],
      providers: [
        {
          provide: BusinessCustomersService,
          useValue: {}, // Provide a mock implementation here
        },
      ],
    }).compile();

    controller = module.get<BusinessCustomersController>(BusinessCustomersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});