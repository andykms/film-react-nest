FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

RUN npm i 

COPY . .

RUN npm run build

FROM node:20-alpine AS dist

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

RUN npm i --omit=dev

COPY --from=build /usr/src/app/dist ./dist

COPY ./public ./public

EXPOSE 3000

CMD ["node", "dist/main"]




