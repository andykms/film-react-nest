import { Controller, Post, Body } from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { sheduleDto } from '../films/dto/films.dto';
import TResponse from '../types/response';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() order: orderDto): Promise<TResponse<sheduleDto>> {
    return await this.orderService.create(order);
  }
}
