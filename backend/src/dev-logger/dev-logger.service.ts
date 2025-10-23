import { Injectable } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLoggerService extends ConsoleLogger {
  customFormat(message: string) {
    return `next message:\t${message} - ${new Date().toISOString()}`;
  }

  customLog(message: string) {
    console.log(this.customFormat(message));
  }
}
