import { ConfigModule } from '@nestjs/config';

const applicationConfig = process.env;

export const configProvider = {
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    //TODO прочесть переменнные среды
    database: {
      driver: applicationConfig.DATABASE_DRIVER,
      url: applicationConfig.DATABASE_URL,
      username: applicationConfig.DATABASE_USERNAME,
      password: applicationConfig.DATABASE_PASSWORD,
      port: applicationConfig.DATABASE_PORT,
      databaseName: applicationConfig.DATABASE_NAME,
    },
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  username?: string;
  password?: string;
  port?: string;
  databaseName?: string;
}
