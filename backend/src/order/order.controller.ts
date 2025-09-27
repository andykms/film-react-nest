import { Controller, Post, Body } from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import { OrderService } from './order.service';
import { filmDto } from '../films/dto/films.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() order: orderDto): Promise<{ items: filmDto[] }> {
    return await this.orderService.create(order);
  }
}
