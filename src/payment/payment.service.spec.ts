import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config';

describe('PaymentService', () => {
  let service: PaymentService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const mockValues = {
        PAYMENT_API_KEY: 'mock-api-key',
        PAYMENT_SECRET: 'mock-secret',
      };
      return mockValues[key] || 'mockValue';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrieve API key from ConfigService', () => {
    expect(configService.get('PAYMENT_API_KEY')).toBe('mock-api-key');
  });

  it('should retrieve a default mock value if key is unknown', () => {
    expect(configService.get('UNKNOWN_KEY')).toBe('mockValue');
  });
});
