import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLoggerService implements LoggerService {
  ERROR_COLOR = '\x1b[41m';
  WARN_COLOR = '\x1b[43m';

  formatMessage(level: string, message: any, optionalParams?: any[]) {
    const fromArr = (message: any[]) => message.join('#');
    const fromObject = (message: any) => JSON.stringify(message);

    let log = `level=${level}\t`;
    if (typeof message === 'string') {
      log += `message=${message}`;
    } else if (Array.isArray(message)) {
      log += `message=${fromArr(message)}`;
    } else {
      log += `message=${fromObject(message)}`;
    }

    if (optionalParams && optionalParams.length > 0) {
      log += `\toptionalParams=${fromObject(optionalParams)}`;
    }

    return log;
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.log(
      this.ERROR_COLOR,
      this.formatMessage('error', message, optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.log(
      this.WARN_COLOR,
      this.formatMessage('warn', message, optionalParams),
    );
  }
}
