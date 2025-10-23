import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderDto } from './dto/order.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

const correctOrderMock: orderDto = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 1,
      seat: 3,
      price: 350,
    },
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 2,
      seat: 3,
      price: 350,
    },
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 3,
      seat: 3,
      price: 350,
    },
  ],
};

const incorrectEmail = {
  email: 'sobaka@sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 1,
      seat: 3,
      price: 350,
    },
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 2,
      seat: 3,
      price: 350,
    },
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 3,
      seat: 3,
      price: 350,
    },
  ],
};

const incorrectPhone = {
  email: 'sobaka@sobaka.sobaka',
  phone: null,
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 1,
      seat: 3,
      price: 350,
    },
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 2,
      seat: 3,
      price: 350,
    },
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 3,
      seat: 3,
      price: 350,
    },
  ],
};

const incorrectPhoneFormat = {
  email: 'sobaka@sobaka.sobaka',
  phone: '43595349999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const otherFormatPhone1 = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+7-999-999-99-99',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const otherFormatPhone2 = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+7-(999)-999-99-99',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutEmail = {
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutPhone = {
  email: 'sobaka@sobaka.sobaka',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutTickets = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
};

const filmAsNumber = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: 23423,
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const filmAsNull = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: null,
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const filmAsUndefined = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: undefined,
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const filmAsInfinity = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: Infinity,
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const filmAsNaN = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: NaN,
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutFilm = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutSession = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const incorrectSession = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: null,
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutDaytime = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const incorrectDaytime = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: 3289423,
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const otherFormatDaytime = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutDay = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const incorrectDay = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: Infinity,
      time: '16:00',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutTime = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const incorrectTime = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: null,
      seat: 3,
      row: 1,
      price: 350,
    },
  ],
};

const withoutSeat = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      row: 1,
      price: 350,
    },
  ],
};

const incorrectSeat = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: undefined,
      row: 1,
      price: 350,
    },
  ],
};

const seatAsNaN = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: NaN,
      row: 1,
      price: 350,
    },
  ],
};

const seatAsInfinity = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: Infinity,
      row: 1,
      price: 350,
    },
  ],
};

const seatAsNull = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: null,
      row: 1,
      price: 350,
    },
  ],
};

const withoutRow = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      price: 350,
    },
  ],
};

const incorrectRow = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: undefined,
      price: 350,
    },
  ],
};

const rowAsNaN = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: NaN,
      price: 350,
    },
  ],
};

const rowAsInfinity = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: Infinity,
      price: 350,
    },
  ],
};

const rowAsNull = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: null,
      price: 350,
    },
  ],
};

const withoutPrice = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
    },
  ],
};

const incorrectPrice = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: undefined,
    },
  ],
};

const priceAsNaN = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: NaN,
    },
  ],
};

const priceAsInfinity = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: Infinity,
    },
  ],
};

const priceAsNull = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [
    {
      film: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
      session: '89ee32f3-8164-40a6-b237-f4d492450250',
      daytime: '2024-06-28T16:00:53+03:00',
      day: '28 июня',
      time: '16:00',
      seat: 3,
      row: 1,
      price: null,
    },
  ],
};

const emptyTickets = {
  email: 'sobaka@sobaka.sobaka',
  phone: '+79999999999',
  tickets: [],
};

describe('OrderController', () => {
  let controller: OrderController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        create: jest.fn(() => {
          let timeout;
          return new Promise((res, rej) => {
            timeout = setTimeout(() => {
              res(correctOrderMock);
            }, 1);
          }).then((order) => {
            clearTimeout(timeout);
            return order;
          });
        }),
        _isValidTickets: jest.fn(),
        _errorThrow: jest.fn(),
        seatString: jest.fn(),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('check post correct order', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(correctOrderMock)
      .expect(201, correctOrderMock);
  });

  it('check post with incorrect email', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectEmail)
      .expect(400);
  });
  it('check without email', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutEmail)
      .expect(400);
  });
  it('check incorrect phone', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectPhone)
      .expect(400);
  });

  it('check incorrect phone format', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectPhoneFormat)
      .expect(400);
  });

  it('check other format phone 1', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(otherFormatPhone1)
      .expect(201);
  });

  it('check other format phone 2', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(otherFormatPhone2)
      .expect(201);
  });

  it('check without phone', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutPhone)
      .expect(400);
  });

  it('check without tickets', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutTickets)
      .expect(400);
  });

  it('check send ticket with film as number', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(filmAsNumber)
      .expect(400);
  });

  it('check send ticket with film as null', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(filmAsNull)
      .expect(400);
  });

  it('check send ticket with film as undefined', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(filmAsUndefined)
      .expect(400);
  });

  it('check send ticket with film as Infinity', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(filmAsInfinity)
      .expect(400);
  });

  it('check send ticket with film as NaN', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(filmAsNaN)
      .expect(400);
  });

  it('check send ticket without film', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutFilm)
      .expect(400);
  });

  it('check send ticket without session', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutSession)
      .expect(400);
  });

  it('check send with incorrect type of session', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectSession)
      .expect(400);
  });

  it('check send ticket without daytime', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutDaytime)
      .expect(400);
  });

  it('check send ticket with incorrect type of daytime', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectDaytime)
      .expect(400);
  });

  it('check send ticket with other daytime-format of daytime', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(otherFormatDaytime)
      .expect(400);
  });

  it('check send ticket without day', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutDay)
      .expect(400);
  });

  it('check send ticket with incorrect type of Day', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectDay)
      .expect(400);
  });

  it('check send ticket without time', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutTime)
      .expect(400);
  });

  it('check send ticket with incorrect type of time', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectTime)
      .expect(400);
  });

  it('check send ticket without seat', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutSeat)
      .expect(400);
  });

  it('check send ticket with incorrect type of seat', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectSeat)
      .expect(400);
  });

  it('check send ticket with seat as NaN', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(seatAsNaN)
      .expect(400);
  });

  it('check send ticket with seat as Infinity', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(seatAsInfinity)
      .expect(400);
  });

  it('check send ticket with seat as null', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(seatAsNull)
      .expect(400);
  });

  it('check send ticket without row', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutRow)
      .expect(400);
  });

  it('check send ticket with incorrect type of row', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectRow)
      .expect(400);
  });

  it('check send ticket with row as NaN', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(rowAsNaN)
      .expect(400);
  });

  it('check send ticket with row as Infinity', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(rowAsInfinity)
      .expect(400);
  });

  it('check send ticket with row as null', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(rowAsNull)
      .expect(400);
  });

  it('check send ticket without price', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(withoutPrice)
      .expect(400);
  });

  it('check send ticket with incorrect type of price', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(incorrectPrice)
      .expect(400);
  });

  it('check send ticket with price as NaN', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(priceAsNaN)
      .expect(400);
  });

  it('check send ticket with price as Infinity', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(priceAsInfinity)
      .expect(400);
  });

  it('check send ticket with price as null', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(priceAsNull)
      .expect(400);
  });

  it('check send empty ticket array', () => {
    return request(app.getHttpServer())
      .post('/order')
      .send(emptyTickets)
      .expect(400);
  });
});
