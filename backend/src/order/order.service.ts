import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import FilmsRepository from '../repository/type';

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
          return hall.id === ticket.session;
        });

        if (!choosenHall) {
          console.log('АШИБКААААА');
          throw new BadRequestException('сеанс фильма не найден');
        }

        const choosenSeat = `${ticket.row}:${ticket.seat}`;

        if (choosenHall.taken.some((seat) => seat === choosenSeat)) {
          console.log('АШИБКААААА');
          throw new BadRequestException('место уже занято');
        }

        addedSeatsStack.push({
          filmId: ticket.film,
          scheduleIndex,
          seat: choosenSeat,
        });
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new InternalServerErrorException(error.message);
        }
        throw new InternalServerErrorException();
      }
    }

    return addedSeatsStack;
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
        throw new InternalServerErrorException();
      }
    });
    return { items: updatedFilms };
  }
}
