import { Test, TestingModule } from '@nestjs/testing';
import { AuthCustomerController } from './auth_customer.controller';

describe('AuthCustomerController', () => {
  let controller: AuthCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthCustomerController],
    }).compile();

    controller = module.get<AuthCustomerController>(AuthCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
