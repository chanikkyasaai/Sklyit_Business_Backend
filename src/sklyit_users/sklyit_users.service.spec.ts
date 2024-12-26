import { Test, TestingModule } from '@nestjs/testing';
import { SklyitUsersService } from './sklyit_users.service';

describe('SklyitUsersService', () => {
  let service: SklyitUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SklyitUsersService],
    }).compile();

    service = module.get<SklyitUsersService>(SklyitUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
