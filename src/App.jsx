import { lazy, Suspense, useCallback, useRef } from 'react';

import { Header } from './components/Header';
import { HeroCopy } from './components/HeroCopy';
import { CakeCopy } from './components/CakeCopy';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { LegalModal } from './components/LegalModal';
import { useScrollOffset } from './store/scroll';

// Heavy 3D lives in separate chunks so the hero HTML paints immediately.
const Experience = lazy(() => import('./components/Experience'));
const MenuGrid = lazy(() => import('./components/MenuGrid').then((m) => ({ default: m.MenuGrid })));

export default function App() {
  const expRef = useRef(null);
  const getExp = useCallback(() => expRef.current, []);
  useScrollOffset(getExp);

  return (
    <>
      <Header />

      {/* Fixed 3D backdrop — the living scene behind the immersive sections. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </div>

      {/* Scrolling content above the canvas. */}
      <main className="relative z-10">
        {/* Immersive region (transparent → 3D shows through); drives scroll.offset. */}
        <div ref={expRef}>
          <HeroCopy />
          <CakeCopy />
        </div>
        {/* Opaque sections cover the canvas. */}
        <Suspense fallback={<div className="min-h-screen bg-cream" />}>
          <MenuGrid />
        </Suspense>
        <Footer />
      </main>

      <CookieConsent />
      <LegalModal />
    </>
  );
}
