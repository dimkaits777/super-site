import { useEffect } from 'react';
import { useActiveModal, ui } from '../store/useUI';
import { LEGAL_DOCS } from '../data/legal';
import { PrivacyPolicy } from './PrivacyPolicy';
import { TermsOfService } from './TermsOfService';
import { LegalDocument } from './LegalDocument';
import { X, Lock, Shield, FileText } from './Icons';

const ICONS = { privacy: Lock, terms: Shield, cookie: FileText };

/** Top-level modal host that shows the active legal document. */
export function LegalModal() {
  const active = useActiveModal();

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === 'Escape' && ui.closeModal();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  if (!active) return null;

  const doc = LEGAL_DOCS[active];
  const Icon = ICONS[active];
  const Body =
    active === 'privacy' ? <PrivacyPolicy /> : active === 'terms' ? <TermsOfService /> : <LegalDocument doc={doc} />;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={doc.title}
    >
      <div className="absolute inset-0 bg-coco-dark/60 backdrop-blur-sm" onClick={ui.closeModal} />

      <div className="relative flex max-h-[86vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gold/40 bg-white shadow-2xl animate-[modalIn_0.25s_ease-out]">
        <style>{`@keyframes modalIn{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}`}</style>

        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-gold/15 bg-cream-2 p-6">
          <div className="flex items-center gap-3.5">
            <span className="rounded-lg border border-gold/15 bg-white p-2 text-gold-dark">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h3 className="pr-6 font-serif text-xl font-bold tracking-tight text-coco-dark">{doc.title}</h3>
              <p className="mt-1 font-mono text-[10.5px] text-gold-dark">Оновлено: {doc.lastUpdated}</p>
            </div>
          </div>
          <button
            onClick={ui.closeModal}
            aria-label="Закрити"
            className="rounded-full p-1.5 text-coco/40 transition-colors hover:bg-cream-2 hover:text-coco"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* scrollable body */}
        <div className="overflow-y-auto p-6">{Body}</div>

        {/* footer */}
        <div className="flex justify-end border-t border-gold/10 bg-cream-2 p-4">
          <button
            onClick={ui.closeModal}
            className="rounded-xl border border-gold/15 bg-coco-dark px-5 py-2 text-xs font-semibold text-gold-light transition-all hover:bg-gold hover:text-white"
          >
            Зрозуміло
          </button>
        </div>
      </div>
    </div>
  );
}
