import {
  BadRequestException,
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
  constructor(private filmsRepository: FilmsRepository) {}

  private async _checkIsValidAndGetTaken(
    order: orderDto,
  ): Promise<takenInfo[]> {
    const tickets = order.items;
    let isValid = true;
    let total = 0;
    const addedSeatsStack: takenInfo[] = [];
    tickets.forEach(async (ticket) => {
      try {
        const filmDto = await this.filmsRepository.findOne(ticket.film);

        let scheduleIndex = 0;
        const choosenHall = filmDto.schedule.find((hall, index) => {
          scheduleIndex = index;
          return hall.daytime === ticket.daytime;
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

        total += choosenHall.price;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new InternalServerErrorException(error.message);
        }
        throw new InternalServerErrorException();
      }
    });

    if (total !== order.total) {
      isValid = false;
    }

    return addedSeatsStack;
  }

  async create(order: orderDto) {
    const taken = await this._checkIsValidAndGetTaken(order);
    taken.forEach(async ({ filmId, scheduleIndex, seat }) => {
      try {
        await this.filmsRepository.findByIdAndUpdateTaken(
          filmId,
          scheduleIndex,
          seat,
        );
      } catch (error) {
        throw new InternalServerErrorException();
      }
    });
    return order;
  }
}
