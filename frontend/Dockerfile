FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:20-alpine AS dist

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package-lock.json ./

RUN npm ci --omit=dev

COPY --from=build /usr/src/dist ./dist

CMD ["node", "dist/main"]