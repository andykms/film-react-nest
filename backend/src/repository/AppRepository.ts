import mongoose from 'mongoose';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
  HttpException,
} from '@nestjs/common';
import { filmDto, sheduleDto, filmFullDto } from '../films/dto/films.dto';
import IAppRepository from './type';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Shedule } from '../films/entities/shedule.entity';

@Injectable()
export class AppRepository implements IAppRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Shedule) private sheduleRepository: Repository<Shedule>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(): Promise<filmDto[]> {
    try {
      const films = await this.filmRepository.find();
      return films;
    } catch (error) {
      console.error(error);
      this._errorThrow();
    }
  }

  private _getFullFilmCacheKey(id: string) {
    return `film:full:${id}`;
  }

  async findOne(id: string): Promise<filmFullDto> {
    try {
      const filmFullCacheKey = this._getFullFilmCacheKey(id);
      const cachedFilm =
        await this.cacheManager.get<filmFullDto>(filmFullCacheKey);
      if (cachedFilm) {
        return cachedFilm;
      }
      const film = await this.filmRepository.findOne({
        where: {
          id,
        },
        relations: {
          shedules: true,
        },
      });
      if (!film) {
        throw new NotFoundException('фильм не найден');
      }
      await this.cacheManager.set<filmFullDto>(filmFullCacheKey, film);
      return film;
    } catch (error) {
      this._errorThrow(error);
    }
  }

  async findShedule(id: string): Promise<sheduleDto> {
    try {
      const sheduleCacheKey = `shedule:${id}`;
      const cachedShedule =
        await this.cacheManager.get<sheduleDto>(sheduleCacheKey);
      if (cachedShedule) {
        return cachedShedule;
      }
      console.log(await this.sheduleRepository.find());
      console.log(id);
      const shedule = await this.sheduleRepository.findOne({
        where: {
          id,
        },
      });
      if (!shedule) {
        throw new NotFoundException('сеанс не найден');
      }
      await this.cacheManager.set<sheduleDto>(sheduleCacheKey, shedule);
      return shedule;
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

  async updateShedule(id: string, seat: string) {
    try {
      const shedule = await this.findShedule(id);
      shedule.taken.push(seat);
      this.sheduleRepository.save(shedule);
      return shedule;
    } catch (error) {
      this._errorThrow(error);
    }
  }
}
