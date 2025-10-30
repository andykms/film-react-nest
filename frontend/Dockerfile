FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

COPY . .

RUN npm i

RUN npm run build

CMD ["sh", "-c", "echo 'фронтенд собран' && tail -f /dev/null"]