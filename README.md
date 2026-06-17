# Кондитерська «Кокос» 🥥

Імерсивний комерційний сайт кав'ярні-кондитерської **«Кокос»** (Житомир) — повністю
пересобраний на професійному стеку з 3D-сценами, що керуються скролом, та повною
юридичною відповідністю законодавству України.

## Стек

- **Vite** + **React 19**
- **React Three Fiber** + **drei** (3D) на **Three.js**
- **GSAP** (анімації появи блоків)
- **Tailwind CSS v4** (дизайн-токени бренду)

## Сцени

| # | Компонент | Опис |
|---|-----------|------|
| 1 | `EntranceScene.jsx` | Вивіска і вхід: 3 шари паралаксу (інтер'єр → барна стійка → вивіска), що уїжджають угору за `scroll.offset`. |
| 2 | `MagicCake.jsx` | Торт «Кокос» зʼявляється з золотих `<Sparkles>` на `scroll.offset` 0.4–0.7 і повільно обертається; поряд — чашка з анімованою парою. |
| 3 | `MenuGrid.jsx` | Вітрина-меню 2×3 (3 десерти + 3 кави), у кожній картці — міні-3D-модель, що обертається; кнопка «Замовити» веде в Telegram. |
| 4 | `Footer.jsx` + `PrivacyPolicy.jsx` / `TermsOfService.jsx` / `CookieConsent.jsx` | Контакти, соцмережі та юридичний шар. |

Архітектура рендеру: фіксований 3D-canvas як «живий» задник + звичайний скрол DOM
поверх. Нормалізований `scroll.offset` (0→1) обчислюється над імерсивною зоною
(`src/store/scroll.js`) і читається сценами всередині `useFrame`.

## Локальна розробка

```bash
npm install
cp .env.example .env      # за потреби відредагуйте значення
npm run dev               # http://localhost:5173
```

## Збірка

```bash
npm run build             # prebuild згенерує 3D-модель, далі vite build → dist/
npm run preview           # локальний перегляд продакшн-збірки
npm run lint              # ESLint
```

## Безпека

- **HTTP-заголовки** (`vercel.json` / `netlify.toml`): `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Strict-Transport-Security`, `Permissions-Policy`.
- **Сувора CSP**: `script-src` лише `'self'` та `https://cdn.jsdelivr.net`;
  `frame-ancestors 'none'`; `object-src 'none'`.
- **Змінні оточення** — у `.env` (див. `.env.example`); до клієнта потрапляють лише `VITE_*`.
  Посилання на Telegram-бот береться з `VITE_TELEGRAM_BOT_URL`.
- **3D-моделі** у `public/models/` мають **непрозорі хеш-імена** (без описових назв на кшталт
  `coconut_cake.glb`). Шлях підставляється з `src/config/models.js` (автогенерується скриптом
  `scripts/generate-models.mjs`). Якщо модель відсутня — компонент плавно відкочується на
  процедурний примітив.

## Деплой

Перед деплоєм заголовки вже описані у конфігах репозиторію.

### Vercel

```bash
npm i -g vercel
vercel            # прев'ю-деплой
vercel --prod     # продакшн
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --build            # чернетковий деплой
netlify deploy --build --prod     # продакшн
```

> Обидві платформи запускають `npm run build`, який через `prebuild` регенерує 3D-модель.
