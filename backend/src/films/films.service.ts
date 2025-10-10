import { Inject, Injectable } from '@nestjs/common';
import IFilmsRepository from '../repository/type';
import TResponse from '../types/response';
import { filmDto, sheduleDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FilmsRepository') private filmRepository: IFilmsRepository,
  ) {}

  async getFilms(): Promise<TResponse<filmDto>> {
    const films = await this.filmRepository.findAll();
    return {
      items: films,
      total: films.length,
    };
  }

  async getShedule(id: string): Promise<TResponse<sheduleDto>> {
    const film = await this.filmRepository.findOne(id);
    const shedules = film.shedules;
    return {
      items: shedules,
      total: shedules.length,
    };
  }
}
