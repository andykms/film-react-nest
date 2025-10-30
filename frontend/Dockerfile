FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

RUN npm i


COPY . .

RUN npm run build

CMD ["sh", "-c", "echo 'фронтенд собран' && tail -f /dev/null"]