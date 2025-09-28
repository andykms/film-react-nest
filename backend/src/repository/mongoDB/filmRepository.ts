import mongoose from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
  HttpException,
} from '@nestjs/common';
import Film from './filmModel';
import { filmDto } from '../../films/dto/films.dto';
import FilmsRepository from '../type';
import { AppConfig } from '../../app.config.provider';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class FilmsMongoDBRepository implements FilmsRepository {
  constructor(
    @Inject('CONFIG') private appConfig: AppConfig,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    mongoose.connect(this.appConfig.database.url);
  }

  async findAll(): Promise<filmDto[]> {
    try {
      const films = await Film.find({});
      return films;
    } catch (error) {
      this._errorThrow();
    }
  }

  async findOne(id: string): Promise<filmDto> {
    try {
      const filmCacheKey = `film:${id}`;
      const cachedFilm = await this.cacheManager.get<filmDto>(filmCacheKey);
      if (cachedFilm) {
        return cachedFilm;
      }

      const film = await Film.findOne({ id });
      if (!film) {
        throw new NotFoundException('фильм не найден');
      }
      await this.cacheManager.set<filmDto>(filmCacheKey, film);
      return film;
    } catch (error) {
      this._errorThrow(error);
    }
  }

  private _errorThrow(error?: unknown) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException();
  }

  async findByIdAndUpdateTaken(
    id: string,
    scheduleIndex: number,
    seat: string,
  ) {
    try {
      const schedulePath = `schedule.${scheduleIndex}.taken`;
      const option = { $push: { [schedulePath]: seat } };
      const film = await Film.findOneAndUpdate({ id }, option, { new: true });
      return film;
    } catch (error) {
      this._errorThrow(error);
    }
  }
}
