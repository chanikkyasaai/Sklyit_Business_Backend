import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { getModelToken } from '@nestjs/mongoose';
import { Review_Business } from './entities/review.schema'; // Adjust the import path as necessary

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getModelToken(Review_Business.name),
          useValue: {}, // Provide a mock implementation here
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});