FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

COPY . .

RUN npm i


CMD ["npm", "run", "build", "&&", "cp", ".env.example", "dist/.env"]