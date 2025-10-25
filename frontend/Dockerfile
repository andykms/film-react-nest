FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:20-alpine AS dist

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./

RUN npm i --omit=dev

COPY --from=build /usr/src/app/dist ./dist

CMD ["npm", "run", "dev"]