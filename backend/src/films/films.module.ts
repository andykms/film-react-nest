import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { FilmsMongoDBRepository } from '../repository/mongoDB/filmRepository';

@Module({
  imports: [FilmsMongoDBRepository],
  providers: [FilmsService],
  controllers: [FilmsController],
})
export class FilmsModule {}
