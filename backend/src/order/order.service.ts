import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import IAppRepository from '../repository/type';
import { HttpException } from '@nestjs/common';
import { sheduleDto } from '../films/dto/films.dto';

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

  async create(order: orderDto) {
    const tickets = order.tickets;
    const updTickets: sheduleDto[] = [];
    try {
      await this._isValidTickets(order);
      for (const ticket of tickets) {
        const choosenSeat = `${ticket.row}:${ticket.seat}`;
        const updTicket = await this.appRepository.updateShedule(
          ticket.session,
          choosenSeat,
        );
        updTickets.push(updTicket);
      }
      return {
        items: updTickets,
        total: updTickets.length,
      };
    } catch (error) {
      this._errorThrow(error);
    }
  }
}
