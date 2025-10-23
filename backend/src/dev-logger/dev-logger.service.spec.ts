import { Test, TestingModule } from '@nestjs/testing';
import { DevLoggerService } from './dev-logger.service';

describe('LoggerService', () => {
  let service: DevLoggerService;

  const message =
    'inet54b8g9gwpg\roigign45\n\n\n\n\t\t\t\tR(RIUGnireonr8938g9pnq9gnsndvos2';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevLoggerService],
    }).compile();

    service = module.get<DevLoggerService>(DevLoggerService);
    console.log = jest.fn();
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2012, 12, 12));
  });

  it('check format log', () => {
    jest.spyOn(service, 'customLog');

    service.customLog(message);

    expect(service.customLog).toHaveBeenCalledWith(message);
    expect(console.log).toHaveBeenCalledWith(service.customFormat(message));
  });
});
