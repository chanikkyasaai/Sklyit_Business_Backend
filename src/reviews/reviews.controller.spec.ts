import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { getModelToken } from '@nestjs/mongoose';
import { Review_Business } from './entities/review.schema'; // Adjust the import path as necessary

describe('ReviewsController', () => {
  let controller: ReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        {
          provide: getModelToken(Review_Business.name),
          useValue: {}, // Provide a mock implementation here
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});