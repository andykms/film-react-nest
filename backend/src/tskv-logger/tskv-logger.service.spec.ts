import { Test, TestingModule } from '@nestjs/testing';
import { TskvLoggerService } from './tskv-logger.service';

describe('TskvLoggerService', () => {
  let service: TskvLoggerService;

  const message =
    'ginegegn39ONIRERGOgn3iogn;vev jevwoin;w4oieni0gejr eoirg\tiboiORIGonvoNIGGAeiorneri\nienovern';
  const optionalParams = [
    {
      fish: 'rich',
      beach: 'lichi',
      establishment: 'mama, vyzyvai taksi',
    },
    242342,
    Infinity,
    undefined,
    null,
    {
      undefined: {
        1: 2432,
        v: () => {},
      },
    },
    -Infinity,
    -324423949,
    'riorgeo',
  ];

  const messageObj = {
    home: {
      moscow: [1231, 53453, 53],
      ufa: 'moscow',
    },
    garden: [
      'geriorergerger\n\n\n\tifnerineoe',
      {
        fn: 'fierioegg30gn39g',
      },
    ],
  };
  const optionalParamsObj = [
    13242,
    453534,
    'r493934',
    { g: 'giorgioeg', h: [4242, 'rreger'] },
    'ierofner',
    34434,
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TskvLoggerService],
    }).compile();
    service = module.get<TskvLoggerService>(TskvLoggerService);
    console.log = jest.fn();
  });

  it('checked format function with string message', () => {
    jest.spyOn(service, 'formatMessage');

    const logData = {
      level: 'log',
      message,
      optionalParams: optionalParamsObj,
    };

    const result = service.formatMessage(
      logData.level,
      logData.message,
      logData.optionalParams,
    );

    expect(service.formatMessage).toHaveBeenCalledWith(
      logData.level,
      logData.message,
      logData.optionalParams,
    );

    expect(result).toEqual(
      `level=${logData.level}\tmessage=${logData.message}\toptionalParams=${JSON.stringify(logData.optionalParams)}`,
    );
  });

  it('checked format function with message-array', () => {
    jest.spyOn(service, 'formatMessage');

    const logData = {
      level: 'log',
      message: ['dog', 'cat', 1234, 'id'],
      optionalParams: optionalParamsObj,
    };

    const result = service.formatMessage(
      logData.level,
      logData.message,
      logData.optionalParams,
    );

    expect(service.formatMessage).toHaveBeenCalledWith(
      logData.level,
      logData.message,
      logData.optionalParams,
    );

    expect(result).toEqual(
      `level=${logData.level}\tmessage=${logData.message.join('#')}\toptionalParams=${JSON.stringify(logData.optionalParams)}`,
    );
  });

  it('checked format function with message-object', () => {
    jest.spyOn(service, 'formatMessage');

    const logData = {
      level: 'log',
      message: messageObj,
      optionalParams: optionalParamsObj,
    };

    const result = service.formatMessage(
      logData.level,
      logData.message,
      logData.optionalParams,
    );

    expect(service.formatMessage).toHaveBeenCalledWith(
      logData.level,
      logData.message,
      logData.optionalParams,
    );

    expect(result).toEqual(
      `level=${logData.level}\tmessage=${JSON.stringify(logData.message)}\toptionalParams=${JSON.stringify(logData.optionalParams)}`,
    );
  });

  it('checked format function without optional params', () => {
    jest.spyOn(service, 'formatMessage');

    const logData = {
      level: 'log',
      message: messageObj,
    };

    const result = service.formatMessage(logData.level, logData.message);

    expect(service.formatMessage).toHaveBeenCalledWith(
      logData.level,
      logData.message,
    );

    expect(result).toEqual(
      `level=${logData.level}\tmessage=${JSON.stringify(logData.message)}`,
    );
  });

  it('checked format log', () => {
    jest.spyOn(service, 'log');

    service.log(message, ...optionalParams);

    expect(service.log).toHaveBeenCalledWith(message, ...optionalParams);

    expect(console.log).toHaveBeenCalledWith(
      `level=log\tmessage=${message}\toptionalParams=${JSON.stringify(optionalParams)}`,
    );
  });

  it('checked format error', () => {
    jest.spyOn(service, 'error');

    service.error(message, ...optionalParams);

    expect(service.error).toHaveBeenCalledWith(message, ...optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      service.ERROR_COLOR,
      `level=error\tmessage=${message}\toptionalParams=${JSON.stringify(optionalParams)}`,
    );
  });

  it('checked format warn', () => {
    jest.spyOn(service, 'warn');

    service.warn(message, ...optionalParams);

    expect(service.warn).toHaveBeenCalledWith(message, ...optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      service.WARN_COLOR,
      `level=warn\tmessage=${message}\toptionalParams=${JSON.stringify(optionalParams)}`,
    );
  });
});
