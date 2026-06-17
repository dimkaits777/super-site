import { PRIVACY } from '../data/legal';
import { LegalDocument } from './LegalDocument';

/** Політика конфіденційності (ЗУ «Про захист персональних даних» № 2297-VI). */
export function PrivacyPolicy() {
  return <LegalDocument doc={PRIVACY} />;
}
