import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MENU } from '../data/menu';
import { SITE } from '../config/site';
import { MODELS } from '../config/models';
import { MiniModel } from './MiniModel';
import { Send, ArrowUpRight, Sparkle } from './Icons';

gsap.registerPlugin(ScrollTrigger);

/**
 * СЦЕНА 3 — «Меню-витрина».
 * A 2×3 grid (3 desserts + 3 coffee). Each card holds a mini 3D canvas with a
 * rotating model; the order button links to the Telegram bot. Cards reveal on
 * scroll via GSAP ScrollTrigger.
 */
export function MenuGrid() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.menu-head', {
        y: 36,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from('.menu-card', {
        y: 48,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.menu-grid', start: 'top 82%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative z-10 bg-cream px-6 py-24 sm:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <div className="menu-head mx-auto max-w-2xl space-y-4 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-gold">
            Тільки натуральні смаколики
          </span>
          <h2 className="font-serif text-4xl font-extrabold tracking-tight text-coco-dark sm:text-5xl">
            Вітрина солодощів та кави
          </h2>
          <div className="mx-auto h-[3px] w-16 rounded bg-gold" />
          <p className="text-sm leading-relaxed text-coco/80">
            Свіжа випічка власного кондитерського цеху «Кокос» та авторська лінійка спешелті-кави.
            Обертайте моделі, обирайте улюблене й замовляйте за пару кліків.
          </p>
        </div>

        {/* 2×3 grid */}
        <div className="menu-grid mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((item) => (
            <article
              key={item.id}
              className="menu-card group flex flex-col overflow-hidden rounded-3xl border border-gold/20 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-gold/60 hover:shadow-xl"
            >
              {/* mini 3D canvas */}
              <div className="relative h-52 w-full bg-gradient-to-b from-cream-2 to-white">
                {item.badge && (
                  <span className="absolute left-4 top-4 z-10 rounded-full border border-gold-light/60 bg-white px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-coco-dark shadow">
                    {item.badge}
                  </span>
                )}
                <MiniModel kind={item.model} model={MODELS[item.id]} />
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold leading-tight text-coco-dark transition-colors group-hover:text-gold">
                    {item.name}
                  </h3>
                  <div className="shrink-0 text-right">
                    <span className="font-mono text-lg font-bold text-gold-dark">{item.price} ₴</span>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-coco/50">
                      {item.unit}
                    </span>
                  </div>
                </div>

                <p className="min-h-[40px] text-xs leading-relaxed text-coco/70">{item.description}</p>

                <a
                  href={SITE.telegramBot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-gold/20 bg-coco-dark py-3 font-mono text-xs font-bold uppercase tracking-widest text-gold-light transition-all duration-300 group-hover:border-transparent group-hover:bg-gold group-hover:text-white"
                >
                  <Send className="h-4 w-4" />
                  Замовити
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* custom-order CTA */}
        <div className="menu-card mt-14 flex flex-col items-center justify-between gap-6 rounded-3xl border border-gold/25 bg-cream-2 p-7 md:flex-row">
          <div className="flex items-start gap-4">
            <span className="rounded-2xl border border-gold/25 bg-white p-3 text-gold">
              <Sparkle className="h-6 w-6" />
            </span>
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-bold text-coco-dark">Маєте власні побажання?</h4>
              <p className="max-w-md text-xs leading-relaxed text-coco/70">
                Виготовимо торт за вашим унікальним дизайном для свята, весілля чи дня народження.
              </p>
            </div>
          </div>
          <a
            href={SITE.telegramBot}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-gold px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all hover:bg-gold-dark active:scale-95"
          >
            Обговорити з шефом
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
