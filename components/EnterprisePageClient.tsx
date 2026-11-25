'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Anchor,
  ArrowRight,
  Box,
  Building2,
  Check,
  ChevronRight,
  FileText,
  Globe,
  HardHat,
  Heart,
  Minus,
  Package,
  Phone,
  Plus,
  Scale,
  Shield,
  ShieldCheck,
  Ship,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Wrench,
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
  type Language,
  type SolutionId,
  solutionPath,
  swapLocale,
  t3,
} from '@/lib/insurance';
import {
  ENTERPRISE_SERVICES,
  type EnterpriseIconKey,
  type EnterpriseServiceId,
} from '@/lib/enterprise';
import { AMEKRAN_PHONE } from '@/lib/rma';

import heroBusinessImg from '@/src/assets/images/hero_business_tangier_amekran_1794666689451.jpg';
import heroWorkplaceImg from '@/src/assets/images/hero_workplace_tangier_amekran_1794666686780.jpg';
import heroTrucksImg from '@/src/assets/images/hero_poids_lourds_tangier_1794665880265.jpg';
import heroMarineImg from '@/src/assets/images/hero_marine_tangier_amekran_1794666691143.jpg';
import agencyTeamImg from '@/src/assets/images/client_portal_agency_1794666348528.jpg';

const HERO_IMAGES: Record<EnterpriseServiceId, typeof heroBusinessImg> = {
  entreprises: heroBusinessImg,
  'accidents-travail': heroWorkplaceImg,
  'poids-lourds': heroTrucksImg,
  maritime: heroMarineImg,
};

const ENTERPRISE_ICONS: Record<EnterpriseIconKey, React.ComponentType<{ className?: string }>> = {
  building: Building2,
  shield: Shield,
  scale: Scale,
  wrench: Wrench,
  trending: TrendingUp,
  truck: Truck,
  hardhat: HardHat,
  heart: Heart,
  wallet: Wallet,
  users: Users,
  file: FileText,
  ship: Ship,
  container: Box,
  anchor: Anchor,
  package: Package,
  globe: Globe,
};

interface EnterprisePageClientProps {
  serviceId: EnterpriseServiceId;
  initialLang?: Language;
}

export default function EnterprisePageClient({
  serviceId,
  initialLang = 'fr',
}: EnterprisePageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [lang, setLang] = useState<Language>(initialLang);
  const [modal, setModal] = useState<ActiveModalType>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => (prev ? y > 8 : y > 40));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const service = ENTERPRISE_SERVICES[serviceId] ?? ENTERPRISE_SERVICES.entreprises;
  const heroImg = HERO_IMAGES[serviceId] ?? heroBusinessImg;

  function handleChangeLang(next: Language) {
    setLang(next);
    router.push(swapLocale(pathname, next));
  }

  function handleSelectSolution(id: SolutionId) {
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
          activeNav={service.nav}
          onSelectHome={() => router.push(`/${lang}`)}
          onSelectSolution={handleSelectSolution}
          onOpenAdvice={() => router.push(`/${lang}/conseils`)}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
          onOpenClientPortal={() => router.push(`/${lang}/#espace-client`)}
        />
      </header>

      <main className="flex-1 flex flex-col">
        {/* 1. Panoramic Rounded Hero Card */}
        <section
          aria-label={service.title[lang]}
          className="bg-white pt-4 pb-6 sm:pt-6 sm:pb-8 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#06132E] min-h-[310px] sm:min-h-[360px] lg:min-h-[390px] flex items-center shadow-[0_18px_40px_-14px_rgba(7,22,54,0.34)]">
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
                    src={heroImg}
                    alt={service.title[lang]}
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
                <div className="max-w-[560px] space-y-4">
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
                    <span>{t3(lang, 'Entreprises & Flottes', 'Business & Fleets', 'الشركات والأساطيل')}</span>
                    <ChevronRight
                      className="w-3.5 h-3.5 text-slate-400 shrink-0 rtl:rotate-180"
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-[#F4CB64]">
                      {service.title[lang]}
                    </span>
                  </nav>

                  {/* Official AMEKRAN Agent Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D99E26]/40 backdrop-blur-xs text-[11.5px] font-bold text-[#F4CB64]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F4CB64] shrink-0" />
                    <span>
                      {t3(
                        lang,
                        'AMEKRAN Assurances · Assureur à Tanger',
                        'AMEKRAN Assurances · Insurer in Tangier',
                        'أمكران للتأمينات · شركة تأمين بطنجة'
                      )}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <div className="space-y-2">
                    <h1 className="text-[32px] sm:text-[42px] lg:text-[48px] font-extrabold text-white leading-[1.08] tracking-[-0.02em]">
                      {service.title[lang]}
                    </h1>
                    <p className="text-[15px] sm:text-[17px] font-normal text-slate-200/95 leading-[1.55] max-w-[500px]">
                      {service.headline[lang]}
                    </p>
                  </div>

                  {/* Hero Key Bullet Points */}
                  <ul className="space-y-1.5 pt-1 text-[13px] sm:text-[13.5px] text-slate-300">
                    {service.heroPoints.map((pt) => (
                      <li key={pt[lang]} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#F4CB64] shrink-0" />
                        <span>{pt[lang]}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Pill CTA Pair */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setModal({ type: 'quote', solutionId: serviceId })}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#08193D] text-[14px] sm:text-[15px] font-bold shadow-[0_6px_22px_-2px_rgba(235,180,58,0.52)] transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer min-h-[44px] whitespace-nowrap"
                    >
                      <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>
                        {t3(
                          lang,
                          'Demander une étude personnalisée',
                          'Request a tailored study',
                          'طلب دراسة مخصصة'
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Key Quantitative Trust Metrics Strip */}
        <section
          aria-label={t3(lang, 'Chiffres clés', 'Key Facts', 'مؤشرات وأرقام رئيسية')}
          className="bg-white border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x rtl:sm:divide-x-reverse divide-[#E8EEF7]">
            {service.stats.concat([
              {
                value: AMEKRAN_PHONE,
                label: {
                  fr: 'Numéro d’assistance et déclaration AMEKRAN 24h/7j',
                  en: 'AMEKRAN 24/7 assistance & claims call center',
                  ar: 'رقم المساعدة والتصريح بـ AMEKRAN على مدار 24/7',
                },
              },
            ]).map((item) => (
              <div
                key={item.value + item.label.fr}
                className="pt-3 sm:pt-0 sm:pl-6 rtl:sm:pl-0 rtl:sm:pr-6 first:pl-0 first:pt-0 rtl:first:pr-0"
              >
                <p className="text-[22px] sm:text-[26px] font-extrabold text-[#0B1E40] tabular-nums tracking-tight">
                  {item.value}
                </p>
                <p className="text-[12.5px] sm:text-[13px] font-medium text-[#4A5E7F] mt-0.5 leading-snug">
                  {item.label[lang]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Core Coverages Editorial Grid */}
        <section
          aria-label={t3(lang, 'Garanties du contrat', 'Coverages', 'ضمانات العقد')}
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
                  `Les garanties complètes AMEKRAN · ${service.title.fr}`,
                  `Complete AMEKRAN Cover · ${service.title.en}`,
                  `الضمانات الشاملة لـ AMEKRAN · ${service.title.ar}`
                )}
              </h2>
              <div
                aria-hidden="true"
                className="h-[1.5px] flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-[#D99E26]"
              />
            </div>
            <p className="text-center text-[15px] text-[#4B5F80] max-w-2xl mx-auto mb-10">
              {service.summary[lang]}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {service.coverages.map((cov, idx) => {
                const Icon = ENTERPRISE_ICONS[cov.icon] ?? Shield;
                return (
                  <motion.article
                    key={cov.title.fr}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="rounded-[22px] border border-[#DCE5F2] bg-[#FAFBFD] hover:bg-white hover:border-[#D99E26]/70 p-6 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[13px] font-extrabold text-[#B57D14] tabular-nums">
                          0{idx + 1}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-[#0B1E40] text-[#F4CB64] flex items-center justify-center border border-[#D99E26]/30">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-[18px] font-extrabold text-[#0B1E40] leading-snug mb-2">
                        {cov.title[lang]}
                      </h3>
                      <p className="text-[14px] text-[#455A7D] leading-[1.6]">
                        {cov.body[lang]}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. 4-Step Agency Method in Tangier */}
        <section
          aria-label={t3(lang, 'Méthode d’accompagnement', 'Our Process', 'منهجية المواكبة')}
          className="bg-[#F6F9FD] py-14 lg:py-18 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#B57D14] mb-2">
                {t3(lang, 'Accompagnement de proximité', 'Local Agency Support', 'مواكبة القرب بطنجة')}
              </p>
              <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#0B1E40] tracking-tight">
                {t3(
                  lang,
                  'Comment AMEKRAN Assurances déploie votre contrat AMEKRAN',
                  'How AMEKRAN Assurances rolls out your AMEKRAN policy',
                  'كيف تطبق أمكران للتأمينات عقد AMEKRAN الخاص بكم'
                )}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.steps.map((st, idx) => (
                <div
                  key={st.title.fr}
                  className="bg-white rounded-[20px] p-6 border border-[#DCE5F2] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-[#FFF7E2] border border-[#D99E26]/40 text-[#B57D14] font-extrabold text-[15px] flex items-center justify-center mb-4">
                      {idx + 1}
                    </div>
                    <h3 className="text-[16.5px] font-extrabold text-[#0B1E40] mb-2">
                      {st.title[lang]}
                    </h3>
                    <p className="text-[13.5px] text-[#455A7D] leading-relaxed">
                      {st.body[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Agency & Official AMEKRAN Connection Split */}
        <section
          aria-label={t3(lang, 'Partenariat officiel AMEKRAN', 'Official AMEKRAN Partnership', 'الشراكة الرسمية مع AMEKRAN')}
          className="bg-white py-14 lg:py-18 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[380px] rounded-[24px] overflow-hidden border border-[#DCE5F2]">
              <Image
                src={agencyTeamImg}
                alt="Agence AMEKRAN Assurances Tanger"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div>
                <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#B57D14] mb-2">
                  {t3(lang, 'Assureur Agréé', 'Licensed Insurer', 'شركة تأمين معتمدة')}
                </p>
                <h2 className="text-[24px] sm:text-[32px] font-extrabold text-[#0B1E40] leading-tight tracking-tight">
                  {t3(
                    lang,
                    'La solidité nationale de AMEKRAN, l’écoute d’un cabinet conseil à Tanger',
                    'National strength of AMEKRAN, dedicated counsel in Tangier',
                    'قوة AMEKRAN على الصعيد الوطني، وخبرة مكتب استشارة بطنجة'
                  )}
                </h2>
              </div>

              <p className="text-[14.5px] text-[#455A7D] leading-relaxed">
                {t3(
                  lang,
                  'AMEKRAN Assurances agit en qualité d’Agent Général exclusif de AMEKRAN Assurances (AMEKRAN Assurances) à Tanger. Vos contrats bénéficient de la solidité financière du premier assureur marocain, avec une gestion directe de vos dossiers et sinistres en agence sans intermédiaire inutile.',
                  'AMEKRAN Assurances is your insurer in Tangier. Your policies benefit from direct local claims management and a dedicated team, without unnecessary intermediaries.',
                  'أمكران للتأمينات هي شركة تأمينكم بطنجة. تستفيد عقودكم من تدبير محلي مباشر لملفاتكم وحوادثكم بالوكالة، مع فريق مخصص ودون وسطاء غير ضروريين.'
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setModal({ type: 'quote', solutionId: serviceId })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B1E40] hover:bg-[#132E5E] text-white text-[14px] font-bold transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>
                    {t3(lang, 'Prendre rendez-vous avec un conseiller', 'Book an appointment with an advisor', 'حجز موعد مع مستشار')}
                  </span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FAQ Accordion */}
        <section
          id="faq"
          aria-label={t3(lang, 'Questions fréquentes', 'Frequently Asked Questions', 'الأسئلة الشائعة')}
          className="bg-[#F6F9FC] py-14 sm:py-16 lg:py-20"
        >
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
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
                  `Règles et conditions AMEKRAN pour l’assurance ${service.title.fr}`,
                  `AMEKRAN terms and conditions for ${service.title.en}`,
                  `شروط وقواعد AMEKRAN لتأمين ${service.title.ar}`
                )}
              </p>
            </div>

            <div className="space-y-4">
              {(showAllFaqs ? service.faqs : service.faqs.slice(0, 3)).map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.question.fr}
                    className={`bg-white rounded-[16px] border transition-all duration-200 ${
                      isOpen
                        ? 'border-[#D99E26]/55 shadow-[0_10px_28px_-8px_rgba(11,30,64,0.12)]'
                        : 'border-[#E6EDF5] shadow-[0_6px_20px_-8px_rgba(11,30,64,0.08)] hover:border-[#CFDCEB]'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
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
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 sm:px-7 pb-5 pt-2 text-[14.5px] text-[#455A7D] leading-relaxed border-t border-[#EFF4FA]">
                        {faq.answer[lang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {service.faqs.length > 3 && (
              <div className="mt-9 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs((prev) => !prev)}
                  className="px-7 py-3.5 rounded-xl bg-[#0B1E40] hover:bg-[#132C5C] text-white text-[14.5px] font-semibold shadow-[0_8px_20px_-6px_rgba(11,30,64,0.35)] transition-all duration-150 hover:-translate-y-0.5 cursor-pointer min-h-[46px]"
                >
                  {showAllFaqs
                    ? t3(lang, 'Réduire les questions fréquentes', 'Show fewer questions', 'عرض أسئلة أقل')
                    : t3(lang, 'Afficher toutes les questions fréquentes', 'View all frequently asked questions', 'عرض جميع الأسئلة الشائعة')}
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
