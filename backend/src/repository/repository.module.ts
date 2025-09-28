import { Module } from '@nestjs/common';
import { FilmsMongoDBRepository } from './mongoDB/filmRepository';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ConfigModule, CacheModule.register({ ttl: 60 })],
  providers: [
    {
      provide: 'FilmsRepository',
      useClass: FilmsMongoDBRepository,
    },
  ],
  exports: [
    {
      provide: 'FilmsRepository',
      useClass: FilmsMongoDBRepository,
    },
  ],
})
export class RepositoryModule {}
