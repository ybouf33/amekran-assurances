'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  FileText,
  Printer,
  Send,
  X,
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
  type Language,
  type SolutionId,
  solutionPath,
  swapLocale,
} from '@/lib/insurance';
import {
  BUSINESS_DOMAINS,
  CORPORATE_PUBLICATIONS,
  KEY_FIGURES_NETWORK,
  KEY_FIGURES_PORTFOLIO,
  KEY_INDICATORS,
  TEAM_DIRECTORS,
  calculateBarHeightPercent,
  clampTeamStartIndex,
  getTeamMaxStartIndex,
  getVisibleTimelineMilestones,
  type CorporatePublication,
} from '@/lib/about';

import heroCorpImg from '@/src/assets/images/about_hero_corporate_1794761077914.jpg';
import metierFamilyImg from '@/src/assets/images/about_metier_family_1794761079560.jpg';
import metierBusinessImg from '@/src/assets/images/about_metier_business_1794761080364.jpg';
import metierAssistanceImg from '@/src/assets/images/about_metier_assistance_1794761079945.jpg';
import joinTeamImg from '@/src/assets/images/about_join_team_1794761081052.jpg';
import teamKarimImg from '@/src/assets/images/team_karim_amekran_1794761080207.jpg';
import teamSalmaImg from '@/src/assets/images/team_salma_benali_1794761081245.jpg';
import teamYoussefImg from '@/src/assets/images/team_youssef_idrissi_1794761082067.jpg';
import teamNadiaImg from '@/src/assets/images/team_nadia_tazi_1794761082775.jpg';
import pubBusinessCover from '@/src/assets/images/hero_business_official_logo.jpg';
import pubPortalCover from '@/src/assets/images/client_portal_agency_1794666348528.jpg';

const METIER_IMAGES: Record<'family' | 'business' | 'assistance', StaticImageData> = {
  family: metierFamilyImg,
  business: metierBusinessImg,
  assistance: metierAssistanceImg,
};

const TEAM_IMAGES: Record<'karim' | 'salma' | 'youssef' | 'nadia', StaticImageData> = {
  karim: teamKarimImg,
  salma: teamSalmaImg,
  youssef: teamYoussefImg,
  nadia: teamNadiaImg,
};

const PUB_COVERS: Record<'business' | 'portal', StaticImageData> = {
  business: pubBusinessCover,
  portal: pubPortalCover,
};

interface AboutPageClientProps {
  initialLang?: Language;
}

export default function AboutPageClient({ initialLang = 'fr' }: AboutPageClientProps = {}) {
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<Language>(initialLang);
  const [modal, setModal] = useState<ActiveModalType>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [timelineExpanded, setTimelineExpanded] = useState(false);
  const [teamStartIndex, setTeamStartIndex] = useState(0);
  const [isDesktopTeam, setIsDesktopTeam] = useState(true);

  const [selectedPublication, setSelectedPublication] =
    useState<CorporatePublication | null>(null);
  const [recruitmentOpen, setRecruitmentOpen] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateRole, setCandidateRole] = useState('Conseiller Commercial');
  const [candidateError, setCandidateError] = useState('');
  const [candidateSent, setCandidateSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => (prev ? y > 8 : y > 40));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => {
      const desktop = mq.matches;
      setIsDesktopTeam(desktop);
      setTeamStartIndex((prev) =>
        clampTeamStartIndex(prev, TEAM_DIRECTORS.length, desktop ? 3 : 1)
      );
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const visibleCount = isDesktopTeam ? 3 : 1;
  const maxTeamIndex = getTeamMaxStartIndex(TEAM_DIRECTORS.length, visibleCount);
  const visibleDirectors = TEAM_DIRECTORS.slice(
    teamStartIndex,
    teamStartIndex + visibleCount
  );
  const visibleMilestones = getVisibleTimelineMilestones(timelineExpanded);

  function handleSelectSolution(id: SolutionId) {
    router.push(solutionPath(id, lang));
  }

  function handleSelectSolutionFromNav(id: SolutionId) {
    router.push(solutionPath(id, lang));
  }

  // Language change from the header dropdown, reflected in the URL (/fr /ar /en).
  function handleChangeLang(next: Language) {
    setLang(next);
    router.push(swapLocale(pathname, next));
  }

  function handleCandidateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (candidateName.trim().length < 2) {
      setCandidateError(
        lang === 'fr'
          ? 'Veuillez saisir votre nom complet.'
          : 'Please enter your full name.'
      );
      return;
    }
    if (!candidateEmail.includes('@') || !candidateEmail.includes('.')) {
      setCandidateError(
        lang === 'fr'
          ? 'Veuillez saisir une adresse e-mail valide.'
          : 'Please enter a valid email address.'
      );
      return;
    }
    setCandidateError('');
    setCandidateSent(true);
  }

  return (
    <div id="top" className="min-h-dvh flex flex-col bg-white overflow-x-clip">
      <header className="sticky top-0 z-40 shrink-0 bg-white">
        <motion.div
          initial={false}
          animate={{ height: isScrolled ? 0 : 'auto', opacity: isScrolled ? 0 : 1 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
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
          activeNav="accueil"
          onSelectHome={() => router.push(`/${lang}`)}
          onSelectSolution={handleSelectSolutionFromNav}
          onOpenAdvice={() => router.push(`/${lang}/conseils`)}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
          onOpenClientPortal={() => router.push(`/${lang}/#espace-client`)}
        />
      </header>

      <main className="flex-1 flex flex-col">
        {/* 1. Corporate Hero Card matching RMA curved navy-to-photo composition */}
        <section
          aria-label={
            lang === 'fr'
              ? 'À propos de Amekran Assurances'
              : 'About Amekran Assurances'
          }
          className="pt-6 pb-8 lg:pt-8 lg:pb-12 bg-white"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[28px] overflow-hidden bg-[#13234E] text-white shadow-[0_18px_45px_-12px_rgba(11,30,64,0.28)] flex flex-col lg:flex-row min-h-[380px] lg:min-h-[430px]">
              {/* Left Navy Copy Column */}
              <div className="relative z-20 w-full lg:w-[55%] p-7 sm:p-11 lg:py-14 lg:pl-14 lg:pr-8 flex flex-col justify-center">
                <h1 className="text-[26px] sm:text-[34px] lg:text-[42px] font-extrabold leading-[1.14] tracking-[-0.015em] text-balance mb-5">
                  {lang === 'fr'
                    ? "Amekran Assurances, un cabinet tourné vers l'avenir"
                    : 'Amekran Assurances, an Agency Focused on the Future'}
                </h1>
                <p className="text-[14.5px] sm:text-[15.5px] text-slate-200 leading-[1.7] max-w-[540px]">
                  {lang === 'fr'
                    ? "Fidèle à sa promesse : protéger les biens, les familles et les entreprises pour leur permettre d'évoluer dans un monde plus serein, Amekran Assurances met à la disposition de ses assurés à Tanger des couvertures sur mesure adaptées à chaque étape de leur parcours. Pour garantir un accompagnement d'excellence, notre cabinet s'appuie sur plus de 20 ans d'expertise terrain, la solidité de RMA Assurance et une équipe dédiée à la proximité."
                    : 'True to its promise—protecting assets, families, and businesses so they thrive with peace of mind—Amekran Assurances delivers tailored policies in Tangier at every stage. Backed by over 20 years of local expertise and the strength of RMA Assurance, our team combines technical rigor with personal proximity.'}
                </p>
              </div>

              {/* Right Curved Executive Photograph */}
              <div className="relative w-full lg:w-[49%] min-h-[250px] sm:min-h-[300px] lg:min-h-full lg:-ml-12 shrink-0">
                <Image
                  src={heroCorpImg}
                  alt={
                    lang === 'fr'
                      ? 'Direction Amekran Assurances dans nos bureaux à Tanger'
                      : 'Amekran Assurances leadership in Tangier offices'
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
                {/* Sweeping curved navy divider matching reference */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 440"
                  preserveAspectRatio="none"
                  className="hidden lg:block absolute inset-y-0 -left-1 w-28 h-full z-10 pointer-events-none"
                >
                  <path
                    d="M0,0 L74,0 C120,145 120,295 34,440 L0,440 Z"
                    fill="#13234E"
                  />
                </svg>
                <div className="lg:hidden absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#13234E] to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Presentation Split Card with Left Emblem Watermark */}
        <section
          aria-label={
            lang === 'fr'
              ? 'Présentation de Amekran Assurances'
              : 'Company Presentation'
          }
          className="py-6 lg:py-8 bg-white"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.article
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45 }}
              className="relative bg-white border border-[#DCE5F2] rounded-[28px] overflow-hidden shadow-[0_14px_40px_-10px_rgba(11,30,64,0.12)] flex flex-col lg:flex-row items-stretch"
            >
              {/* Left Watermark Surface */}
              <div className="relative w-full lg:w-[46%] min-h-[240px] lg:min-h-[340px] bg-[#EEF2FA] overflow-hidden shrink-0 flex items-center justify-center">
                <div className="relative w-[270px] h-[280px] sm:w-[320px] sm:h-[330px] lg:w-[350px] lg:h-[360px]">
                  <Image
                    src="/amekran-logo-watermark.svg"
                    alt="Emblème Lion Amekran Assurances"
                    fill
                    sizes="(max-width: 1024px) 320px, 360px"
                    referrerPolicy="no-referrer"
                    className="object-contain"
                  />
                </div>
                {/* Soft white curved sweep on desktop */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 110 360"
                  preserveAspectRatio="none"
                  className="hidden lg:block absolute inset-y-0 right-0 w-24 h-full z-10 pointer-events-none"
                >
                  <path
                    d="M110,0 L48,0 C0,120 0,240 68,360 L110,360 Z"
                    fill="#FFFFFF"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/60 lg:hidden" />
              </div>

              {/* Right Text Presentation */}
              <div className="relative z-10 flex-1 p-7 sm:p-11 lg:py-14 lg:pr-14 lg:pl-6 flex flex-col justify-center space-y-5">
                <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-extrabold text-[#13234E] leading-[1.18]">
                  {lang === 'fr'
                    ? 'Présentation de Amekran Assurances'
                    : 'About Amekran Assurances'}
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#223555] leading-[1.7]">
                  {lang === 'fr'
                    ? "Forte de plus de 20 ans d'existence sur le marché tangérois, Amekran Assurances, Agent Général RMA Assurance de référence à Tanger, est reconnue pour son sérieux, la solidité de ses conseils et sa maîtrise des risques complexes."
                    : 'With over 20 years in the Tangier market, Amekran Assurances, a trusted RMA Assurance General Agent, is recognized for rigorous underwriting advice and technical mastery of personal and commercial risks.'}
                </p>
                <p className="text-[14.5px] sm:text-[15.5px] text-[#3A4E72] leading-[1.7]">
                  {lang === 'fr'
                    ? "Cabinet généraliste et spécialiste du transport poids lourds, nos 18 conseillers mettent leur expertise au service de la satisfaction de milliers d'assurés au quotidien, dans l'accomplissement de leurs projets personnels et professionnels."
                    : 'Serving both individuals and specialized heavy haulage operators, our 18 advisors bring daily expertise and responsive care to thousands of personal and corporate policyholders.'}
                </p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* 3. Interactive Vertical Timeline ("Historique") */}
        <section
          aria-label={lang === 'fr' ? 'Historique' : 'Our History'}
          className="py-12 lg:py-16 bg-white"
        >
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#13234E] text-center mb-10 lg:mb-12">
              {lang === 'fr' ? 'Historique' : 'History'}
            </h2>

            <div className="relative">
              {/* Vertical Spine */}
              <div
                aria-hidden="true"
                className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1.5px] bg-[#C8D3E8] md:-translate-x-1/2"
              />

              <div className="space-y-6 lg:space-y-7">
                {visibleMilestones.map((item, idx) => {
                  const isLeft = idx % 2 === 0;
                  return (
                    <div
                      key={item.year}
                      className={`relative flex items-center md:justify-between ${
                        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Timeline Node Dot */}
                      <span
                        aria-hidden="true"
                        className="absolute left-4 md:left-1/2 w-3.5 h-3.5 rounded-full bg-[#13234E] border-[3px] border-white shadow-[0_0_0_2px_rgba(217,158,38,0.45)] -translate-x-1/2 z-10"
                      />

                      {/* Card */}
                      <div
                        className={`ml-10 md:ml-0 w-full md:w-[calc(50%-28px)] bg-[#EEF2FA] border border-[#DCE5F2] rounded-2xl p-5 sm:p-6 ${
                          isLeft ? 'md:text-left' : 'md:text-left'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3 mb-1.5">
                          <span className="text-[20px] font-extrabold text-[#13234E] tabular-nums">
                            {item.year}
                          </span>
                          <span className="text-[12.5px] font-bold text-[#9C6C11]">
                            {item.title[lang]}
                          </span>
                        </div>
                        <p className="text-[14px] text-[#35486B] leading-[1.6]">
                          {item.description[lang]}
                        </p>
                      </div>

                      <div className="hidden md:block md:w-[calc(50%-28px)]" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-9 flex justify-center">
              <button
                type="button"
                onClick={() => setTimelineExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#13234E] hover:bg-[#0B1E40] text-white text-[14px] font-bold shadow-sm transition-colors cursor-pointer min-h-[44px]"
              >
                <span>
                  {timelineExpanded
                    ? lang === 'fr'
                      ? 'Afficher Moins'
                      : 'Show Less'
                    : lang === 'fr'
                      ? 'Afficher Plus'
                      : 'Show More'}
                </span>
                {timelineExpanded ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 4. Dark Navy Key Indicators Card ("Indicateurs clés") */}
        <section
          aria-label={lang === 'fr' ? 'Indicateurs clés' : 'Key Indicators'}
          className="py-6 lg:py-10 bg-white"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#13234E] via-[#10204A] to-[#081538] text-white shadow-[0_18px_45px_-10px_rgba(11,30,64,0.3)] p-7 sm:p-11 lg:p-14 flex flex-col lg:flex-row items-center gap-10">
              {/* Left Watermark Crest */}
              <div
                aria-hidden="true"
                className="hidden lg:flex relative w-[38%] min-h-[300px] items-center justify-center pointer-events-none select-none overflow-hidden"
              >
                <div className="relative w-[310px] h-[320px] brightness-150 opacity-95">
                  <Image
                    src="/amekran-logo-watermark.svg"
                    alt=""
                    fill
                    sizes="320px"
                    referrerPolicy="no-referrer"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right Grouped Bar Chart Area */}
              <div className="relative z-10 flex-1 w-full flex flex-col items-center">
                <h2 className="text-[24px] sm:text-[30px] font-extrabold text-white text-center mb-8">
                  {lang === 'fr' ? 'Indicateurs clés' : 'Key Indicators'}
                </h2>

                <div className="w-full max-w-[600px] grid grid-cols-3 gap-5 sm:gap-8 items-end pt-4 pb-3 border-b border-white/15">
                  {KEY_INDICATORS.map((series) => {
                    const prevH = calculateBarHeightPercent(series.valuePrev, 100);
                    const currH = calculateBarHeightPercent(series.valueCurr, 100);
                    return (
                      <div
                        key={series.id}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="flex items-end justify-center gap-2.5 sm:gap-3.5 h-[168px] w-full">
                          {/* 2023 Bar */}
                          <div className="flex flex-col items-center justify-end h-full">
                            <span className="text-[12px] sm:text-[13px] font-semibold text-slate-300 tabular-nums mb-1.5">
                              {series.valuePrev}
                            </span>
                            <div
                              style={{ height: `${Math.max(24, prevH)}%` }}
                              className="w-7 sm:w-9 rounded-t-md bg-[#8E9BD0]"
                            />
                            <span className="text-[11px] font-semibold text-slate-300 mt-2 tabular-nums">
                              {series.yearPrevLabel}
                            </span>
                          </div>

                          {/* 2024 Bar */}
                          <div className="flex flex-col items-center justify-end h-full">
                            <span className="text-[12px] sm:text-[13px] font-bold text-[#F6D36E] tabular-nums mb-1.5">
                              {series.valueCurr}
                            </span>
                            <div
                              style={{ height: `${Math.max(24, currH)}%` }}
                              className="w-7 sm:w-9 rounded-t-md bg-gradient-to-b from-[#F6D36E] to-[#D99E26]"
                            />
                            <span className="text-[11px] font-bold text-white mt-2 tabular-nums">
                              {series.yearCurrLabel}
                            </span>
                          </div>
                        </div>

                        <p className="text-[12px] sm:text-[13px] font-medium text-slate-200 text-center leading-snug">
                          {series.label[lang]}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[12px] text-slate-300 mt-5 text-center">
                  {lang === 'fr'
                    ? "*Chiffres consolidés de l'agence Amekran Assurances à Tanger (en Millions de Dirhams pour le volume)"
                    : '*Consolidated indicators for Amekran Assurances Tangier (volume in Million Dirhams)'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Nos métiers (3-Column Light Lavender Band with Editorial Photo Cards) */}
        <section
          aria-label={lang === 'fr' ? 'Nos métiers' : 'Our Core Expertise'}
          className="py-14 lg:py-16 bg-[#EEF2FA] mt-6"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#13234E] text-center mb-10">
              {lang === 'fr' ? 'Nos métiers' : 'Our Core Expertise'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {BUSINESS_DOMAINS.map((domain) => (
                <article
                  key={domain.id}
                  className="bg-white rounded-[22px] border border-[#DCE5F2] shadow-[0_10px_28px_-8px_rgba(11,30,64,0.08)] p-5 sm:p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-5 bg-[#E6ECF6]">
                      <Image
                        src={METIER_IMAGES[domain.imageKey]}
                        alt={domain.title[lang]}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        referrerPolicy="no-referrer"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-[18px] sm:text-[19px] font-extrabold text-[#13234E] leading-[1.3] mb-3">
                      {domain.title[lang]}
                    </h3>
                    <p className="text-[14px] text-[#35486B] leading-[1.68]">
                      {domain.description[lang]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        if (domain.actionType === 'contact') {
                          setModal({ type: 'contact' });
                        } else if (domain.actionType === 'particuliers') {
                          handleSelectSolution('automobile');
                        } else {
                          handleSelectSolution('entreprises');
                        }
                      }}
                      className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#13234E] hover:text-[#B57D14] transition-colors cursor-pointer"
                    >
                      <span>{domain.actionLabel[lang]}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Chiffres clés (Two-Row Metric Strips matching RMA architecture) */}
        <section
          aria-label={lang === 'fr' ? 'Chiffres clés' : 'Key Figures'}
          className="py-14 lg:py-16 bg-white"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#13234E] text-center mb-4">
              {lang === 'fr' ? 'Chiffres clés' : 'Key Figures'}
            </h2>

            {/* Strip 1: Navy Agency Network Strip */}
            <div className="rounded-[24px] bg-gradient-to-r from-[#13234E] via-[#0E1E46] to-[#081538] text-white p-7 sm:p-9 shadow-[0_12px_32px_-8px_rgba(11,30,64,0.22)]">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {KEY_FIGURES_NETWORK.map((metric) => (
                  <div key={metric.id} className="text-center space-y-1.5">
                    <p className="text-[28px] sm:text-[36px] font-extrabold text-[#F6D36E] tabular-nums leading-none">
                      {metric.value}
                    </p>
                    <p className="text-[13.5px] sm:text-[14.5px] font-medium text-slate-200">
                      {metric.label[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strip 2: Light Portfolio Strip */}
            <div className="rounded-[24px] bg-[#F6F8FC] border border-[#DCE5F2] text-[#13234E] p-7 sm:p-9">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {KEY_FIGURES_PORTFOLIO.map((metric) => (
                  <div key={metric.id} className="text-center space-y-1.5">
                    <p className="text-[28px] sm:text-[36px] font-extrabold text-[#13234E] tabular-nums leading-none">
                      {metric.value}
                    </p>
                    <p className="text-[13.5px] sm:text-[14.5px] font-medium text-[#35486B]">
                      {metric.label[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Équipe dirigeante (Deep Navy Leadership Portrait Carousel) */}
        <section
          aria-label={lang === 'fr' ? 'Équipe dirigeante' : 'Leadership Team'}
          className="py-14 lg:py-16 bg-[#13234E] text-white"
        >
          <div className="max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-white text-center mb-10">
              {lang === 'fr' ? 'Équipe dirigeante' : 'Leadership Team'}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
              {visibleDirectors.map((director) => (
                <article
                  key={director.id}
                  className="bg-white text-[#13234E] rounded-[22px] p-6 sm:p-7 shadow-[0_14px_34px_-10px_rgba(4,12,30,0.45)] flex flex-col"
                >
                  <div className="relative aspect-square w-full max-w-[230px] mx-auto rounded-2xl overflow-hidden bg-[#F3F5FA] border border-slate-200/80 mb-5">
                    <Image
                      src={TEAM_IMAGES[director.imageKey]}
                      alt={director.name}
                      fill
                      sizes="(max-width: 1024px) 230px, 230px"
                      referrerPolicy="no-referrer"
                      className="object-cover object-top"
                    />
                  </div>
                  <h3 className="text-[19px] font-extrabold text-[#13234E]">
                    {director.name}
                  </h3>
                  <p className="text-[13px] font-bold text-[#B57D14] mt-0.5 mb-3">
                    {director.role[lang]}
                  </p>
                  <p className="text-[13.5px] text-[#35486B] leading-[1.65]">
                    {director.bio[lang]}
                  </p>
                </article>
              ))}
            </div>

            {/* Carousel Arrows + Dots */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setTeamStartIndex((prev) =>
                    clampTeamStartIndex(
                      prev === 0 ? maxTeamIndex : prev - 1,
                      TEAM_DIRECTORS.length,
                      visibleCount
                    )
                  )
                }
                aria-label={
                  lang === 'fr' ? 'Membre précédent' : 'Previous member'
                }
                className="w-10 h-10 rounded-full border border-white/25 hover:border-[#F6D36E] bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: maxTeamIndex + 1 }).map((_, idx) => {
                  const active = idx === teamStartIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTeamStartIndex(idx)}
                      aria-label={
                        lang === 'fr'
                          ? `Afficher page équipe ${idx + 1}`
                          : `Show team page ${idx + 1}`
                      }
                      aria-current={active ? 'true' : undefined}
                      className={`h-2.5 rounded-full transition-all cursor-pointer ${
                        active
                          ? 'w-7 bg-[#F6D36E]'
                          : 'w-2.5 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  setTeamStartIndex((prev) =>
                    clampTeamStartIndex(
                      prev >= maxTeamIndex ? 0 : prev + 1,
                      TEAM_DIRECTORS.length,
                      visibleCount
                    )
                  )
                }
                aria-label={lang === 'fr' ? 'Membre suivant' : 'Next member'}
                className="w-10 h-10 rounded-full border border-white/25 hover:border-[#F6D36E] bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* 8. Nous rejoindre Split Card */}
        <section
          aria-label={lang === 'fr' ? 'Nous rejoindre' : 'Join Us'}
          className="py-14 lg:py-16 bg-white"
        >
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
            <article className="bg-white border border-[#DCE5F2] rounded-[28px] shadow-[0_16px_42px_-12px_rgba(11,30,64,0.12)] p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="relative w-full lg:w-[46%] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 bg-[#EEF2FA]">
                <Image
                  src={joinTeamImg}
                  alt={
                    lang === 'fr'
                      ? 'Équipe Amekran Assurances à Tanger'
                      : 'Amekran Assurances team in Tangier'
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-5">
                <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#13234E]">
                  {lang === 'fr' ? 'Nous rejoindre' : 'Join Our Team'}
                </h2>
                <p className="text-[15px] sm:text-[16px] text-[#35486B] leading-[1.7]">
                  {lang === 'fr'
                    ? "Chez Amekran Assurances, nous cultivons une dynamique d'équipe exigeante et bienveillante permettant l'épanouissement de chaque talent. Nous construisons au quotidien un environnement professionnel fondé sur l'engagement, l'excellence technique et le sens du service aux assurés de Tanger."
                    : 'At Amekran Assurances, we foster an ambitious, collaborative workplace dedicated to professional growth. Every day we build a culture rooted in commitment, technical excellence, and dedicated service to policyholders in Tangier.'}
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCandidateSent(false);
                      setCandidateError('');
                      setRecruitmentOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#13234E] hover:bg-[#0B1E40] text-white text-[14.5px] font-bold shadow-sm transition-colors cursor-pointer min-h-[44px]"
                  >
                    <span>
                      {lang === 'fr' ? 'Rejoignez-nous !' : 'Join Us!'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* 9. Publications & Documents */}
        <section
          aria-label={
            lang === 'fr'
              ? 'Publications et documents institutionnels'
              : 'Publications & Institutional Documents'
          }
          className="pb-16 pt-4 bg-white"
        >
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#13234E] text-center mb-10">
              {lang === 'fr'
                ? 'Publications & Documents'
                : 'Publications & Documents'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {CORPORATE_PUBLICATIONS.map((pub) => (
                <article
                  key={pub.id}
                  className="bg-[#F8FAFD] border border-[#DCE5F2] rounded-[22px] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 shadow-[0_8px_24px_-8px_rgba(11,30,64,0.08)]"
                >
                  <div className="relative w-full sm:w-44 aspect-[4/3] rounded-xl overflow-hidden shrink-0 bg-[#13234E]">
                    <Image
                      src={PUB_COVERS[pub.coverKey]}
                      alt={pub.title[lang]}
                      fill
                      sizes="(max-width: 640px) 100vw, 176px"
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <p className="text-[12px] font-semibold text-[#5B6E99] mb-1">
                        {pub.year} · {pub.pages}
                      </p>
                      <h3 className="text-[17px] sm:text-[18px] font-extrabold text-[#13234E] leading-snug">
                        {pub.title[lang]}
                      </h3>
                      <p className="text-[13.5px] text-[#35486B] mt-1.5 leading-relaxed">
                        {pub.subtitle[lang]}
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelectedPublication(pub)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#13234E] hover:bg-[#D99E26] text-white hover:text-[#0B1E40] text-[13px] font-bold transition-colors cursor-pointer min-h-[40px]"
                      >
                        <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>
                          {lang === 'fr' ? 'Télécharger / Lire' : 'Download / Read'}
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
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

      {/* Publication Reader Dialog */}
      {selectedPublication && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPublication.title[lang]}
          className="fixed inset-0 z-50 bg-[#071636]/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#EEF2FA] text-[#13234E] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[12px] font-semibold text-[#5B6E99]">
                    Amekran Assurances · {selectedPublication.year} ·{' '}
                    {selectedPublication.pages}
                  </p>
                  <h3 className="text-[18px] font-extrabold text-[#13234E]">
                    {selectedPublication.title[lang]}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPublication(null)}
                aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
                className="w-9 h-9 rounded-full hover:bg-slate-100 text-[#13234E] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[14px] text-[#35486B] leading-relaxed">
              {selectedPublication.subtitle[lang]}
            </p>

            <ul className="space-y-2.5 bg-[#F8FAFD] border border-[#DCE5F2] rounded-2xl p-4">
              {selectedPublication.highlights[lang].map((point) => (
                <li
                  key={point}
                  className="text-[13.5px] text-[#13234E] font-medium flex items-start gap-2.5"
                >
                  <ArrowRight
                    className="w-4 h-4 text-[#D99E26] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-[13.5px] font-bold text-[#13234E] hover:bg-slate-50 cursor-pointer min-h-[42px]"
              >
                <Printer className="w-4 h-4" aria-hidden="true" />
                <span>{lang === 'fr' ? 'Imprimer / PDF' : 'Print / PDF'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedPublication(null);
                  setModal({ type: 'contact' });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#13234E] hover:bg-[#0B1E40] text-white text-[13.5px] font-bold cursor-pointer min-h-[42px]"
              >
                <span>
                  {lang === 'fr' ? 'Contacter un conseiller' : 'Contact Advisor'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recruitment Application Dialog */}
      {recruitmentOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'fr' ? 'Candidature spontanée' : 'Job Application'}
          className="fixed inset-0 z-50 bg-[#071636]/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-[20px] font-extrabold text-[#13234E]">
                {lang === 'fr'
                  ? 'Rejoindre Amekran Assurances'
                  : 'Join Amekran Assurances'}
              </h3>
              <button
                type="button"
                onClick={() => setRecruitmentOpen(false)}
                aria-label={lang === 'fr' ? 'Fermer' : 'Close'}
                className="w-9 h-9 rounded-full hover:bg-slate-100 text-[#13234E] flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {candidateSent ? (
              <div className="space-y-4 py-2">
                <p className="text-[14.5px] text-[#13234E] font-semibold">
                  {lang === 'fr'
                    ? `Merci ${candidateName}. Votre candidature pour le poste « ${candidateRole} » a bien été enregistrée par notre direction à Tanger.`
                    : `Thank you ${candidateName}. Your application for "${candidateRole}" has been received by our Tangier office.`}
                </p>
                <button
                  type="button"
                  onClick={() => setRecruitmentOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#13234E] text-white text-[14px] font-bold cursor-pointer min-h-[44px]"
                >
                  {lang === 'fr' ? 'Fermer' : 'Close'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleCandidateSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="candidate-name"
                    className="block text-[13px] font-bold text-[#13234E] mb-1"
                  >
                    {lang === 'fr' ? 'Nom complet' : 'Full Name'}
                  </label>
                  <input
                    id="candidate-name"
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder={
                      lang === 'fr' ? 'Ex : Mohamed El Amrani' : 'e.g. Sara Alami'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[14px] text-[#13234E] focus:outline-2 focus:outline-[#D99E26]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="candidate-email"
                    className="block text-[13px] font-bold text-[#13234E] mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="candidate-email"
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="nom@exemple.ma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[14px] text-[#13234E] focus:outline-2 focus:outline-[#D99E26]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="candidate-role"
                    className="block text-[13px] font-bold text-[#13234E] mb-1"
                  >
                    {lang === 'fr' ? 'Pôle souhaité' : 'Preferred Department'}
                  </label>
                  <select
                    id="candidate-role"
                    value={candidateRole}
                    onChange={(e) => setCandidateRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-[14px] text-[#13234E] bg-white focus:outline-2 focus:outline-[#D99E26]"
                  >
                    <option value="Conseiller Commercial">
                      {lang === 'fr'
                        ? 'Conseiller Commercial Particuliers'
                        : 'Individual Sales Advisor'}
                    </option>
                    <option value="Souscripteur Flottes & Entreprises">
                      {lang === 'fr'
                        ? 'Souscripteur Flottes & Entreprises'
                        : 'Corporate & Fleet Underwriter'}
                    </option>
                    <option value="Gestionnaire Sinistres & Santé">
                      {lang === 'fr'
                        ? 'Gestionnaire Sinistres & Santé'
                        : 'Claims & Health Coordinator'}
                    </option>
                  </select>
                </div>

                {candidateError && (
                  <p className="text-[13px] font-semibold text-red-700">
                    {candidateError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#13234E] hover:bg-[#0B1E40] text-white text-[14px] font-bold cursor-pointer min-h-[44px]"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {lang === 'fr'
                      ? 'Envoyer ma candidature'
                      : 'Submit Application'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
