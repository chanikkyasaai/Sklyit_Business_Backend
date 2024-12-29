import { Test, TestingModule } from '@nestjs/testing';
import { ChatAppService } from './chat_app.service';

describe('ChatAppService', () => {
  let service: ChatAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatAppService],
    }).compile();

    service = module.get<ChatAppService>(ChatAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
