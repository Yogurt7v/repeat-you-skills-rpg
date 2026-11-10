# Состояние проекта

## Текущая итерация
Итерация 1 — первая глава. В процессе.

## Ветка / глава
Фронтенд / Введение (примерная первая глава)

## Сделано (Итерация 0 — завершена)
- `package.json`: Next.js 16.4.5, React 19.3, TS strict, без Tailwind
- Docker + PostgreSQL контейнер (запущен)
- Prisma схема: User, Branch, Chapter, Progress
- Prisma Client v7.10.1 сгенерирован
- Auth.js + Credentials + PrismaAdapter + JWT + bcrypt + Zod
- Страница «Карта мира» (`/map`) с 3 заблокированными ветками
- Server Components по умолчанию, Client Components только где нужен интерактив

## Болит (Итерация 1 — в процессе)
- Prisma-схема не расширена для Итерации 1 (нужны Node, Boss, Question, NodeCompletion, BossAttempt, Achievement, UserAchievement, LeaderboardOptIn)
- Нет Server Actions для получения главы/узлов
- Нет страницы главы (`app/(game)/[branch]/[chapter]/page.tsx`)
- Нет логики прогресса (XP, узлы, трофеи, босс, XP, ачивки)

## Блокер
Нет

## Следующий шаг
Расширить `prisma/schema.prisma` для Итерации 1 (добавить Node, Boss, Question, NodeCompletion, BossAttempt, Achievement, UserAchievement, LeaderboardOptIn). Выполнить `npx prisma generate`.