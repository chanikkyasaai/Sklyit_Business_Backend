import { Test, TestingModule } from '@nestjs/testing';
import { BsordersController } from './bsorders.controller';
import { BsordersService } from './bsorders.service';

describe('BsordersController', () => {
  let controller: BsordersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BsordersController],
      providers: [{
        provide: BsordersService,  // Provide a mock service
        useValue: {
          // Mock implementation of BsordersService methods
          someMethod: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get<BsordersController>(BsordersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
