import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { Global } from '@nestjs/common';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { FilmsMongoDBRepository } from './repository/mongoDB/filmRepository';
import { RepositoryModule } from './repository/repository.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({
          filename: '../logs/error.log',
          level: 'error',
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../public'),
    }),
    FilmsModule,
    OrderModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [configProvider],
  exports: [configProvider],
})
export class AppModule {}
