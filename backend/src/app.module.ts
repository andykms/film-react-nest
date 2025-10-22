import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Global } from '@nestjs/common';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { RepositoryModule } from './repository/repository.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { TskvLoggerService } from './tskv-logger/tskv-logger.service';
import { JsonLoggerService } from './json-logger/json-logger.service';
import { DevLoggerService } from './dev-logger/dev-logger.service';

@Global()
@Module({
  imports: [
    DatabaseModule.forRoot(configProvider.useValue, { synchronize: true }),
    ThrottlerModule.forRoot([{ ttl: 60, limit: 50 }]),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../public'),
    }),
    FilmsModule,
    OrderModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [
    configProvider,
    DevLoggerService,
    JsonLoggerService,
    TskvLoggerService,
  ],
  exports: [configProvider],
})
export class AppModule {}
