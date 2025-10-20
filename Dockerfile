FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm test --silent || true

FROM node:22-alpine AS runtime

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app ./

ENV NODE_ENV=production
ENV PORT=3000

USER node

EXPOSE 3000
CMD ["node", "server.js"]
