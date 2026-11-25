'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  Baby,
  Check,
  CheckCircle2,
  ChevronDown,
  Eye,
  FileText,
  HeartPulse,
  Hospital,
  Minus,
  Phone,
  Pill,
  Plane,
  Plus,
  ShieldCheck,
  Smile,
  Users,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import TopHeader from '@/components/TopHeader';
import Navbar from '@/components/Navbar';
import SecondFooter from '@/components/SecondFooter';
import TrustAndFooter from '@/components/TrustAndFooter';
import FloatingContactWidget from '@/components/FloatingContactWidget';
import InteractiveModals, {
  type ActiveModalType,
} from '@/components/InteractiveModals';
import {
  type CoverageTier,
  type Language,
  type SolutionId,
  solutionPath,
  swapLocale,
} from '@/lib/insurance';
import {
  SANTE_CLAIMS_STEPS,
  SANTE_COMPARISON_ROWS,
  SANTE_FAQS,
  SANTE_GUARANTEES,
} from '@/lib/sante';
import heroHealthImg from '@/src/assets/images/hero_health_tangier_amekran_1794666688620.jpg';

const GUARANTEE_ICONS = {
  'amo-topup': HeartPulse,
  'tiers-payant': Hospital,
  'optique-dentaire': Eye,
  maternite: Baby,
  'pharmacie-chronique': Pill,
  'evacuation-internationale': Plane,
} as const;

const TIER_LIST: {
  id: CoverageTier;
  label: Record<Language, string>;
  subtitle: Record<Language, string>;
}[] = [
  {
    id: 'essentiel',
    label: { fr: 'Essentiel', en: 'Essential', ar: 'الأساسي' },
    subtitle: {
      fr: 'Complément AMO 80% · Hospitalisation 90%',
      en: 'AMO Top-up 80% · Hospital 90%',
      ar: 'مكمل AMO بنسبة 80% · الاستشفاء 90%',
    },
  },
  {
    id: 'confort',
    label: { fr: 'Confort', en: 'Comfort', ar: 'الراحة' },
    subtitle: {
      fr: 'Remboursement 90% · Optique & Dentaire renforcés',
      en: '90% Reimbursement · Enhanced Dental & Optical',
      ar: 'تعويض 90% · بصريات وأسنان معززة',
    },
  },
  {
    id: 'integrale',
    label: { fr: 'Intégrale', en: 'All-Risk', ar: 'الشامل' },
    subtitle: {
      fr: '100% Frais Réels · Tiers Payant & Évacuation Mondiale',
      en: '100% Actual Costs · Direct Billing & Worldwide Evac',
      ar: '100% المصاريف الفعلية · الثالث المؤدي وإخلاء دولي',
    },
  },
];

interface SantePageClientProps {
  initialLang?: Language;
}

export default function SantePageClient({
  initialLang = 'fr',
}: SantePageClientProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [lang, setLang] = useState<Language>(initialLang);
  const [modal, setModal] = useState<ActiveModalType>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [openFaqId, setOpenFaqId] = useState<string>('');
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => (prev ? y > 8 : y > 40));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleChangeLang(next: Language) {
    setLang(next);
    router.push(swapLocale(pathname, next));
  }

  function handleSelectSolution(id: SolutionId) {
    if (id === 'sante-cnss') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    router.push(solutionPath(id, lang));
  }

  return (
    <div
      id="top"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-dvh flex flex-col bg-white overflow-x-clip"
    >
      {/* Header — matching landing and dedicated subpages */}
      <header className="sticky top-0 z-40 shrink-0 bg-white">
        <motion.div
          initial={false}
          animate={{
            height: isScrolled ? 0 : 'auto',
            opacity: isScrolled ? 0 : 1,
            y: isScrolled ? -8 : 0,
          }}
          transition={{
            height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: isScrolled ? 0.3 : 0.42, ease: isScrolled ? [0.4, 0, 1, 1] : [0.16, 1, 0.3, 1], delay: isScrolled ? 0 : 0.06 },
          }}
          className={
            isScrolled
              ? 'overflow-hidden pointer-events-none'
              : 'overflow-visible relative z-[60]'
          }
        >
          <TopHeader
            lang={lang}
            onChangeLang={handleChangeLang}
            onOpenContact={() => setModal({ type: 'contact' })}
            logoHref={`/${lang}`}
          />
        </motion.div>
        <Navbar
          lang={lang}
          activeNav="sante"
          onSelectHome={() => router.push(`/${lang}`)}
          onSelectSolution={handleSelectSolution}
          onOpenAdvice={() => router.push(`/${lang}/conseils`)}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
          onOpenClientPortal={() => router.push(`/${lang}/#espace-client`)}
        />
      </header>

      <main className="flex-1 flex flex-col">
        {/* 1. Panoramic Rounded Health Hero Card */}
        <section
          aria-label={
            lang === 'fr'
              ? 'Assurance Santé & AMC CNSS Tanger'
              : 'Health & AMC CNSS Tangier'
          }
          className="bg-white pt-4 pb-6 sm:pt-6 sm:pb-8 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#061534] min-h-[300px] sm:min-h-[350px] lg:min-h-[390px] flex items-center shadow-[0_18px_44px_-14px_rgba(7,22,54,0.36)]">
              {/* Background photograph with smooth fade */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none select-none overflow-hidden"
              >
                <div className="absolute inset-y-0 right-0 w-full md:w-[72%] lg:w-[65%]">
                  <Image
                    src={heroHealthImg}
                    alt={
                      lang === 'fr'
                        ? 'Couverture santé et soins médicaux à Tanger'
                        : 'Health and medical coverage in Tangier'
                    }
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 65vw"
                    className="object-cover object-center"
                  />
                  {/* Leftward navy gradient mask to ensure crisp text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#061534] via-[#061534]/85 to-transparent md:to-transparent" />
                </div>
              </div>

              {/* Foreground Copy & Quick CTAs */}
              <div className="relative z-10 w-full p-6 sm:p-9 lg:p-12 max-w-[620px] text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D99E26]/20 border border-[#F4CB64]/40 text-[#FAD97A] text-xs font-extrabold uppercase tracking-widest mb-3.5 backdrop-blur-xs">
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'fr'
                      ? 'Particuliers · Familles · Dirigeants'
                      : lang === 'ar'
                      ? 'أفراد · عائلات · مسيرون'
                      : 'Individuals · Families · Executives'}
                  </span>
                </div>

                <h1 className="text-[26px] sm:text-[34px] lg:text-[42px] font-extrabold leading-[1.12] tracking-tight text-balance">
                  {lang === 'fr'
                    ? 'Assurance Santé & AMC CNSS à Tanger'
                    : lang === 'ar'
                    ? 'تأمين الصحة والتأمين التكميلي CNSS بطنجة'
                    : 'Health & Supplementary AMO/CNSS in Tangier'}
                </h1>

                <p className="mt-3.5 text-sm sm:text-base text-slate-200 leading-relaxed">
                  {lang === 'fr'
                    ? 'Maximisez vos remboursements médicaux : consultations, analyses, hospitalisation en clinique privée sans avance de frais (Tiers Payant) et forfaits optique/dentaire renforcés.'
                    : lang === 'ar'
                    ? 'استفيدوا من أفضل نسبة تعويض طبي: استشارات، تحاليل، استشفاء بالمصحات الخاصة بدون تسبيق مالي (الثالث المؤدي) وباقات سخية للنظارات والأسنان.'
                    : 'Top up your AMO/CNSS benefits with up to 100% reimbursement, direct clinic billing (Tiers Payant) across Tangier, and generous optical & dental allowances.'}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModal({ type: 'quote', solutionId: 'sante-cnss' })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-sm font-bold shadow-[0_6px_18px_-3px_rgba(217,158,38,0.55)] transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>
                      {lang === 'fr'
                        ? 'Demander un devis'
                        : lang === 'ar'
                        ? 'طلب عرض سعر'
                        : 'Request a quote'}
                    </span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>

                  <a
                    href="tel:0661508925"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-sm font-semibold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#F4CB64]" />
                    <span dir="ltr">0661 50 89 25</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Key Health Guarantees Cards Grid */}
        <section
          aria-label={
            lang === 'fr' ? 'Garanties Santé & AMC' : 'Health Coverage Details'
          }
          className="py-12 sm:py-16 bg-white border-t border-slate-100"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B57D14]">
                {lang === 'fr'
                  ? 'Protection Intégrale'
                  : lang === 'ar'
                  ? 'حماية شاملة'
                  : 'Comprehensive Protection'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E40] mt-1.5 tracking-tight">
                {lang === 'fr'
                  ? 'Ce que couvre votre assurance Santé'
                  : lang === 'ar'
                  ? 'ما يغطيه تأمينكم الصحي التكميلي'
                  : 'What Your Health Policy Covers'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SANTE_GUARANTEES.map((g) => {
                const IconComponent =
                  GUARANTEE_ICONS[g.id as keyof typeof GUARANTEE_ICONS] ??
                  HeartPulse;
                return (
                  <div
                    key={g.id}
                    className="p-6 rounded-[20px] bg-slate-50/70 hover:bg-[#FFFDF7] border border-slate-200/70 hover:border-[#D99E26]/50 transition-all duration-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#B57D14]">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          {g.num}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#0B1E40] leading-snug">
                        {g.title[lang]}
                      </h3>
                      <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                        {g.description[lang]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Formulas Comparison Table */}
        <section
          aria-label={
            lang === 'fr'
              ? 'Comparatif des formules Santé'
              : 'Health Tiers Comparison'
          }
          className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/70"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-9">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B57D14]">
                {lang === 'fr'
                  ? 'Comparateur de Formules'
                  : lang === 'ar'
                  ? 'مقارنة الصيغ'
                  : 'Tiers Comparison'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E40] mt-1.5 tracking-tight">
                {lang === 'fr'
                  ? 'Choisissez le niveau de remboursement adapté'
                  : lang === 'ar'
                  ? 'اختر مستوى التعويض المناسب لاحتياجاتكم'
                  : 'Choose the Right Reimbursement Level'}
              </h2>
            </div>

            <div className="bg-white rounded-[22px] border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="py-4 px-4 sm:px-6 font-bold text-[#0B1E40]">
                      {lang === 'fr'
                        ? 'Prestations & Soins'
                        : lang === 'ar'
                        ? 'الخدمات والعلاجات'
                        : 'Benefits & Care'}
                    </th>
                    <th className="py-4 px-3 sm:px-4 text-center font-bold text-[#0B1E40]">
                      {lang === 'fr'
                        ? 'Essentiel'
                        : lang === 'ar'
                        ? 'الأساسي'
                        : 'Essential'}
                    </th>
                    <th className="py-4 px-3 sm:px-4 text-center font-bold text-[#0B1E40] bg-[#FFF8E7]">
                      {lang === 'fr'
                        ? 'Confort ★'
                        : lang === 'ar'
                        ? 'الراحة ★'
                        : 'Comfort ★'}
                    </th>
                    <th className="py-4 px-3 sm:px-4 text-center font-bold text-[#0B1E40]">
                      {lang === 'fr'
                        ? 'Intégrale'
                        : lang === 'ar'
                        ? 'الشامل'
                        : 'All-Risk'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SANTE_COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-[#0B1E40]">
                        {row.label[lang]}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-center">
                        {typeof row.essentiel === 'boolean' ? (
                          row.essentiel ? (
                            <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )
                        ) : (
                          <span className="text-slate-700 font-semibold text-xs">
                            {row.essentiel[lang]}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-center bg-[#FFFBF0]">
                        {typeof row.confort === 'boolean' ? (
                          row.confort ? (
                            <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )
                        ) : (
                          <span className="text-[#0B1E40] font-bold text-xs">
                            {row.confort[lang]}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-center">
                        {typeof row.integrale === 'boolean' ? (
                          row.integrale ? (
                            <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <span className="text-slate-300 font-bold">—</span>
                          )
                        ) : (
                          <span className="text-slate-900 font-bold text-xs">
                            {row.integrale[lang]}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Claims Process & Tangier Support */}
        <section
          aria-label={
            lang === 'fr'
              ? 'Remboursements et Démarches'
              : 'Claims and Support'
          }
          className="py-12 sm:py-16 bg-white"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B57D14]">
                {lang === 'fr'
                  ? 'Accompagnement Local'
                  : lang === 'ar'
                  ? 'مواكبة محلية بطنجة'
                  : 'Fast Local Claims'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E40] mt-1.5 tracking-tight">
                {lang === 'fr'
                  ? 'Remboursement express de vos frais médicaux'
                  : lang === 'ar'
                  ? 'استرجاع سريع لمصاريفكم الطبية'
                  : 'Fast Medical Claims Reimbursement'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SANTE_CLAIMS_STEPS.map((s) => (
                <div
                  key={s.num}
                  className="p-6 rounded-[22px] border border-slate-200 bg-slate-50/60 relative"
                >
                  <span className="inline-block text-2xl font-extrabold text-[#D99E26] mb-3">
                    {s.num}
                  </span>
                  <h3 className="text-base font-bold text-[#0B1E40] leading-snug">
                    {s.title[lang]}
                  </h3>
                  <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {s.detail[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. FAQ Accordion Section */}
        <section
          aria-label={
            lang === 'fr' ? 'Questions Fréquentes Santé' : 'Health Insurance FAQ'
          }
          className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200/70"
        >
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-9">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B57D14]">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1E40] mt-1.5 tracking-tight">
                {lang === 'fr'
                  ? 'Questions fréquentes sur la Santé & AMC'
                  : lang === 'ar'
                  ? 'الأسئلة الشائعة حول التأمين الصحي'
                  : 'Frequently Asked Questions about Health'}
              </h2>
            </div>

            <div className="space-y-3">
              {(showAllFaqs ? SANTE_FAQS : SANTE_FAQS.slice(0, 4)).map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-[#0B1E40]">
                        {faq.question[lang]}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#D99E26] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 pt-1 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer[lang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {SANTE_FAQS.length > 4 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs((prev) => !prev)}
                  className="px-6 py-2.5 rounded-full bg-white border border-slate-300 text-xs sm:text-sm font-bold text-[#0B1E40] hover:bg-slate-50 shadow-xs cursor-pointer"
                >
                  {showAllFaqs
                    ? lang === 'fr'
                      ? 'Voir moins'
                      : lang === 'ar'
                      ? 'عرض أقل'
                      : 'Show less'
                    : lang === 'fr'
                    ? 'Afficher plus de questions'
                    : lang === 'ar'
                    ? 'عرض المزيد من الأسئلة'
                    : 'Show more questions'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SecondFooter */}
        <SecondFooter
          lang={lang}
          onSelectSolution={handleSelectSolution}
          onOpenAdvice={() => router.push(`/${lang}/conseils`)}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
        />
      </main>

      <FloatingContactWidget lang={lang} />
      <TrustAndFooter lang={lang} />

      <InteractiveModals
        lang={lang}
        modal={modal}
        onClose={() => setModal(null)}
        onSwitchToQuote={(id) => setModal({ type: 'quote', solutionId: id })}
      />
    </div>
  );
}
