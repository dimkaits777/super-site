import { useEffect } from 'react';

/**
 * Shared scroll progress for the 3D "experience" region (hero + cake).
 * A single listener writes a normalized 0→1 offset into a plain object that
 * the R3F scenes read inside useFrame (no React re-render per frame).
 */
export const scroll = { offset: 0 };

/** Install the scroll listener; `getEl` returns the experience wrapper element. */
export function useScrollOffset(getEl) {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = getEl();
      if (!el) return;
      const distance = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(window.scrollY - el.offsetTop, 0), Math.max(distance, 1));
      scroll.offset = distance > 0 ? passed / distance : 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [getEl]);
}
