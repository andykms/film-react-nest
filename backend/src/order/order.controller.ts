import { Controller, Post, Body } from '@nestjs/common';
import { orderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async create(@Body() order: orderDto) {
    return await this.orderService.create(order);
  }
}
