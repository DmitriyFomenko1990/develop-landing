# Лендинг разработки

Посадочная: сайт или продукт от лендинга до сервиса. Next.js.

## Запуск

```powershell
cd D:\dima\commercial-projects
copy .env.example .env.local
npm install
npm run dev
```

Открыть http://localhost:3000

## Форма → Telegram

В `.env.local`:

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Без токена форма откроет черновик в Telegram `@oknemof`.
