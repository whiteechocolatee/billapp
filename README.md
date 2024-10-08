# BillApp

Проект BillApp призначений для розподілу рахунків між користувачами. 

## Технології

- **Next.js**: Фреймворк для React, який дозволяє створювати серверний рендеринг та статичні веб-сторінки.
- **Shadcn**: Компонентна бібліотека для створення інтерфейсів.
- **Tanstack Query**: Інструмент для роботи з запитами до API та кешування даних.
- **Tailwind CSS**: Утилітний CSS-фреймворк для швидкої розробки стильних інтерфейсів.

## Налаштування середовища

1. Створіть файл `.env.local` у кореневій директорії проекту, використовуючи шаблон з файлу `.env.example`.
2. Заповніть наступні змінні:

   ```env
   # URL для доступу до Supabase API
   NEXT_PUBLIC_SUPABASE_URL=
   
   # Анонімний ключ для доступу до Supabase API
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   
   # URL бази даних PostgreSQL
   DATABASE_URL=
   ```

## Інструкції по налаштуванню

1. **Клонування репозиторію:**

   ```bash
   git clone https://github.com/whiteechocolatee/billapp.git
   ```

2. **Встановлення залежностей:**

   Перейдіть до директорії проекту та виконайте команду:

   ```bash
   npm install
   ```

3. **Запуск проекту:**

   ```bash
   npm run dev
   ```

   Це запустить сервер розробки на `http://localhost:3000`.

## Інструменти для кодування

- **ESLint**: Лінтер для виявлення проблем у вашому коді.
- **Prettier**: Форматувач коду.
- **Husky**: Інструмент для запуску скриптів перед комітом.
- **lint-staged**: Використовується разом з Husky для перевірки тільки тих файлів, які змінюються перед комітом.

## Внесок

Внесок в проект вітається! Для додавання нових функцій чи виправлення помилок, будь ласка, створіть pull request.