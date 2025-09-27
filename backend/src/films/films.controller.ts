import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { filmDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<filmDto[]> {
    return await this.filmsService.getFilms();
  }

  @Get(':id/schedule')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} film`;
  }
}
