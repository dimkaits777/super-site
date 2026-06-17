import { COMPLIANCE_NOTE } from '../data/legal';

/** Presentational renderer for a legal document (title, date, sections, note). */
export function LegalDocument({ doc }) {
  return (
    <div className="space-y-5">
      <p className="text-xs leading-relaxed text-coco/75">{doc.intro}</p>
      {doc.sections.map((s) => (
        <section key={s.heading} className="space-y-1.5">
          <h4 className="font-serif text-base font-bold tracking-wide text-gold-dark">{s.heading}</h4>
          <p className="whitespace-pre-line pl-1 text-xs leading-relaxed text-coco/70">{s.body}</p>
        </section>
      ))}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold/15 bg-cream-2 p-4">
        <span className="text-lg">⚖️</span>
        <p className="text-[10px] leading-relaxed text-coco/55">{COMPLIANCE_NOTE}</p>
      </div>
    </div>
  );
}
