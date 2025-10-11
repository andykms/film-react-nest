import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import IAppRepository from '../repository/type';
import { HttpException } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @Inject('FilmsRepository') private appRepository: IAppRepository,
  ) {}

  private async _isValidTickets(order: orderDto): Promise<boolean> {
    const tickets = order.tickets;
    for (const ticket of tickets) {
      try {
        const film = await this.appRepository.findOne(ticket.film);
        const shedule = await this.appRepository.findShedule(ticket.session);
        if (!film.shedules.some((item) => item.id == shedule.id)) {
          throw new BadRequestException('сессия фильма не найдена');
        }
        const seat = this.seatString(ticket.row, ticket.seat);
        if (shedule.taken.includes(seat)) {
          throw new BadRequestException('место уже занято');
        }
      } catch (error) {
        this._errorThrow(error);
      }
    }

    return true;
  }

  private _errorThrow(error?: unknown) {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new InternalServerErrorException();
  }

  private seatString(row: string | number, seat: string | number) {
    return `${row}:${seat}`;
  }

  async create(order: orderDto) {
    const tickets = order.tickets;
    try {
      await this._isValidTickets(order);
      for (const ticket of tickets) {
        const choosenSeat = this.seatString(ticket.row, ticket.seat);
        await this.appRepository.updateShedule(ticket.session, choosenSeat);
      }
      return {
        items: tickets,
        total: tickets.length,
      };
    } catch (error) {
      this._errorThrow(error);
    }
  }
}
