CREATE DATABASE film_nest WITH OWNER "film_nest_admin"
  ENCODING 'UTF8'
  LC_COLLATE = 'ru_RU.UTF-8'
  LC_CTYPE = 'ru_RU.UTF-8'
  TEMPLATE = template0;

\c film_nest;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table public.Film
(
    id          uuid default uuid_generate_v4() not null
        constraint "PK_697487ada088902377482c970d1"
            primary key,
    rating      double precision                not null,
    director    varchar                         not null,
    tags        text[]                           not null,
    image       varchar                         not null,
    cover       varchar                         not null,
    title       varchar                         not null,
    about       varchar                         not null,
    description varchar                         not null
);

ALTER TABLE public.Film
    OWNER TO film_nest_admin;

create table public.Shedule 
(
    id       uuid default uuid_generate_v4() not null
        constraint "PK_7e33fc2ea755a5765e3564e66dd"
            primary key,
    daytime  varchar                         not null,
    hall     integer                         not null,
    rows     integer                         not null,
    seats    integer                         not null,
    price    double precision                not null,
    taken    text[]                         not null,
    "filmId" uuid
        constraint "FK_1c2f5e637713a429f4854024a76"
            references public.Film
);

ALTER TABLE public.Shedule
    OWNER TO film_nest_admin;

