import { Mongoose } from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import Film from './filmModel';
import { filmDto } from '../../films/dto/films.dto';
import FilmsRepository from '../type';
import { AppConfig } from '../../app.config.provider';

@Injectable()
export class FilmsMongoDBRepository implements FilmsRepository {
  @Inject('CONFIG')
  private config: AppConfig;

  constructor(private connection: Mongoose) {
    connection.connect(this.config.database.url);
  }

  async findAll(): Promise<filmDto[]> {
    try {
      const films = await Film.find({});
      return films;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<filmDto> {
    try {
      const film = await Film.findById(id);

      if (!film) {
        throw new NotFoundException('фильм не найден');
      }

      return film;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByIdAndUpdateTaken(
    id: string,
    scheduleIndex: number,
    seat: string,
  ) {
    try {
      const schedulePath = Symbol(`schedule.${scheduleIndex}`);
      const option = {};
      option[schedulePath] = { taken: { $push: seat } };
      const film = await Film.findByIdAndUpdate(id, option, { new: true });
      return film;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
