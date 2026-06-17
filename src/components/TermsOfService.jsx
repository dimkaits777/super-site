import { TERMS } from '../data/legal';
import { LegalDocument } from './LegalDocument';

/** Публічна оферта (ЦКУ ст. 633, 641; ЗУ «Про електронну комерцію»; КМУ № 172). */
export function TermsOfService() {
  return <LegalDocument doc={TERMS} />;
}
