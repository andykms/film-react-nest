import { Inject, Injectable } from '@nestjs/common';
import FilmsRepository from '../repository/type';

@Injectable()
export class FilmsService {
  constructor(private filmRepository: FilmsRepository) {}

  async getFilms() {
    return await this.filmRepository.findAll();
  }

  async getFilm(id: string) {
    return await this.filmRepository.findOne(id);
  }
}
