import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE } from '../config/site';
import { Send, Sparkle } from './Icons';

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  '100% натуральне кокосове молоко та стружка першого віджиму',
  'Ніжний крем-чіз без штучних підсолоджувачів',
  'Декоративна корона ручної роботи з білого шоколаду',
];

/** СЦЕНА 2 — HTML-шар: опис фірмового торта над 3D-сценою. */
export function CakeCopy() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cake-anim', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="cake" ref={root} className="relative flex min-h-[170vh] items-center px-6 sm:px-12 lg:px-20">
      <div className="relative z-10 max-w-md space-y-6 rounded-3xl border border-white/10 bg-ink/35 p-7 backdrop-blur-sm sm:p-9">
        <div className="cake-anim inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1">
          <Sparkle className="h-3.5 w-3.5 text-gold" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gold-light">
            Шедевр кондитерської «Кокос»
          </span>
        </div>

        <h2 className="cake-anim font-serif text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
          Наш фірмовий <br />
          <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">
            торт «Кокос»
          </span>
        </h2>

        <div className="cake-anim h-[2px] w-16 bg-gradient-to-r from-gold to-transparent" />

        <p className="cake-anim text-sm leading-relaxed text-white/75">
          Оксамитовий смак головного десерту кафе: заварний крем на органічному кокосовому молоці,
          вологі бісквітні коржі та хрустка біла глазур з преміальною стружкою. Прокрутіть — і торт
          зʼявиться із золотих іскор.
        </p>

        <ul className="cake-anim space-y-3 font-mono text-[11px] tracking-wide text-gold-light/90">
          {POINTS.map((p) => (
            <li key={p} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              {p}
            </li>
          ))}
        </ul>

        <div className="cake-anim flex flex-wrap items-center gap-4 pt-1">
          <a
            href={SITE.telegramBot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-light px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg transition-all hover:from-gold-light hover:to-gold active:scale-95"
          >
            <Send className="h-4 w-4" />
            Замовити цілий торт
          </a>
          <span className="font-mono text-[10px] text-white/55">Доступний від 1 кг</span>
        </div>
      </div>
    </section>
  );
}
