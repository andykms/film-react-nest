import { Injectable } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DevLoggerService extends ConsoleLogger {
  customLog(message: string) {
    console.log(`next message:\t${message} - ${new Date().toISOString()}`);
  }
}
