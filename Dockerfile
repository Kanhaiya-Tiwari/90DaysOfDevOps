# Stage 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app /app

CMD ["node", "app.js"]
