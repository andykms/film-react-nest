import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import FilmsRepository from '../repository/type';
import { HttpException } from '@nestjs/common';

type takenInfo = {
  filmId: string;
  scheduleIndex: number;
  seat: string;
};

@Injectable()
export class OrderService {
  constructor(
    @Inject('FilmsRepository') private filmsRepository: FilmsRepository,
  ) {}

  private async _checkIsValidAndGetTaken(
    order: orderDto,
  ): Promise<takenInfo[]> {
    const tickets = order.tickets;
    const addedSeatsStack: takenInfo[] = [];
    for (const ticket of tickets) {
      try {
        const filmDto = await this.filmsRepository.findOne(ticket.film);

        let scheduleIndex = 0;
        const choosenHall = filmDto.schedule.find((hall, index) => {
          scheduleIndex = index;
          return hall.id === ticket.session;
        });

        if (!choosenHall) {
          throw new BadRequestException('сеанс фильма не найден');
        }

        const choosenSeat = `${ticket.row}:${ticket.seat}`;

        if (choosenHall.taken.some((seat) => seat === choosenSeat)) {
          throw new BadRequestException('место уже занято');
        }

        addedSeatsStack.push({
          filmId: ticket.film,
          scheduleIndex,
          seat: choosenSeat,
        });
      } catch (error) {
        this._errorThrow(error);
      }
    }

    return addedSeatsStack;
  }

  private _errorThrow(error?: unknown) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException();
  }

  async create(order: orderDto) {
    const taken = await this._checkIsValidAndGetTaken(order);
    const updatedFilms = [];
    taken.forEach(async ({ filmId, scheduleIndex, seat }) => {
      try {
        const updatedFilm = await this.filmsRepository.findByIdAndUpdateTaken(
          filmId,
          scheduleIndex,
          seat,
        );
        updatedFilms.push(updatedFilm);
      } catch (error) {
        this._errorThrow(error);
      }
    });
    return { items: updatedFilms };
  }
}
