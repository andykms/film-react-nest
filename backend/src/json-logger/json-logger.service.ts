import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLoggerService implements LoggerService {
  private ERROR_COLOR = '\x1b[41m';
  private WARN_COLOR = '\x1b[43m';

  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return JSON.stringify({ level, message, optionalParams });
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
