import { SITE } from '../config/site';
import { ui } from '../store/useUI';
import { LogoSVG } from './LogoSVG';
import { MapPin, Phone, Clock, Instagram, Facebook, Send, Lock, Shield, FileText } from './Icons';

/**
 * СЦЕНА 4 — «Футер і юридичний шар».
 * Address, contacts, schedule, socials and triggers for the legal documents.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="relative z-10 border-t border-gold/25 bg-cream-2 px-6 pb-8 pt-16 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <LogoSVG className="h-14 w-14" showText={false} />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-extrabold uppercase tracking-widest text-coco-dark">
                  {SITE.brand}
                </span>
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-wider text-gold-dark">
                  {SITE.tagline}
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-coco/70">
              Імерсивний простір смаку у Житомирі: спешелті-кава власного обсмаження та авторські торти
              за класичними європейськими рецептами.
            </p>
          </div>

          {/* location */}
          <div className="space-y-4 text-xs">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-dark">Де нас знайти</h4>
            <ul className="space-y-3 font-medium text-coco/90">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={SITE.phoneHref} className="font-mono transition-colors hover:text-gold">
                  {SITE.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          {/* hours */}
          <div className="space-y-4 text-xs">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-dark">Графік роботи</h4>
            <ul className="space-y-3 font-mono text-coco/90">
              {SITE.hours.map((h) => (
                <li key={h.days} className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    <span className="mr-1.5 font-semibold text-gold-dark">{h.days}:</span>
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* socials */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-dark">Ми в соцмережах</h4>
            <p className="text-[11px] leading-relaxed text-coco/60">
              Нові торти, сезонні напої та затишні моменти — у нашому профілі.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: SITE.socials.instagram, Icon: Instagram, label: 'Instagram' },
                { href: SITE.socials.telegram, Icon: Send, label: 'Telegram' },
                { href: SITE.socials.facebook, Icon: Facebook, label: 'Facebook' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-xl border border-gold/25 bg-white p-2.5 text-gold-dark shadow-sm transition-all hover:bg-gold hover:text-white active:scale-95"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-gold/20" />

        {/* legal row */}
        <div className="flex flex-col items-center justify-between gap-6 font-mono text-[10.5px] text-coco/55 lg:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button type="button" onClick={() => ui.openModal('privacy')} className="flex items-center gap-1.5 transition-colors hover:text-gold-dark">
              <Lock className="h-3.5 w-3.5" />
              Політика конфіденційності
            </button>
            <button type="button" onClick={() => ui.openModal('terms')} className="flex items-center gap-1.5 transition-colors hover:text-gold-dark">
              <Shield className="h-3.5 w-3.5" />
              Публічна оферта
            </button>
            <button type="button" onClick={() => ui.openModal('cookie')} className="flex items-center gap-1.5 transition-colors hover:text-gold-dark">
              <FileText className="h-3.5 w-3.5" />
              Файли cookie
            </button>
          </div>
          <p className="text-center text-coco/45 lg:text-right">
            © {year} Кав'ярня-кондитерська «{SITE.brand}». Усі права захищено.
          </p>
        </div>
      </div>
    </footer>
  );
}
