import { Test, TestingModule } from '@nestjs/testing';
import { SklyitUsersController } from './sklyit_users.controller';

describe('SklyitUsersController', () => {
  let controller: SklyitUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SklyitUsersController],
    }).compile();

    controller = module.get<SklyitUsersController>(SklyitUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
