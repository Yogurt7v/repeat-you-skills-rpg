# Состояние проекта

## Текущая итерация
Итерация 0 — каркас. В процессе.

## Ветка / глава
—

## Сделано
- `package.json` приведён к стеку проекта: Next.js 16.4.5, React 19.3.0, TypeScript strict, Tailwind удалён.
- `tsconfig.json`: `strict: true`.
- Docker установлен (29.9.3).
- `docker-compose.yml` создан и прошёл валидацию (`docker compose config` ✔).
- Контейнер PostgreSQL поднят и остановлен (`docker compose down`).

## Болит
- Нет `prisma/schema.prisma`.
- Нет `.env` с `DATABASE_URL`.
- Нет Auth.js Credentials.
- Нет страницы «Карта мира» с тремя заблокированными ветками.

## Блокер
Устранён (Docker установлен).

## Следующий шаг
Поднять контейнер: `docker compose up -d`. Создать `.env` с `DATABASE_URL`. Создать `prisma/schema.prisma` с моделями `User`, `Branch`, `Chapter`, `Progress`. Запустить `npx prisma generate`.

(Далее — Auth.js Credentials и страница «Карта мира».)
