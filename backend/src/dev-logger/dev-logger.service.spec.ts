import { Test, TestingModule } from '@nestjs/testing';
import { DevLoggerService } from './dev-logger.service';

describe('LoggerService', () => {
  let service: DevLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLoggerService],
    }).compile();

    service = module.get<DevLoggerService>(DevLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
