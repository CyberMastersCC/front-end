# Білдер стадія
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci  # Використовуємо ci замість install для production
COPY . .
RUN npm run build  # Збираємо production-версію

# Фінальна стадія
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Копіюємо тільки необхідні файли
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]  # Використовуємо standalone сервер