/**
 * Central site configuration.
 * Sensitive / deployment-specific values come from Vite env vars (see
 * `.env.example`). All values fall back to the real café data so the site
 * is never broken if an env var is missing.
 */

const env = import.meta.env;

export const SITE = {
  brand: 'Кокос',
  tagline: "Кав'ярня-кондитерська",
  city: 'Житомир',
  established: 2024,

  // Primary call-to-action: Telegram ordering bot (env-driven).
  telegramBot: env.VITE_TELEGRAM_BOT_URL || 'https://t.me/ai_cocos_bot',

  address: "м. Житомир, вул. Велика Бердичівська, 49а",
  addressShort: "вул. В. Бердичівська, 49а",

  phoneDisplay: '+38 (073) 621 16 00',
  phoneHref: 'tel:+380736211600',

  contactEmail: env.VITE_CONTACT_EMAIL || 'info@kokos.cafe',

  hours: [
    { days: 'Пн – Пт', time: '08:00 — 21:00' },
    { days: 'Сб – Нд', time: '09:00 — 21:00' },
  ],

  socials: {
    instagram: env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/coffe_cocoss',
    facebook: env.VITE_FACEBOOK_URL || 'https://www.facebook.com/share/18zfsAgQLi/',
    telegram: env.VITE_TELEGRAM_BOT_URL || 'https://t.me/ai_cocos_bot',
  },

  // Legal entity behind the café (used in the legal documents).
  legalEntity: 'ФОП (фізична особа-підприємець), зареєстрований згідно із законодавством України',
};
