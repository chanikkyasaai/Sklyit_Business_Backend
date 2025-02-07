import { Test, TestingModule } from '@nestjs/testing';
import { BsservicesController } from './bsservices.controller';
import { BsservicesService } from './bsservices.service';

describe('BsservicesController', () => {
  let controller: BsservicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BsservicesController],
      providers: [BsservicesService],
    }).compile();

    controller = module.get<BsservicesController>(BsservicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
