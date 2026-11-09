# Состояние проекта

## Текущая итерация
Итерация 0 — каркас. В процессе.

## Ветка / глава
—

## Сделано
- `package.json` приведён к стеку проекта: Next.js 16.4.5, React 19.3.0, TypeScript strict, Tailwind удалён.
- `tsconfig.json`: `strict: true` (соответствует конвенциям).
- Один коммит `init commit`, ветка `master`.

## Болит
- Нет Docker, PostgreSQL, Prisma, Auth.js.
- Нет страницы «Карта мира» с тремя заблокированными ветками.
- Нет `prisma/schema.prisma`.

## Блокер
Docker не установлен (`command not found: docker`). Нельзя поднять PostgreSQL в контейнере.

## Следующий шаг
Установить Docker Desktop для macOS, проверить `docker --version`, затем поднять PostgreSQL через `docker compose up -d` и создать `prisma/schema.prisma`.
