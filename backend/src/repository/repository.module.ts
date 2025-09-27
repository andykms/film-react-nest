import { Module } from '@nestjs/common';
import { FilmsMongoDBRepository } from './mongoDB/filmRepository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
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
