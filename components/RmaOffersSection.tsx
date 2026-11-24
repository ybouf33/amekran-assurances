'use client';

import type { ComponentType } from 'react';
import Link from 'next/link';
import {
  Bike,
  Car,
  Check,
  ChevronRight,
  FileText,
  HeartPulse,
  Home,
  PiggyBank,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import {
  AMEKRAN_DISCLAIMER,
  AMEKRAN_OFFERS,
  AMEKRAN_RULES,
  type AmekranOfferIcon,
} from '@/lib/rma';
import { t3, type Language } from '@/lib/insurance';

const OFFER_ICONS: Record<
  AmekranOfferIcon,
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  car: Car,
  bike: Bike,
  home: Home,
  heart: HeartPulse,
  savings: PiggyBank,
  leisure: Sparkles,
};

/** AMEKRAN offer id → advice anchor id on the internal Conseils page. */
const OFFER_ADVICE_ANCHOR: Record<string, string> = {
  automobile: 'auto',
  moto: 'moto',
  habitation: 'habitation',
  sante: 'sante',
  epargne: 'epargne',
  loisirs: 'loisirs',
};

const RULE_ICONS = [ShieldCheck, FileText, Check, FileText];

const LATIN_RUN =
  /([A-Za-z][A-Za-z0-9À-ÿ’'&.\-]*(?:[ \t]+[A-Za-z0-9À-ÿ’'&.\-]+)*|[0-9]+(?:[-\/][0-9]+)+)/g;

/**
 * Arabic copy mixes AMEKRAN product names (Latin) into RTL sentences. Wrapping
 * each Latin run in `<bdi dir="ltr">` stops the bidi algorithm from reversing
 * or gluing the names to the Arabic conjunctions.
 */
function AmekranCopy({ text, lang }: { text: string; lang: Language }) {
  if (lang !== 'ar') return <>{text}</>;
  return (
    <>
      {text.split(LATIN_RUN).map((part, idx) =>
        /^[A-Za-z0-9]/.test(part) ? (
          <bdi key={idx} dir="ltr">
            {part}
          </bdi>
        ) : (
          <span key={idx}>{part}</span>
        )
      )}
    </>
  );
}

interface AmekranOffersSectionProps {
  lang: Language;
  onOpenContact: () => void;
}

/**
 * "Nos offres AMEKRAN" — mirrors the AMEKRAN Assurances product families and the
 * underwriting / claim rules that apply to them, presented as the agency of
 * AMEKRAN in Tangier. Every product links out to its official AMEKRAN page.
 */
export default function AmekranOffersSection({
  lang,
  onOpenContact,
}: AmekranOffersSectionProps) {
  return (
    <section
      id="offres-rma"
      aria-labelledby="offres-rma-title"
      className="relative z-10 scroll-mt-28 overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#F4F8FE_38%,#EEF4FC_100%)] py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative ribbons */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -right-52 -top-40 h-[380px] w-[780px] rotate-[7deg] rounded-[50%] bg-[#E8F1FB]/80" />
        <div className="absolute -left-56 bottom-10 h-[360px] w-[720px] rotate-[-6deg] rounded-[50%] bg-[#EDF4FD]/70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1220px] px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="offres-rma-title"
          lang={lang}
          eyebrow={t3(lang, 'Agence AMEKRAN Assurances · Tanger', 'AMEKRAN Assurances Agency · Tangier', 'وكالة AMEKRAN للتأمين · طنجة')}
          title={t3(
            lang,
            'Les offres AMEKRAN Assurances',
            'The AMEKRAN Assurances offers',
            'عروض AMEKRAN للتأمين'
          )}
          subtitle={t3(
            lang,
            'AMEKRAN Assurances, votre AMEKRAN Assurances à Tanger : les mêmes produits, garanties et règles que la compagnie, avec un conseil de proximité.',
            'AMEKRAN Assurances, your AMEKRAN Assurances in Tangier: the same products, cover and rules as the company, with local advice.',
            'AMEKRAN للتأمين، شركة تأمينكم بطنجة: منتجات وتغطيات وقواعد مصممة لكم، مع استشارة محلية.'
          )}
          className="mb-9 sm:mb-11"
        />

        {/* Offer family cards */}
        <div
          data-gsap-reveal
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {AMEKRAN_OFFERS.map((offer) => {
            const Icon = OFFER_ICONS[offer.icon];
            return (
              <article
                key={offer.id}
                data-gsap-item
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E1E9F4] bg-white p-5 shadow-[0_16px_44px_-34px_rgba(11,30,64,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C48A]/70 hover:shadow-[0_24px_54px_-32px_rgba(11,30,64,0.5)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D99E26]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="mb-3.5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF7DE] to-[#F7E7B4] ring-1 ring-[#E8CF8E]/70">
                      <Icon className="h-5 w-5 text-[#B7791F]" strokeWidth={1.85} />
                    </span>
                    <h3 className="text-[16px] font-bold leading-tight text-[#0B1E40]">
                      {offer.title[lang]}
                    </h3>
                  </div>
                </div>

                <p className="mb-3.5 text-[12.5px] leading-relaxed text-[#51648C]">
                  <AmekranCopy text={offer.tagline[lang]} lang={lang} />
                </p>

                <ul className="mb-5 space-y-2">
                  {offer.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[12px] leading-snug text-[#283B66]">
                      <span className="mt-[2px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#F3F7FD] ring-1 ring-[#DDE8F5]">
                        <Check className="h-2.5 w-2.5 text-[#B7791F]" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span><AmekranCopy text={item[lang]} lang={lang} /></span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#EEF3FA] pt-3.5">
                  {offer.internalPath && (
                    <Link
                      href={`/${lang}${offer.internalPath}`}
                      className="inline-flex items-center gap-1 text-[12px] font-bold text-[#0B1E40] transition-colors hover:text-[#B7791F]"
                    >
                      {t3(lang, 'Notre page', 'Our page', 'صفحتنا')}
                      <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                    </Link>
                  )}
                  <Link
                    href={`/${lang}/conseils#advice-${OFFER_ADVICE_ANCHOR[offer.id] ?? offer.id}`}
                    className="ms-auto inline-flex items-center gap-1 text-[12px] font-bold text-[#B7791F] transition-colors hover:text-[#8A5A0F]"
                  >
                    {t3(lang, 'Nos conseils', 'Our advice', 'نصائحنا')}
                    <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Rules & obligations */}
        <div
          data-gsap-reveal
          className="relative mt-12 overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#061430_0%,#0B214A_52%,#0E2B5E_100%)] p-6 text-white shadow-[0_30px_70px_-40px_rgba(6,20,48,0.9)] sm:p-9"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#F4CB64]/10 blur-2xl"
          />
          <div className="relative z-10">
            <div className="mb-7 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#F4CB64]">
                  {t3(lang, 'Règles & obligations', 'Rules & obligations', 'القواعد والالتزامات')}
                </p>
                <h3 className="text-[22px] font-bold leading-tight sm:text-[26px]">
                  {t3(
                    lang,
                    'Les règles AMEKRAN, expliquées simplement',
                    'The AMEKRAN rules, simply explained',
                    'قواعد AMEKRAN بشرح مبسط'
                  )}
                </h3>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#F4CB64]/45 bg-white/[0.06] px-4 py-2 text-[12px] font-bold text-[#F8D366]">
                {t3(lang, 'Conditions AMEKRAN', 'AMEKRAN conditions', 'شروط AMEKRAN')}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {AMEKRAN_RULES.map((rule, idx) => {
                const Icon = RULE_ICONS[idx] ?? FileText;
                return (
                  <div
                    key={rule.id}
                    data-gsap-item
                    className="rounded-xl border border-white/10 bg-white/[0.045] p-4"
                  >
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4CB64]/15 ring-1 ring-[#F4CB64]/30">
                        <Icon className="h-4 w-4 text-[#F8D672]" strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <h4 className="text-[13.5px] font-bold text-white">
                        {rule.title[lang]}
                      </h4>
                    </div>
                    <p className="text-[12px] leading-relaxed text-slate-300/90">
                      <AmekranCopy text={rule.detail[lang]} lang={lang} />
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 border-t border-white/10 pt-4 text-[10.5px] leading-relaxed text-slate-400/90">
              <AmekranCopy text={AMEKRAN_DISCLAIMER[lang]} lang={lang} />
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 rounded-full bg-gold-pill px-5 py-2.5 text-[13px] font-bold text-[#0B1E40] shadow-[0_10px_26px_-12px_rgba(217,158,38,0.8)] transition-transform hover:-translate-y-0.5 hover:bg-gold-pill-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D99E26]"
          >
            {t3(
              lang,
              'Parler à votre agence AMEKRAN à Tanger',
              'Talk to your AMEKRAN agency in Tangier',
              'تحدثوا مع وكالة AMEKRAN بطنجة'
            )}
            <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
