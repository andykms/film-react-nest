FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

COPY . .

RUN npm i

RUN mkdir ./dist

RUN cp ./.env.example ./dist/.env

CMD ["npm", "run", "build"]