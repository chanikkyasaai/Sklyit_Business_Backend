import { Test, TestingModule } from '@nestjs/testing';
import { BsordersController } from './bsorders.controller';

describe('BsordersController', () => {
  let controller: BsordersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BsordersController],
    }).compile();

    controller = module.get<BsordersController>(BsordersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
