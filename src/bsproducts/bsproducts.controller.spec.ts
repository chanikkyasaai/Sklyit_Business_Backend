import { Test, TestingModule } from '@nestjs/testing';
import { BsproductsController } from './bsproducts.controller';
import { BsproductsService } from './bsproducts.service';

describe('BsproductsController', () => {
  let controller: BsproductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BsproductsController],
      providers: [BsproductsService],
    }).compile();

    controller = module.get<BsproductsController>(BsproductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
