FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ../frotend/package-lock.json ./
COPY .../frontend/package.json ./

RUN npm i

COPY ../frontend .

RUN npm run build

FROM nginx

COPY --from=build ./usr/src/app/dist ./frontend

COPY ./absolute.cinema.nomorepartiessbs.ru /etc/nginx/conf.d/

COPY ./api.absolute.cinema.nomorepartiessbs.ru /etc/nginx/conf.d/

CMD ["nginx", "-g", "daemon off;"]



