import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Shedule } from '../films/entities/shedule.entity';
import { AppConfig } from '../app.config.provider';

export enum DatabaseNames {
  MongoDB = 'mongodb',
  PostgreSQL = 'postgres',
}

interface IAddedOptions {
  [key: string]: unknown;
}

@Module({})
export class DatabaseModule {
  static forRoot(
    configProvider: AppConfig,
    added?: IAddedOptions,
  ): DynamicModule {
    const databaseConfig = configProvider.database;
    switch (databaseConfig.driver) {
      case DatabaseNames.MongoDB:
        return TypeOrmModule.forRoot({
          type: DatabaseNames.MongoDB,
          url: databaseConfig.url,
          entities: [Film, Shedule],
          ...added,
        });
      case DatabaseNames.PostgreSQL:
        if (
          !databaseConfig.port ||
          !databaseConfig.password ||
          !databaseConfig.username
        ) {
          throw new Error('Не определены переменные среды для PostgreSQL');
        }
        return TypeOrmModule.forRoot({
          type: DatabaseNames.PostgreSQL,
          host: databaseConfig.url,
          port: Number(databaseConfig.port),
          username: databaseConfig.username,
          database: databaseConfig.databaseName,
          password: databaseConfig.password,
          entities: [Film, Shedule],
          ...added,
        });
    }
  }
}
