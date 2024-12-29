import { Test, TestingModule } from '@nestjs/testing';
import { BspostController } from './bspost.controller';

describe('BspostController', () => {
  let controller: BspostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BspostController],
    }).compile();

    controller = module.get<BspostController>(BspostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
