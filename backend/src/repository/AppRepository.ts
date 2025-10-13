import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { filmDto, sheduleDto, filmFullDto } from '../films/dto/films.dto';
import IAppRepository from './type';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Shedule } from '../films/entities/shedule.entity';

@Injectable()
export class AppRepository implements IAppRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Shedule) private sheduleRepository: Repository<Shedule>,
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

  async findOne(id: string): Promise<filmFullDto> {
    try {
      const film = await this.filmRepository.findOne({
        where: {
          id,
        },
        relations: {
          shedules: true,
        },
      });
      return film;
    } catch (error) {
      this._errorThrow(error);
    }
  }

  async findShedule(id: string): Promise<sheduleDto> {
    try {
      const shedule = await this.sheduleRepository.findOne({
        where: {
          id,
        },
      });
      if (!shedule) {
        throw new NotFoundException('сеанс не найден');
      }
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
      await this.sheduleRepository.save(shedule);
      return shedule;
    } catch (error) {
      this._errorThrow(error);
    }
  }
}
