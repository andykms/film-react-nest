import { Inject, Injectable } from '@nestjs/common';
import FilmsRepository from '../repository/type';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FilmsRepository') private filmRepository: FilmsRepository,
  ) {}

  async getFilms() {
    return { items: await this.filmRepository.findAll() };
  }

  async getFilm(id: string) {
    return { items: (await this.filmRepository.findOne(id)).schedule };
  }
}
