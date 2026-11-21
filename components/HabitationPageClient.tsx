'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Droplets,
  FileText,
  Flame,
  Lock,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Umbrella,
  Users,
  Wrench,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import TopHeader from '@/components/TopHeader';
import Navbar from '@/components/Navbar';
import SecondFooter from '@/components/SecondFooter';
import TrustAndFooter from '@/components/TrustAndFooter';
import InteractiveModals, {
  type ActiveModalType,
} from '@/components/InteractiveModals';
import {
  type CoverageTier,
  type Language,
  type SolutionId,
  solutionPath,
  swapLocale,
  t3,
} from '@/lib/insurance';
import {
  HABITATION_CLAIMS_STEPS,
  HABITATION_COMPARISON_ROWS,
  HABITATION_FAQS,
  HABITATION_GUARANTEES,
} from '@/lib/habitation';
import heroHomeImg from '@/src/assets/images/hero_home_official_logo.jpg';
import familyGardenImg from '@/src/assets/images/about_metier_family_1794761079560.jpg';

const GUARANTEE_ICONS = {
  incendie: Flame,
  'degats-eaux': Droplets,
  'vol-glace': Lock,
  'rc-famille': Users,
  evcat: Umbrella,
  assistance: Wrench,
} as const;

const TIER_LIST: {
  id: CoverageTier;
  label: Record<Language, string>;
  subtitle: Record<Language, string>;
}[] = [
  {
    id: 'essentiel',
    label: { fr: 'Essentiel', en: 'Essential', ar: 'الأساسي' },
    subtitle: { fr: 'Risques de base & RC', en: 'Core risks & liability', ar: 'المخاطر الأساسية والمسؤولية المدنية' },
  },
  {
    id: 'confort',
    label: { fr: 'Confort', en: 'Comfort', ar: 'الراحة' },
    subtitle: { fr: 'Le choix des familles', en: 'Most popular for families', ar: 'الخيار المفضل للعائلات' },
  },
  {
    id: 'integrale',
    label: { fr: 'Intégrale', en: 'All-Risk', ar: 'الشامل' },
    subtitle: { fr: 'Zéro franchise · Valeur à neuf', en: 'Zero deductible · New-for-old', ar: 'بدون تحمل · القيمة كجديد' },
  },
];

interface HabitationPageClientProps {
  initialLang?: Language;
}

export default function HabitationPageClient({ initialLang = 'fr' }: HabitationPageClientProps = {}) {
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
    if (id === 'habitation') {
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
      <header className="sticky top-0 z-40 shrink-0 bg-white">
        <motion.div
          initial={false}
          animate={{
            height: isScrolled ? 0 : 'auto',
            opacity: isScrolled ? 0 : 1,
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
          activeNav="particuliers"
          onSelectHome={() => router.push(`/${lang}`)}
          onSelectSolution={handleSelectSolution}
          onOpenAdvice={() => router.push(`/${lang}/conseils`)}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
          onOpenClientPortal={() => router.push(`/${lang}/#espace-client`)}
        />
      </header>

      <main className="flex-1 flex flex-col">
        {/* 1. Panoramic Rounded Habitation Hero Card */}
        <section
          aria-label={t3(
            lang,
            'Assurance Habitation Tanger',
            'Tangier Home Insurance',
            'تأمين السكن طنجة'
          )}
          className="bg-white pt-4 pb-6 sm:pt-6 sm:pb-8 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#06132E] min-h-[295px] sm:min-h-[340px] lg:min-h-[370px] flex items-center shadow-[0_18px_40px_-14px_rgba(7,22,54,0.34)]">
              {/* Background photograph with direction-aware gradient fade */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none select-none overflow-hidden"
              >
                <div
                  className={`absolute inset-y-0 ${
                    lang === 'ar' ? 'left-0' : 'right-0'
                  } w-full md:w-[74%] lg:w-[68%]`}
                >
                  <Image
                    src={heroHomeImg}
                    alt={t3(
                      lang,
                      'Maison et foyer protégés par Amekran Assurances',
                      'Home protected by Amekran Assurances',
                      'منزل وعائلة محمية من أمكران للتأمينات'
                    )}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 70vw"
                    referrerPolicy="no-referrer"
                    className={`object-cover ${
                      lang === 'ar' ? 'object-[26%_50%]' : 'object-[74%_50%]'
                    }`}
                  />
                </div>
                {/* Deep navy fade: from left in LTR, from right in RTL */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      lang === 'ar'
                        ? 'linear-gradient(270deg, #06132E 0%, #071636 34%, rgba(7,22,54,0.88) 49%, rgba(7,22,54,0.38) 68%, rgba(7,22,54,0.06) 100%)'
                        : 'linear-gradient(90deg, #06132E 0%, #071636 34%, rgba(7,22,54,0.88) 49%, rgba(7,22,54,0.38) 68%, rgba(7,22,54,0.06) 100%)',
                  }}
                />
                {/* Extra mobile legibility scrim */}
                <div className="md:hidden absolute inset-0 bg-[#06132E]/65" />
              </div>

              <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-9 sm:py-12">
                <div className="max-w-[540px] space-y-5">
                  {/* Breadcrumb */}
                  <nav
                    aria-label={t3(lang, 'Fil d’Ariane', 'Breadcrumb', 'مسار التنقل')}
                    className="flex items-center gap-1.5 text-[13px] font-medium text-slate-300"
                  >
                    <Link
                      href={`/${lang}`}
                      className="hover:text-white transition-colors"
                    >
                      {t3(lang, 'Accueil', 'Home', 'الرئيسية')}
                    </Link>
                    <ChevronRight
                      className="w-3.5 h-3.5 text-slate-400 shrink-0 rtl:rotate-180"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-white">
                      {t3(lang, 'Habitation', 'Home Insurance', 'تأمين السكن')}
                    </span>
                  </nav>

                  {/* Title & Subtitle */}
                  <div className="space-y-3">
                    <h1 className="text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold text-white leading-[1.06] tracking-[-0.02em]">
                      {t3(lang, 'Habitation', 'Home Insurance', 'تأمين السكن')}
                    </h1>
                    <p className="text-[15.5px] sm:text-[18px] font-normal text-slate-200/95 leading-[1.55] max-w-[490px]">
                      {t3(
                        lang,
                        'Protégez votre foyer en toute sérénité avec l’assurance habitation d’Amekran.',
                        'Protect your home with complete peace of mind with Amekran Home Insurance.',
                        'احمِ بيتك وأسرتك بكل اطمئنان مع تأمين السكن الشامل من AMEKRAN.'
                      )}
                    </p>
                  </div>

                  {/* Pill CTA Pair */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSelectSolution('habitation')}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#08193D] text-[14px] sm:text-[15px] font-bold shadow-[0_6px_22px_-2px_rgba(235,180,58,0.52)] transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer min-h-[44px] whitespace-nowrap"
                    >
                      <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>
                        {t3(lang, 'Demander un devis', 'Request a quote', 'طلب عرض سعر')}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setModal({ type: 'contact' })}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white text-[14px] sm:text-[15px] font-semibold border border-white/25 backdrop-blur-xs transition-all duration-150 hover:-translate-y-0.5 cursor-pointer min-h-[44px] whitespace-nowrap"
                    >
                      {t3(lang, 'Nous contacter', 'Contact us', 'اتصل بنا')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key Quantitative Trust Metrics Strip */}
        <section
          aria-label={t3(
            lang,
            'Repères clés Habitation',
            'Key Home Facts',
            'أرقام ومؤشرات تأمين السكن'
          )}
          className="bg-white border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-[#E8EEF7]">
            {[
              {
                val: t3(lang, 'Le jour même', 'Same Day', 'في نفس اليوم'),
                label: t3(
                  lang,
                  'Attestation bancaire & bail délivrée',
                  'Bank & lease certificate issued',
                  'تسليم فوري لشهادة القرض البنكي وعقد الكراء'
                ),
              },
              {
                val: t3(lang, '< 2h', '< 2h', '< ساعتين'),
                label: t3(
                  lang,
                  'Dépannage urgence plomberie / serrurerie',
                  'Emergency plumbing / locksmith dispatch',
                  'تدخل عاجل لإصلاح السباكة والأقفال'
                ),
              },
              {
                val: t3(lang, '24h/7j', '24/7', '24 ساعة / 7 أيام'),
                label: t3(
                  lang,
                  'Assistance sinistre & écoute client à Tanger',
                  'Claims assistance & client care in Tangier',
                  'مساعدة عند الحوادث ومواكبة الزبناء بطنجة'
                ),
              },
              {
                val: t3(lang, 'Loi 17-99', 'Law 17-99', 'القانون 17-99'),
                label: t3(
                  lang,
                  'Couverture conforme EVCAT incluse',
                  'Statutory EVCAT coverage included',
                  'تغطية مطابقة لنظام الكوارث الطبيعية EVCAT'
                ),
              },
            ].map((item) => (
              <div
                key={item.val}
                className="pt-3 sm:pt-0 sm:pl-6 rtl:sm:pl-0 rtl:sm:pr-6 first:pl-0 first:pt-0 rtl:first:pr-0"
              >
                <p className="text-[22px] sm:text-[26px] font-extrabold text-[#0B1E40] tabular-nums tracking-tight">
                  {item.val}
                </p>
                <p className="text-[12.5px] sm:text-[13px] font-medium text-[#4A5E7F] mt-0.5 leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 6 Core Guarantees Editorial Grid */}
        <section
          id="garanties"
          aria-label={t3(
            lang,
            'Garanties Assurance Multirisque Habitation',
            'Multi-Risk Home Guarantees',
            'ضمانات تأمين السكن المتعدد المخاطر'
          )}
          className="bg-white py-14 lg:py-18 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div
                aria-hidden="true"
                className="h-[1.5px] flex-1 max-w-[180px] bg-gradient-to-r from-transparent to-[#D99E26]"
              />
              <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#0B1E40] text-center tracking-tight">
                {t3(
                  lang,
                  'Des garanties complètes pour chaque pièce de vie',
                  'Complete protection for every room & risk',
                  'ضمانات شاملة لحماية مسكنكم وممتلكاتكم'
                )}
              </h2>
              <div
                aria-hidden="true"
                className="h-[1.5px] flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-[#D99E26]"
              />
            </div>
            <p className="text-center text-[15px] text-[#4B5F80] max-w-2xl mx-auto mb-10">
              {t3(
                lang,
                'Chaque contrat Amekran Assurances réunit les protections essentielles du Code des Assurances marocain et des extensions adaptées aux réalités des logements à Tanger.',
                'Every Amekran Assurances policy combines statutory Moroccan protections with practical extensions suited to homes across Tangier.',
                'يجمع كل عقد من أمكران للتأمينات الضمانات الأساسية لمدونة التأمينات المغربية وتمديدات ملائمة لخصوصيات السكن بطنجة.'
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {HABITATION_GUARANTEES.map((item, idx) => {
                const Icon =
                  GUARANTEE_ICONS[item.id as keyof typeof GUARANTEE_ICONS] ??
                  ShieldCheck;
                return (
                  <motion.article
                    key={item.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="rounded-[22px] border border-[#DCE5F2] bg-[#FAFBFD] hover:bg-white hover:border-[#D99E26]/70 p-6 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[13px] font-extrabold text-[#B57D14] tabular-nums">
                          {item.num}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#0B1E40] text-[#F4CB64] flex items-center justify-center border border-[#D99E26]/30">
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="text-[18px] font-extrabold text-[#0B1E40] leading-snug mb-2">
                        {item.title[lang]}
                      </h3>
                      <p className="text-[14px] text-[#455A7D] leading-[1.6]">
                        {item.description[lang]}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Formulas Comparison Table */}
        <section
          aria-label={t3(
            lang,
            'Comparatif des formules Habitation',
            'Home Plan Comparison',
            'مقارنة عروض تأمين السكن'
          )}
          className="bg-[#F6F9FD] py-14 lg:py-18 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#B57D14] mb-2">
                {t3(lang, '3 formules modulables', '3 Flexible Plans', '3 صيغ مرنة')}
              </p>
              <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#0B1E40] tracking-tight">
                {t3(
                  lang,
                  'Comparez nos formules Multirisque Habitation',
                  'Compare our Multi-Risk Home plans',
                  'قارن صيغ تأمين السكن الشامل'
                )}
              </h2>
            </div>

            <div className="bg-white rounded-[24px] border border-[#DCE5F2] shadow-[0_8px_28px_-8px_rgba(11,30,64,0.08)] overflow-x-auto">
              <table className="w-full min-w-[640px] text-left rtl:text-right border-collapse">
                <thead>
                  <tr className="border-b border-[#E5ECF6] bg-[#FAFBFD]">
                    <th className="py-4 px-5 text-[13px] font-extrabold text-[#0B1E40] w-[42%]">
                      {t3(lang, 'Garanties incluses', 'Included Coverages', 'الضمانات المشمولة')}
                    </th>
                    {TIER_LIST.map((t) => (
                      <th
                        key={t.id}
                        className={`py-4 px-4 text-center text-[14px] font-extrabold ${
                          t.id === 'confort'
                            ? 'bg-[#FFF9EA] text-[#0B1E40] border-x border-[#F2D58A]/60'
                            : 'text-[#0B1E40]'
                        }`}
                      >
                        {t.label[lang]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDF2F9] text-[13.5px]">
                  {HABITATION_COMPARISON_ROWS.map((row) => (
                    <tr key={row.label.fr} className="hover:bg-[#FAFBFD]/80">
                      <td className="py-3.5 px-5 font-semibold text-[#1B3157]">
                        {row.label[lang]}
                      </td>
                      {(['essentiel', 'confort', 'integrale'] as CoverageTier[]).map(
                        (tKey) => {
                          const val = row[tKey];
                          const isConfort = tKey === 'confort';
                          return (
                            <td
                              key={tKey}
                              className={`py-3.5 px-4 text-center tabular-nums ${
                                isConfort
                              ? 'bg-[#FFFDF6] border-x border-[#F2D58A]/45'
                              : ''
                              }`}
                            >
                              {val === true ? (
                                <Check
                                  className="w-4 h-4 text-[#0F8A4B] mx-auto"
                                  aria-label={t3(lang, 'Inclus', 'Included', 'مشمول')}
                                />
                              ) : val === false ? (
                                <Minus
                                  className="w-4 h-4 text-slate-300 mx-auto"
                                  aria-label={t3(lang, 'Non inclus', 'Not included', 'غير مشمول')}
                                />
                              ) : (
                                <span className="text-[12.5px] font-bold text-[#0B1E40]">
                                  {val[lang]}
                                </span>
                              )}
                            </td>
                          );
                        }
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6. Family Protection & Rapid Tangier Claims Split */}
        <section
          id="sinistres"
          aria-label={t3(
            lang,
            'Gestion des sinistres habitation à Tanger',
            'Home claims handling in Tangier',
            'تدبير حوادث السكن بطنجة'
          )}
          className="bg-white py-14 lg:py-18 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[380px] rounded-[24px] overflow-hidden border border-[#DCE5F2]">
              <Image
                src={familyGardenImg}
                alt={t3(
                  lang,
                  'Famille sereine protégée par Amekran Assurances',
                  'Peace of mind for families with Amekran Assurances',
                  'عائلة مطمئنة ومحمية بتأمينات أمكران'
                )}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#B57D14] mb-2">
                  {t3(
                    lang,
                    'Accompagnement sinistre à Tanger',
                    'Local Claims Support in Tangier',
                    'المواكبة عند الحوادث بطنجة'
                  )}
                </p>
                <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#0B1E40] leading-tight tracking-tight">
                  {t3(
                    lang,
                    'En cas d’imprévu, votre agence à Tanger agit sans délai',
                    'When the unexpected happens, your Tangier agency acts fast',
                    'في حالة وقوع طارئ، وكالتكم بطنجة تتدخل فوراً'
                  )}
                </h2>
              </div>

              <div className="space-y-4">
                {HABITATION_CLAIMS_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#F7FAFE] border border-[#E2EAF5]"
                  >
                    <span className="text-[15px] font-extrabold text-[#B57D14] tabular-nums shrink-0 mt-0.5">
                      {step.num}
                    </span>
                    <div>
                      <h3 className="text-[15.5px] font-extrabold text-[#0B1E40]">
                        {step.title[lang]}
                      </h3>
                      <p className="text-[13.5px] text-[#455A7D] mt-1 leading-relaxed">
                        {step.detail[lang]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleSelectSolution('habitation')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1E40] hover:bg-[#132E5E] text-white text-[14px] font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>
                    {t3(
                      lang,
                      'Souscrire en agence ou en ligne',
                      'Start Your Policy',
                      'الاكتتاب بالوكالة أو عبر الإنترنت'
                    )}
                  </span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </button>
                <a
                  href="tel:0661508925"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#DCE5F2] hover:border-[#D99E26] text-[#0B1E40] text-[14px] font-bold transition-colors min-h-[44px] tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#D99E26]" aria-hidden="true" />
                  <span className="dir-ltr">0661 50 89 25</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ Section matching clean accordion card stack with flanking gold lines */}
        <section
          id="faq"
          aria-label={t3(
            lang,
            'Questions fréquentes Assurance Habitation',
            'Home Insurance Frequently Asked Questions',
            'الأسئلة الشائعة حول تأمين السكن'
          )}
          className="bg-[#F6F9FC] py-14 sm:py-16 lg:py-20"
        >
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading with flanking gradient gold lines */}
            <div className="text-center mb-10 sm:mb-12">
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
                <div
                  aria-hidden="true"
                  className="h-[1.5px] flex-1 max-w-[210px] bg-gradient-to-r from-transparent via-[#D99E26]/65 to-[#D99E26]"
                />
                <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#0B1E40] tracking-[-0.02em] leading-tight shrink-0">
                  {t3(lang, 'Questions fréquentes', 'Frequently Asked Questions', 'الأسئلة الشائعة')}
                </h2>
                <div
                  aria-hidden="true"
                  className="h-[1.5px] flex-1 max-w-[210px] bg-gradient-to-l from-transparent via-[#D99E26]/65 to-[#D99E26]"
                />
              </div>
              <p className="text-[15px] sm:text-[16.5px] text-[#3F5373] font-normal">
                {t3(
                  lang,
                  'Questions fréquentes sur l’assurance habitation au Maroc',
                  'Frequently asked questions about home insurance in Morocco',
                  'أبرز الأسئلة المتكررة حول تأمين السكن في المغرب'
                )}
              </p>
            </div>

            <div className="space-y-4">
              {(showAllFaqs ? HABITATION_FAQS : HABITATION_FAQS.slice(0, 3)).map(
                (faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`bg-white rounded-[16px] border transition-all duration-200 ${
                        isOpen
                          ? 'border-[#D99E26]/55 shadow-[0_10px_28px_-8px_rgba(11,30,64,0.12)]'
                          : 'border-[#E6EDF5] shadow-[0_6px_20px_-8px_rgba(11,30,64,0.08)] hover:border-[#CFDCEB]'
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                        className="w-full px-6 sm:px-7 py-5 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer min-h-[68px]"
                      >
                        <span className="text-[15.5px] sm:text-[16.5px] font-bold text-[#0B1E40] leading-snug">
                          {faq.question[lang]}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isOpen
                              ? 'border-[#0B1E40] bg-[#0B1E40] text-white'
                              : 'border-[#CBD5E1] bg-white text-[#334155]'
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 sm:px-7 pb-5 pt-2 text-[14.5px] text-[#455A7D] leading-relaxed border-t border-[#EFF4FA]">
                          {faq.answer[lang]}
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>

            {HABITATION_FAQS.length > 3 && (
              <div className="mt-9 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs((prev) => !prev)}
                  className="px-7 py-3.5 rounded-xl bg-[#0B1E40] hover:bg-[#132C5C] text-white text-[14.5px] font-semibold shadow-[0_8px_20px_-6px_rgba(11,30,64,0.35)] transition-all duration-150 hover:-translate-y-0.5 cursor-pointer min-h-[46px]"
                >
                  {showAllFaqs
                    ? t3(lang, 'Réduire les questions fréquentes', 'Show fewer questions', 'عرض أسئلة أقل')
                    : t3(
                        lang,
                        'Afficher toutes les questions fréquentes',
                        'View all frequently asked questions',
                        'عرض جميع الأسئلة الشائعة'
                      )}
                </button>
              </div>
            )}
          </div>
        </section>

        <SecondFooter
          lang={lang}
          onSelectSolution={handleSelectSolution}
          onOpenAdvice={() => router.push(`/${lang}/conseils`)}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
        />
      </main>

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
