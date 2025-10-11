import { Controller, Post, Body } from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import { orderFilmDto } from './dto/order.dto';
import { OrderService } from './order.service';
import TResponse from '../types/response';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() order: orderDto): Promise<TResponse<orderFilmDto>> {
    return await this.orderService.create(order);
  }
}
