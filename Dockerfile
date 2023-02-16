FROM node:lts-slim AS builder

WORKDIR /app
RUN apt update \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

RUN mkdir src/
COPY src/ src/
COPY package.json pnpm-lock.yaml .

RUN pnpm i

USER node
