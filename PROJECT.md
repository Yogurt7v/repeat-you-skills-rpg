# Хроники Разработчика — паспорт проекта

Этот файл — источник правды о проекте. Его читают все агенты, работающие 
с репозиторием. Если что-то здесь противоречит другим инструкциям — 
приоритет у этого файла.

## Что это

**«Хроники Разработчика»** — публичный портфолио-продукт: нарративная 
RPG-платформа для изучения frontend, backend и деплоя. Пользователь проходит 
сюжетные ветки, собирает реальный проект, сражается с «боссами» (квизами), 
получает XP, ачивки и уровни.

Продукт **учебный по сути** и **настоящий по форме**: это не «курс с 
видео», а рабочее приложение с аутентификацией, БД, деплоем, тестами и 
мониторингом. Строится как MVP с последующим расширением.

## Для кого

Открытая публика. Регистрация, личный прогресс, опциональное участие 
в таблице лидеров. Монетизации нет — это портфолио.

## Ключевая механика

### Ветки и главы
Три сюжетные ветки, порядок прохождения — на выбор пользователя. 
Внутри ветки — главы, проходятся последовательно. Главу можно 
перепроходить для повторения.

| Ветка | Технологии |
|---|---|
| **Врата Фронтенда** | App Router, RSC vs Client Components, CSS Modules, Redux Toolkit |
| **Пещеры Данных** | Prisma, PostgreSQL, Server Actions, react-hook-form + zod, Auth.js |
| **Кузница Развёртывания** | Docker, docker-compose, Nginx, GitHub Actions, Sentry, pino, Vitest, Playwright |

### Структура главы
1. **Теория** — текст с объяснением технологии (хранится в БД, редактируется через админку).
2. **Свиток задания** — бриф на главу (MDX).
3. **Карта узлов** — 5–7 микрозадач. Узел закрывается, когда пользователь 
   прикрепляет «трофей» (фрагмент кода / скриншот), подтверждающий выполнение.
4. **Босс-файт** — квиз из 5–7 вопросов. У босса HP, у игрока HP. 
   Неверный ответ бьёт по HP игрока. HP = 0 → поражение, можно отступить 
   и вернуться. Победа → XP + ачивка + «печать» открывает следующую главу.

### Прогресс
- XP начисляется за закрытые узлы и побеждённых боссов.
- Уровни (XP → Level), ачивки, HP в бою.
- Всё сохраняется в БД (Prisma + PostgreSQL).
- Таблица лидеров — только по явному согласию (opt-in).

### Админка
Отдельный раздел для редактирования глав, узлов, вопросов боссов, 
текстов теории. Простые CRUD-страницы, доступ по роли.

## Стек (зафиксирован)

| Слой | Выбор |
|---|---|
| Фреймворк | **Next.js 16, App Router** |
| Язык | **TypeScript, strict mode** |
| Стили | **CSS Modules + vanilla CSS** (без Tailwind, без UI-китов) |
| Клиентское состояние | **Redux Toolkit** |
| Формы и валидация | **react-hook-form + zod** |
| Бэкенд | **Server Actions + Route Handlers** (монолит внутри Next) |
| БД | **PostgreSQL** |
| ORM | **Prisma** |
| Аутентификация | **Auth.js (NextAuth)** — Credentials, GitHub, Google |
| Тесты | **Vitest** (юниты) + **Playwright** (e2e) |
| Мониторинг | **Sentry** + **pino** |
| Контейнеризация | **Docker + docker-compose** |
| Веб-сервер | **Nginx** (reverse proxy, HTTPS) |
| CI/CD | **GitHub Actions** |
| Хостинг | **VPS** (собственный сервер) |

**Не используем:** Tailwind, shadcn, Zustand, tRPC, GraphQL, MongoDB, 
Firebase, Vercel. Если возникает соблазн — обсуждаем отдельно и 
фиксируем решение в этом файле.

## Визуальный стиль

**«Тёмный фолиант»:** пергаментные панели, чернила, золотые/медные 
рамки, засечные заголовки, читаемый гротеск для тела. HP-бар — красный, 
XP-бар — золотой. SVG-рамки в стиле гравюр. Тёмный угольный фон.

Референсы (не копировать, вдохновляться): Aethermoor Dark Metal HUD, 
Royal Fantasy GUI Kit, SkillTreeOSS, EvoEd, StudyHack.

## Архитектура (высокоуровнево)
app/
├── (auth)/ — страницы входа/регистрации
├── (game)/ — карта мира, главы, босс-файты
│ ├── map/
│ ├── [branch]/
│ │ └── [chapter]/
│ │ ├── page.tsx — теория + узлы
│ │ └── boss/
│ └── leaderboard/
├── (admin)/ — CRUD-админка
├── api/ — Route Handlers (только где нужны)
└── layout.tsx

components/ — переиспользуемые UI-компоненты
lib/
├── db/ — Prisma-клиент, запросы
├── auth/ — конфиг Auth.js, хелперы сессии
├── game/ — логика XP, HP, уровней, ачивок
└── validation/ — zod-схемы
actions/ — Server Actions по доменам
prisma/
├── schema.prisma
└── migrations/


**Правила слоёв:**
- Server Actions — единственный путь мутации данных из UI (кроме 
  Route Handlers для вебхуков/интеграций).
- Server Components — по умолчанию. `"use client"` — только там, где 
  реально нужен интерактив (HP-бар в бою, Redux-стор).
- Redux — только для клиентского состояния игры. Серверное состояние 
  не дублируем в Redux.
- Все формы — react-hook-form + zod. Схемы валидации — в `lib/validation/`.
- Все запросы к БД — через `lib/db/`, не напрямую из компонентов.

## Схема данных (черновик, уточняется)

- `User` — id, email, passwordHash, name, image, role, createdAt
- `Account`, `Session`, `VerificationToken` — стандарт Auth.js
- `Branch` — id, slug, title, description, order
- `Chapter` — id, branchId, slug, title, theory (text), scroll (MDX), order
- `Node` — id, chapterId, title, description, order
- `Boss` — id, chapterId, hp, title
- `Question` — id, bossId, text, options (json), correctOption, explanation
- `Progress` — id, userId, chapterId, status, currentNodeId, updatedAt
- `NodeCompletion` — id, progressId, nodeId, trophy (text/url), completedAt
- `BossAttempt` — id, userId, bossId, hpLeft, won, createdAt
- `Achievement` — id, slug, title, description, icon
- `UserAchievement` — userId, achievementId, unlockedAt
- `LeaderboardOptIn` — userId, optedInAt

Финальная схема — в `prisma/schema.prisma`. При изменениях обновлять 
этот раздел.

## Конвенции кода

- TypeScript strict, `noUncheckedIndexedAccess: true`.
- Именование файлов: `kebab-case.tsx` для компонентов, `camelCase.ts` 
  для утилит.
- Один компонент — один файл, стили — `Component.module.css` рядом.
- Server Actions: `actions/<domain>.ts`, экспорт функций в `camelCase`, 
  каждая начинается с `"use server"`.
- Zod-схемы: `lib/validation/<domain>.ts`, экспорт `xxxSchema` и 
  `type XxxInput = z.infer<typeof xxxSchema>`.
- Никаких `any`. Если очень надо — `unknown` + сужение.
- Ошибки — через `Result`-подобный паттерн или throw с типизированными 
  ошибками; не глотать.

## Итерации

- **Итерация 0** — каркас: Next.js 15 + TS strict + CSS Modules, 
  PostgreSQL в Docker, Prisma-схема (User, Branch, Chapter, Progress), 
  Auth.js Credentials, страница «Карта мира» с тремя заблокированными 
  ветками.
- **Итерация 1** — первая глава: теория, карта узлов, трофеи, босс-файт 
  с HP, сохранение прогресса, XP, первая ачивка.
- **Итерация 2** — GitHub + Google providers, публичный профиль, 
  таблица лидеров (opt-in), уровни.
- **Итерация 3** — остальные ветки, админка (CRUD), визуальная полировка.
- **Итерация 4** — деплой: Dockerfile, docker-compose, Nginx, HTTPS, 
  GitHub Actions, Sentry + pino.
- **Итерация 5** — тесты (Vitest + Playwright), полировка.

## Вне скоупа (на потом)

Несколько NPC-менторов, инвентарь/экипировка, мобильная адаптация «до 
идеала», мультиязычность, монетизация. Не трогаем, пока сквозной срез 
не заработает.

## Что читать агенту дальше

- `MENTOR.md` — если ты ментор: как себя вести с учеником.
- `PROJECT_STATE.md` — текущее состояние (ветка, глава, что сделано, 
  что болит, следующий шаг). Обновляется после каждой сессии.
- `BUGS.md` — журнал разобранных багов (симптом → причина → фикс → урок).
