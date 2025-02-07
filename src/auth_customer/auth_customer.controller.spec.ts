import { Test, TestingModule } from '@nestjs/testing';
import { AuthCustomerController } from './auth_customer.controller';
import { AuthCustomerService } from './auth_customer.service';

describe('AuthCustomerController', () => {
  let controller: AuthCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthCustomerController],
      providers: [
        {
          provide: AuthCustomerService,
          useValue: {}, // Provide a mock implementation here
        },
      ],
    }).compile();

    controller = module.get<AuthCustomerController>(AuthCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});