import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FilmsMongoDBRepository } from '../repository/mongoDB/filmRepository';

@Module({
  imports: [FilmsMongoDBRepository],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
