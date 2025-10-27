import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { filmDto } from './dto/films.dto';
import { sheduleDto } from './dto/films.dto';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

const filmsMock: filmDto[] = [
  {
    id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
    rating: 2.9,
    director: 'Итан Райт',
    tags: ['Документальный'],
    image: '/bg1s.jpg',
    cover: '/bg1c.jpg',
    title: 'Архитекторы общества',
    about:
      'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
    description:
      'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
  },
  {
    id: '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
    rating: 9,
    director: 'Харрисон Рид',
    tags: ['Рекомендуемые'],
    image: '/bg3s.jpg',
    cover: '/bg3c.jpg',
    title: 'Недостижимая утопия',
    about:
      'Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.',
    description:
      'Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.',
  },
  {
    id: '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
    rating: 8.9,
    director: 'Лила Васкес',
    tags: ['Рекомендуемые'],
    image: '/bg2s.jpg',
    cover: '/bg2c.jpg',
    title: 'Стражи Гримуара',
    about:
      'Фэнтезийное приключение об истинном значении дружбы, мужества и силы знаний',
    description:
      'Захватывающее фэнтезийное приключение, которое рассказывает о группе героев, которые должны защитить древний магический том от попадания в руки тёмного колдуна. История об истинном значении дружбы, мужества и силы знаний.',
  },
  {
    id: '0354a762-8928-427f-81d7-1656f717f39c',
    rating: 9.5,
    director: 'Оливер Беннет',
    tags: ['Рекомендуемые'],
    image: '/bg4s.jpg',
    cover: '/bg4c.jpg',
    title: 'Парадокс Нексуса',
    about:
      'Фильм об эксперименте по соединению человеческих умов. Исследует вопросы неприкосновенности частной жизни, идентичности и самой природы человеческого сознания',
    description:
      'В фильме исследуются последствия новаторского эксперимента по соединению человеческих умов. По мере развития проекта участники сталкиваются с вопросами неприкосновенности частной жизни, идентичности и самой природы человеческого сознания.',
  },
  {
    id: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
    rating: 8.1,
    director: 'Амелия Хьюз',
    tags: ['Рекомендуемые'],
    image: '/bg6s.jpg',
    cover: '/bg6c.jpg',
    title: 'Сон в летний день',
    about:
      'Фэнтези-фильм о группе друзей попавших в волшебный лес, где время остановилось.',
    description:
      'Причудливый фэнтези-фильм, действие которого происходит в волшебном лесу, где время остановилось. Группа друзей натыкается на это заколдованное царство и поначалу проникается беззаботным духом обитателей, но потом друзьям приходится разойтись. А как встретиться снова, если нет ни времени, ни места встречи?',
  },
];

const sheduleMock: sheduleDto[] = [
  {
    id: '5274c89d-f39c-40f9-bea8-f22a22a50c8a',
    daytime: '2024-06-28T10:00:53+03:00',
    hall: 0,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
  {
    id: '3f7ed030-230c-4b06-bfc7-eeaee7f3f79b',
    daytime: '2024-06-28T14:00:53+03:00',
    hall: 1,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
  {
    id: '8e8c2627-4578-42b1-a59a-9ec4964a03e1',
    daytime: '2024-06-28T16:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
  {
    id: '940e657a-69fa-4f71-a48e-3c064dcb61fd',
    daytime: '2024-06-29T11:00:53+03:00',
    hall: 0,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
  {
    id: 'ffde1149-dbc7-49b2-964d-a8de6a45709c',
    daytime: '2024-06-29T15:00:53+03:00',
    hall: 1,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
  {
    id: '6a0d0a68-2f74-4164-aac5-45e0e07adb86',
    daytime: '2024-06-29T17:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
  {
    id: '9d3d3914-ea59-46a0-80a2-4e320e82956a',
    daytime: '2024-06-30T12:00:53+03:00',
    hall: 0,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
  {
    id: '5c68663d-1a71-401c-9214-e79af571c347',
    daytime: '2024-06-30T16:00:53+03:00',
    hall: 1,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
  {
    id: '2644a72a-6f17-4c61-a405-9c48bb0ea682',
    daytime: '2024-06-30T18:00:53+03:00',
    hall: 2,
    rows: 5,
    seats: 10,
    price: 350,
    taken: [],
  },
];

describe('FilmsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getFilms: jest.fn(() => {
          let timeout;
          return new Promise((res) => {
            timeout = setTimeout(() => {
              res(filmsMock);
            }, 1);
          }).then((films) => {
            clearTimeout(timeout);
            return films;
          });
        }),
        getShedule: jest.fn(() => {
          let timeout;
          return new Promise((res) => {
            timeout = setTimeout(() => {
              res(sheduleMock);
            }, 1);
          }).then((shedule) => {
            clearTimeout(timeout);
            return shedule;
          });
        }),
      })
      .compile();

    app = module.createNestApplication();

    await app.init();
  });

  it('check getFilms', () => {
    return request(app.getHttpServer()).get('/films').expect(200, filmsMock);
  });

  it('check get shedule', () => {
    return request(app.getHttpServer())
      .get('/films/1/schedule')
      .expect(200, sheduleMock);
  });
});
