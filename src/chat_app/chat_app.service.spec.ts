import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat_app.service';
import { getModelToken } from '@nestjs/mongoose';
import { Message } from './message.schema'; // Adjust the import path as necessary
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from '../sklyit_users/sklyit_users.entity'; // Adjust the import path as necessary

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken(Message.name),
          useValue: {}, // Provide a mock implementation here
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {}, // Provide a mock implementation here
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});