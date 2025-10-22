import { Test, TestingModule } from '@nestjs/testing';
import { JsonLoggerService } from './json-logger.service';

describe('JsonLoggerService', () => {
  let service: JsonLoggerService;

  const logText =
    'ginegegn39ONIRERGOgn3iogn;vev jevwoin;w4oieni0gejr eoirg\tiboiORIGonvoNIGGAeiorneri\nienovern';
  const errorText = '43ir34mfONGIROg regi3ogn34IOONROIiong3 lgegket\t\t\nier';
  const warnText = 'iwrig290j290j4239mom\t\no\nroIORGRpgwpr\t\t\nfoprmroer';

  const optionalParams = {
    fish: 'rich',
    beach: 'lichi',
    establishment: 'mama, vyzyvai taksi',
  };

  const moreOptional = [
    13242,
    453534,
    'r493934',
    { g: 'giorgioeg', h: [4242, 'rreger'] },
    'ierofner',
    34434,
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLoggerService],
    }).compile();

    service = module.get<JsonLoggerService>(JsonLoggerService);
    console.log = jest.fn();
  });

  it('checked format log', () => {
    jest.spyOn(service, 'log');

    service.log(logText, optionalParams);

    expect(service.log).toHaveBeenCalledWith(logText, optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: logText,
        optionalParams: [[optionalParams]],
      }),
    );
  });

  it('checked format error', () => {
    jest.spyOn(service, 'error');

    service.error(errorText, optionalParams);

    expect(service.error).toHaveBeenCalledWith(errorText, optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      service.ERROR_COLOR,
      JSON.stringify({
        level: 'error',
        message: errorText,
        optionalParams: [[optionalParams]],
      }),
    );
  });

  it('checked format warn', () => {
    jest.spyOn(service, 'warn');

    service.warn(warnText, optionalParams);

    expect(service.warn).toHaveBeenCalledWith(warnText, optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      service.WARN_COLOR,
      JSON.stringify({
        level: 'warn',
        message: warnText,
        optionalParams: [[optionalParams]],
      }),
    );
  });

  it('checked without optionalParams', () => {
    jest.spyOn(service, 'log');

    service.log(logText);
    expect(service.log).toHaveBeenCalledWith(logText);
    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: logText,
        optionalParams: [[]],
      }),
    );
  });

  it('checked message as object', () => {
    jest.spyOn(service, 'log');
    service.log(messageObj, optionalParams);
    expect(service.log).toHaveBeenCalledWith(messageObj, optionalParams);
    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: messageObj,
        optionalParams: [[optionalParams]],
      }),
    );
  });

  it('checked more optional params in log', () => {
    jest.spyOn(service, 'log');

    service.log(messageObj, ...moreOptional);
    expect(service.log).toHaveBeenCalledWith(messageObj, ...moreOptional);
    expect(console.log).toHaveBeenCalledWith(
      JSON.stringify({
        level: 'log',
        message: messageObj,
        optionalParams: [moreOptional],
      }),
    );
  });

  it('checked more optional params in error', () => {
    jest.spyOn(service, 'error');

    service.error(messageObj, ...moreOptional);
    expect(service.error).toHaveBeenCalledWith(messageObj, ...moreOptional);
    expect(console.log).toHaveBeenCalledWith(
      service.ERROR_COLOR,
      JSON.stringify({
        level: 'error',
        message: messageObj,
        optionalParams: [moreOptional],
      }),
    );
  });

  it('checked more optional params in warn', () => {
    jest.spyOn(service, 'warn');

    service.warn(messageObj, ...moreOptional);
    expect(service.warn).toHaveBeenCalledWith(messageObj, ...moreOptional);
    expect(console.log).toHaveBeenCalledWith(
      service.WARN_COLOR,
      JSON.stringify({
        level: 'warn',
        message: messageObj,
        optionalParams: [moreOptional],
      }),
    );
  });
});
