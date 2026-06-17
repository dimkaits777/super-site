import { useEffect, useState } from 'react';
import { SITE } from '../config/site';
import { LogoSVG } from './LogoSVG';
import { Send } from './Icons';

const LINKS = [
  { href: '#hero', label: 'Вхід' },
  { href: '#cake', label: '3D Торт' },
  { href: '#menu', label: 'Меню' },
  { href: '#contacts', label: 'Контакти' },
];

/** Floating translucent navigation rail. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b px-6 py-3 transition-colors duration-500 ${
        scrolled ? 'border-gold/15 bg-white/80 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#hero" className="group flex items-center gap-2.5">
          <LogoSVG className="h-10 w-10" showText={false} />
          <span className="flex flex-col leading-none">
            <span
              className={`font-serif text-sm font-bold uppercase tracking-widest transition-colors ${
                scrolled ? 'text-coco-dark' : 'text-white'
              } group-hover:text-gold`}
            >
              {SITE.brand}
            </span>
            <span className={`mt-0.5 font-mono text-[8px] tracking-wider ${scrolled ? 'text-gold-dark' : 'text-gold-light'}`}>
              {SITE.tagline}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors hover:text-gold ${
                scrolled ? 'text-coco/80' : 'text-white/85'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={SITE.telegramBot}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-gold-dark active:scale-95 sm:text-xs"
        >
          <Send className="h-3 w-3" />
          <span className="hidden sm:inline">Замовити</span>
        </a>
      </div>
    </header>
  );
}
