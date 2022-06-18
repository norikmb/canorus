# Canorus

## About

Canorus は [Node.js](https://nodejs.org/ja/) 環境で動作する [discord.js](https://discord.js.org) を使用した Bot アプリです.  
[Oracle Cloud Infrastructure](https://www.oracle.com/jp/cloud/) に対して [GitHub Actions](https://github.com/features/actions) を用いて自動デプロイしています.  
また, [Docker Compose](https://docs.docker.com/compose/) を利用した環境構築も可能です.

## Installation

Node.js を用いて起動する場合  
**[Node.js](https://nodejs.org/ja/) 16.15.0 or newer is required.**  
**[pnpm](https://pnpm.io/ja/) 7.1.7 or newer is required.**

```sh-session
cd canorus/
pnpm install
pnpm start
```

Docker-compose を用いて起動する場合  
**[Docker](https://docs.docker.com/) 20.10.14 or newer is required.**  
**[Docker Compose](https://docs.docker.com/compose/) 1.29.2 or newer is required.**

```sh-session
cd canorus/
pnpm install
docker-compose up -d
```

## Other Reference

- [SSH for GitHub Actions](https://github.com/appleboy/ssh-action)
- [Emoji Prefix](https://gitmoji.dev/)
