FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

COPY . .

RUN npm i

RUN cp ./.env.example ./dist

RUN mv ./dist/.env.example ./dist/.env

CMD ["npm", "run", "build"]