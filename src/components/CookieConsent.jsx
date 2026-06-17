import { useEffect, useState } from 'react';
import { ui } from '../store/useUI';
import { Cookie, Check, X, Shield } from './Icons';

const KEY = 'kokos_cookie_consent';

/**
 * Cookie consent banner (Ukrainian-law compliant): analytics cookies are only
 * stored after explicit consent. Choice is persisted in localStorage.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      /* storage unavailable */
    }
    if (!saved) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (value) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 z-50 rounded-2xl border border-gold/40 bg-white/95 p-5 shadow-xl backdrop-blur-xl animate-[cookieIn_0.4s_ease-out] md:left-auto md:right-6 md:max-w-md">
      <style>{`@keyframes cookieIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}`}</style>

      <button
        onClick={() => setVisible(false)}
        aria-label="Закрити"
        className="absolute right-3 top-3 text-coco/40 transition-colors hover:text-coco"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-4">
        <span className="shrink-0 rounded-xl border border-gold/20 bg-cream-2 p-2.5 text-gold-dark">
          <Cookie className="h-6 w-6" />
        </span>
        <div className="space-y-2">
          <h4 className="flex items-center gap-1.5 font-serif text-sm font-semibold text-coco-dark">
            Файли cookie та захист даних
            <Shield className="h-3.5 w-3.5 text-gold" />
          </h4>
          <p className="text-xs leading-relaxed text-coco/70">
            Ми використовуємо технічні cookie для роботи сайту, а аналітичні — лише за вашої згоди.{' '}
            <button
              onClick={() => ui.openModal('cookie')}
              className="font-medium text-gold-dark underline transition-colors hover:text-gold"
            >
              Політика cookie
            </button>
            .
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2.5">
        <button
          onClick={() => decide('declined')}
          className="rounded-lg px-3.5 py-2 text-xs text-coco/60 transition-colors hover:bg-cream-2 hover:text-coco-dark"
        >
          Відхилити
        </button>
        <button
          onClick={() => decide('accepted')}
          className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-gold-dark active:scale-95"
        >
          <Check className="h-3.5 w-3.5" />
          Прийняти все
        </button>
      </div>
    </div>
  );
}
