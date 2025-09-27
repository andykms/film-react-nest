import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { filmDto, scheduleDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<{ items: filmDto[] }> {
    return await this.filmsService.getFilms();
  }

  @Get(':id/schedule')
  async findOne(@Param('id') id: string): Promise<{ items: scheduleDto[] }> {
    return await this.filmsService.getFilm(id);
  }
}
