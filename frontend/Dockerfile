FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

COPY . .

RUN npm i

RUN cp ./.env.example ./.env

CMD ["sh", "-c", "VITE_API_URL=${VITE_API_URL} VITE_CDN_URL=${VITE_CDN_URL} npm run build && cp ./.env.example ./dist/.env && cd ./dist && ls -la && cat .env && echo ${VITE_API_URL} && echo ${VITE_CDN_URL}"]