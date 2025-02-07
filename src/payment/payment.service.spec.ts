import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { ConfigService } from '@nestjs/config'; // Ensure this import exists


describe('PaymentService', () => {
  let service: PaymentService;
  let configService: ConfigService;

  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: ConfigService,
          useValue: {
            // ...mock config values...
            get: () => 'test-value',
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
});
