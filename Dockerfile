FROM node:lts-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY . .
RUN pnpm install && pnpm build


FROM node:lts-alpine

WORKDIR /app
COPY package.json .
COPY --from=builder /app/build .

RUN npm install --production

CMD [ "node", "/app/index.js" ]