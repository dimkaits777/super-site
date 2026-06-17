import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SITE } from '../config/site';
import { LogoSVG } from './LogoSVG';
import { Send, Coffee, ChevronDown, Sparkle, MapPin } from './Icons';

/**
 * СЦЕНА 1 — HTML-шар над 3D-входом: логотип, заголовок «Кондитерська Кокос»,
 * підзаголовок і кнопка «Дивитись меню» (стрілка вниз).
 */
export function HeroCopy() {
  const root = useRef(null);
  const [cueHidden, setCueHidden] = useState(false);

  // Scroll indicator disappears on the first wheel / scroll / touch.
  useEffect(() => {
    const hide = () => setCueHidden(true);
    const opts = { passive: true, once: true };
    window.addEventListener('wheel', hide, opts);
    window.addEventListener('touchmove', hide, opts);
    window.addEventListener('scroll', hide, opts);
    return () => {
      window.removeEventListener('wheel', hide);
      window.removeEventListener('touchmove', hide);
      window.removeEventListener('scroll', hide);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-anim', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.13,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.from('.hero-logo', { scale: 0.85, opacity: 0, duration: 1.1, ease: 'back.out(1.5)' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-[110vh] flex-col items-center justify-center px-6 pb-24 pt-28 text-center"
    >
      {/* soft vignette only behind the text for legibility over the 3D */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />

      <div className="relative z-10 flex flex-col items-center">
        <div className="hero-logo w-40 drop-shadow-[0_0_25px_rgba(194,157,90,0.5)] sm:w-52 lg:w-64">
          <LogoSVG className="h-full w-full" showText isDarkBg />
        </div>

        <div className="hero-anim mt-6 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-1.5 backdrop-blur-md">
          <Sparkle className="h-3.5 w-3.5 text-gold" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gold-light">
            Преміум кондитерська у {SITE.city}
          </span>
        </div>

        <h1 className="hero-anim mt-6 max-w-3xl font-serif text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Кондитерська <span className="text-gold underline decoration-gold/40 decoration-wavy">«Кокос»</span>
        </h1>

        <p className="hero-anim mt-5 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
          Спешелті-кава власного обсмаження, авторські десерти та крафтові мусові торти
          за європейськими стандартами — у затишній атмосфері серця {SITE.city}а.
        </p>

        <div className="hero-anim mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#menu"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gold px-7 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_4px_24px_rgba(194,157,90,0.4)] transition-all hover:bg-gold-dark active:scale-95"
          >
            <Coffee className="h-4 w-4" />
            Дивитись меню
            <ChevronDown className="h-4 w-4" />
          </a>
          <a
            href={SITE.telegramBot}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all hover:border-gold hover:bg-white/10"
          >
            <Send className="h-4 w-4 text-gold" />
            Замовити в Telegram
          </a>
        </div>
      </div>

      {/* bottom address + scroll cue */}
      <div className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-widest text-gold-light">
          <MapPin className="h-4 w-4 text-gold" />
          {SITE.addressShort}
        </div>
        <div
          className={`hidden flex-col items-center transition-opacity duration-500 sm:flex ${
            cueHidden ? 'opacity-0' : 'animate-bounce opacity-100'
          }`}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">Гортайте вниз</span>
          <ChevronDown className="h-4 w-4 text-gold" />
        </div>
      </div>
    </section>
  );
}
