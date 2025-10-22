import { Test, TestingModule } from '@nestjs/testing';
import { TskvLoggerService } from './tskv-logger.service';

describe('TskvLoggerService', () => {
  let service: TskvLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLoggerService],
    }).compile();

    service = module.get<TskvLoggerService>(TskvLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
