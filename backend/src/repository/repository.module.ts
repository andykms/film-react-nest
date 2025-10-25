import { Module } from '@nestjs/common';
import { AppRepository } from './AppRepository';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Shedule } from '../films/entities/shedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Shedule])],
  providers: [
    {
      provide: 'FilmsRepository',
      useClass: AppRepository,
    },
  ],
  exports: [
    {
      provide: 'FilmsRepository',
      useClass: AppRepository,
    },
  ],
})
export class RepositoryModule {}
