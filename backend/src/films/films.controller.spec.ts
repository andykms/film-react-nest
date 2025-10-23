import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { filmDto } from './dto/films.dto';
import { sheduleDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getFilms: jest.fn(),
        getShedule: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('check getFilms', () => {});
});
