'use client';

import { useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Globe,
  MessageCircle,
  Truck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { gsap, useGSAP } from '@/lib/gsap';
import heroAuto from '@/src/assets/images/hero_auto_tangier_amekran_1794666685553.jpg';
import heroWorkplace from '@/src/assets/images/hero_workplace_tangier_amekran_1794666686780.jpg';
import heroHealth from '@/src/assets/images/hero_health_tangier_amekran_1794666688620.jpg';
import heroHome from '@/src/assets/images/hero_home_tangier_amekran_1794666689719.jpg';
import heroTrucks from '@/src/assets/images/hero_poids_lourds_tangier_1794665880265.jpg';
import heroBusiness from '@/src/assets/images/hero_business_tangier_amekran_1794666689451.jpg';
import heroMarine from '@/src/assets/images/hero_marine_tangier_amekran_1794666691143.jpg';
import {
  INSURANCE_SOLUTIONS,
  t3,
  type Language,
  type SolutionId,
} from '@/lib/insurance';

const SLIDE_IMAGES: Record<
  SolutionId,
  { src: StaticImageData; desktopPos: string; mobilePos: string }
> = {
  automobile: {
    src: heroAuto,
    desktopPos: 'object-[78%_52%]',
    mobilePos: 'object-[70%_52%]',
  },
  'accidents-travail': {
    src: heroWorkplace,
    desktopPos: 'object-[76%_46%]',
    mobilePos: 'object-[68%_45%]',
  },
  'sante-cnss': {
    src: heroHealth,
    desktopPos: 'object-[78%_32%]',
    mobilePos: 'object-[72%_28%]',
  },
  habitation: {
    src: heroHome,
    desktopPos: 'object-[76%_44%]',
    mobilePos: 'object-[68%_44%]',
  },
  'poids-lourds': {
    src: heroTrucks,
    desktopPos: 'object-[76%_46%]',
    mobilePos: 'object-[68%_46%]',
  },
  entreprises: {
    src: heroBusiness,
    desktopPos: 'object-[76%_46%]',
    mobilePos: 'object-[66%_44%]',
  },
  maritime: {
    src: heroMarine,
    desktopPos: 'object-[76%_50%]',
    mobilePos: 'object-[68%_50%]',
  },
};

interface HeroSectionProps {
  lang: Language;
  revealReady?: boolean;
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  onPauseChange?: (paused: boolean) => void;
  onRequestQuote: (solutionId: SolutionId) => void;
  onOpenContact: () => void;
}

/**
 * Slow Ken Burns drift applied to every incoming hero photo. Each slide gets
 * its own component instance (keyed by solution) so the tween restarts from
 * a fresh scale instead of fighting the outgoing frame.
 */
function KenBurnsLayer({
  src,
  alt,
  positionClass,
  sizes,
  priority = false,
}: {
  src: StaticImageData;
  alt: string;
  positionClass: string;
  sizes: string;
  priority?: boolean;
}) {
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!layerRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        layerRef.current,
        { scale: 1.09 },
        { scale: 1, duration: 7.6, ease: 'none', force3D: true }
      );
    },
    { scope: layerRef }
  );

  return (
    <div ref={layerRef} className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading="eager"
        sizes={sizes}
        referrerPolicy="no-referrer"
        className={`object-cover ${positionClass}`}
      />
    </div>
  );
}

export default function HeroSection({
  lang,
  revealReady = false,
  activeIndex,
  onChangeIndex,
  onRequestQuote,
  onOpenContact,
}: HeroSectionProps) {
  const total = INSURANCE_SOLUTIONS.length;
  const safeIndex = ((activeIndex % total) + total) % total;
  const activeSolution = INSURANCE_SOLUTIONS[safeIndex];
  const slideMedia = SLIDE_IMAGES[activeSolution.id];
  const isTrucksSlide = activeSolution.id === 'poids-lourds';

  const sectionRef = useRef<HTMLElement>(null);

  // Hero entrance, choreographed to land exactly as the splash curtain lifts.
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const targets = gsap.utils.toArray<HTMLElement>(
        '[data-hero-intro]',
        sectionRef.current
      );
      if (!targets.length) return;

      // While the splash still covers the page, stage the hero out of view so
      // its entrance starts from a clean state the moment the curtain lifts.
      if (!revealReady) {
        gsap.set(targets, { y: 30, autoAlpha: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.11,
          clearProps: 'transform',
        }
      );
    },
    { scope: sectionRef, dependencies: [revealReady] }
  );

  const handlePrev = () => {
    onChangeIndex((safeIndex - 1 + total) % total);
  };

  const handleNext = () => {
    onChangeIndex((safeIndex + 1) % total);
  };

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      if (deltaX < 0) {
        lang === 'ar' ? handlePrev() : handleNext();
      } else {
        lang === 'ar' ? handleNext() : handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      ref={sectionRef}
      aria-label={t3(
        lang,
        'Présentation Amekran Assurances',
        'Amekran Assurances Overview',
        'نظرة عامة على AMEKRAN ASSURANCES'
      )}
      className="relative lg:min-h-[416px] xl:min-h-[428px] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-[#DCEAF7] via-[#EDF4FB] to-white"
    >
      {/* Desktop/Tablet Animated Panoramic Carousel Backdrop */}
      <div
        data-hero-intro
        className="hidden md:block absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, transparent 20%, rgba(0,0,0,0.48) 33%, black 46%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, transparent 20%, rgba(0,0,0,0.48) 33%, black 46%)',
        }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeSolution.id}
            initial={{ opacity: 0, scale: 1.04, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <KenBurnsLayer
              src={slideMedia.src}
              alt={activeSolution.title[lang]}
              positionClass={slideMedia.desktopPos}
              sizes="(max-width: 767px) 1vw, 100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Left sky-blue scrim ensuring WCAG AA readability for dark navy headline */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#DCEAF7]/95 via-[#E9F2FB]/65 lg:via-[#EAF3FB]/25 to-transparent" />
        {/* Smooth bottom fade into white solutions section */}
        <div className="absolute inset-x-0 bottom-0 h-14 lg:h-16 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-10 pt-4 pb-2 sm:py-5 lg:py-3">
        <div
          className={`max-w-[490px] lg:max-w-[535px] flex flex-col justify-between lg:min-h-[295px] xl:min-h-[315px] ${
            /* Arabic keeps its RTL reading but sits on the physical left, like FR. */
            lang === 'ar' ? 'text-left ms-auto' : ''
          }`}
          data-hero-intro
        >
          <div className="min-h-[145px] lg:min-h-[160px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeSolution.id}-${lang}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  data-testid="hero-slide-headline"
                  className="text-[20px] xs:text-[23px] sm:text-[32px] lg:text-[37px] xl:text-[40px] font-extrabold italic text-[#071636] leading-[1.14] tracking-[-0.015em] text-balance"
                >
                  {activeSolution.heroHeadline[lang]}
                </h1>

                {/* Signature curved tapered gold brushstroke underline */}
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 380 18"
                  preserveAspectRatio="none"
                  initial={{ scaleX: 0.25, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: 0.48,
                    delay: 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformOrigin: 'left center' }}
                  className="w-[195px] xs:w-[230px] sm:w-[325px] lg:w-[380px] h-[10px] sm:h-[14px] my-2 sm:my-2.5 lg:my-3 overflow-visible block"
                >
                  <defs>
                    <linearGradient
                      id={`heroSwoosh-${activeSolution.id}`}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#D78E10" />
                      <stop offset="35%" stopColor="#EFB02E" />
                      <stop offset="72%" stopColor="#E69E1D" />
                      <stop
                        offset="100%"
                        stopColor="#F5C758"
                        stopOpacity="0.85"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M2,14.5 C98,2.0 232,0.5 378,8.5 C235,6.8 106,9.5 2,14.5 Z"
                    fill={`url(#heroSwoosh-${activeSolution.id})`}
                  />
                </motion.svg>

                <p className="text-[13px] sm:text-[16px] lg:text-[17.5px] font-medium text-[#13294B] leading-[1.35] max-w-[390px] sm:max-w-[435px]">
                  {activeSolution.heroTagline[lang]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className={`mt-auto pt-3 sm:pt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 w-full sm:w-auto ${
              lang === 'ar' ? 'sm:justify-end' : ''
            }`}
          >
            <button
              type="button"
              data-magnetic
              onClick={() => onRequestQuote(activeSolution.id)}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0A1C3E] text-[12px] sm:text-[15px] font-bold shadow-[0_4px_16px_-3px_rgba(217,158,38,0.5)] transition-transform duration-150 active:scale-[0.98] cursor-pointer min-h-[42px] sm:min-h-[44px] whitespace-nowrap text-center"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A1C3E] shrink-0" />
              <span>
                {t3(lang, 'Demander un devis', 'Request a Quote', 'اطلب عرض سعر')}
              </span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A1C3E] shrink-0 rtl:rotate-180 hidden xs:inline-block" />
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0A1C3E] text-[12px] sm:text-[15px] font-semibold border border-[#D99E26]/50 shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer min-h-[42px] sm:min-h-[44px] whitespace-nowrap text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B1E40] shrink-0" />
              <span>{t3(lang, 'Nous contacter', 'Contact Us', 'اتصل بنا')}</span>
            </button>
          </div>

          {/* Desktop/Tablet Carousel Navigation Controls (hidden on mobile) */}
          <div
            className={`hidden md:flex items-center gap-2 mt-3 lg:mt-3.5 ${
              lang === 'ar' ? 'justify-end' : ''
            }`}
          >
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t3(lang, 'Solution précédente', 'Previous solution', 'السابق')}
              className="w-7 h-7 rounded-full bg-white/85 hover:bg-white border border-slate-300/80 text-[#0B1E40] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>

            <div
              role="tablist"
              aria-label={t3(lang, 'Slides solutions', 'Solution slides', 'شرائح الحلول')}
              className="flex items-center gap-1.5 px-1"
            >
              {INSURANCE_SOLUTIONS.map((sol, idx) => {
                const selected = idx === safeIndex;
                return (
                  <button
                    key={sol.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={sol.title[lang]}
                    onClick={() => onChangeIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      selected
                        ? 'w-6 bg-[#D99E26]'
                        : 'w-2 bg-[#0B1E40]/20 hover:bg-[#0B1E40]/45'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label={t3(lang, 'Solution suivante', 'Next solution', 'التالي')}
              className="w-7 h-7 rounded-full bg-white/85 hover:bg-white border border-slate-300/80 text-[#0B1E40] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

        {/* Dedicated Responsive Mobile Visual Card (< md) with Native Touch Swipe */}
        <div className="md:hidden mt-3.5" data-hero-intro>
          <div
            className="relative rounded-[20px] overflow-hidden shadow-[0_10px_26px_-8px_rgba(11,30,64,0.22)] border border-[#DCE5F2] aspect-[16/9] w-full bg-[#E8F1FA] select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={activeSolution.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <KenBurnsLayer
                  src={slideMedia.src}
                  alt={activeSolution.title[lang]}
                  positionClass={slideMedia.mobilePos}
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom soft gradient scrim */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

            {/* Slide title pill badge */}
            <div className="absolute bottom-2.5 start-2.5 z-20 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-sm">
              {activeSolution.title[lang]}
            </div>

            {/* Left/Right touch arrow controls directly on the card */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t3(lang, 'Solution précédente', 'Previous solution', 'السابق')}
              className="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#0B1E40] shadow-md flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90 z-20 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t3(lang, 'Solution suivante', 'Next solution', 'التالي')}
              className="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#0B1E40] shadow-md flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90 z-20 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          {/* Centered mobile pagination dots */}
          <div
            role="tablist"
            aria-label={t3(lang, 'Slides solutions', 'Solution slides', 'شرائح الحلول')}
            className="flex items-center justify-center gap-1.5 mt-2.5"
          >
            {INSURANCE_SOLUTIONS.map((sol, idx) => {
              const selected = idx === safeIndex;
              return (
                <button
                  key={sol.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-label={sol.title[lang]}
                  onClick={() => onChangeIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    selected
                      ? 'w-6 bg-[#D99E26]'
                      : 'w-1.5 bg-[#0B1E40]/25'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Signature Poids Lourds Split Gold/Navy Ribbon Badge (visible on Poids Lourds slide) */}
        <AnimatePresence>
          {isTrucksSlide && (
            <motion.button
              type="button"
              onClick={() => onRequestQuote('poids-lourds')}
              data-testid="trucks-pack-banner"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2.5 lg:mt-0 lg:absolute lg:right-8 lg:bottom-3.5 z-20 w-full sm:w-auto flex flex-col sm:flex-row items-stretch rounded-2xl sm:rounded-full overflow-hidden border border-[#F6D36E]/90 shadow-[0_12px_28px_-6px_rgba(11,30,64,0.38)] hover:-translate-y-0.5 transition-transform cursor-pointer text-left"
            >
              {/* Metallic Gold Left / Top Half */}
              <div className="bg-gradient-to-b from-[#FCE9A3] via-[#F2C655] to-[#DF9F28] text-[#0A1C3E] px-3.5 sm:px-5 lg:pr-7 py-2 flex items-center justify-center sm:justify-start gap-3 sm:gap-3.5">
                <div className="flex items-center gap-2 shrink-0">
                  <Truck
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#0A1C3E] shrink-0"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                  <div className="flex flex-col leading-none">
                    <span className="text-[12.5px] sm:text-[14px] font-extrabold">
                      Pack
                    </span>
                    <span className="text-[11px] sm:text-[11.5px] font-bold mt-0.5 whitespace-nowrap">
                      {t3(lang, 'Tracteur Routier', 'Road Tractor', 'جرار الطريق')}
                    </span>
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className="h-7 w-[1.5px] bg-[#0A1C3E]/40 shrink-0"
                />

                <div className="flex flex-col items-center leading-none shrink-0">
                  <span className="text-[12.5px] sm:text-[13.5px] font-extrabold whitespace-nowrap">
                    {t3(lang, 'Tarif C2', 'C2 Rate', 'تعرفة C2')}
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-bold mt-0.5 whitespace-nowrap">
                    {t3(lang, 'compétitif', 'competitive', 'تنافسية')}
                  </span>
                </div>
              </div>

              {/* Deep Navy Right / Bottom Half with Gold Divider */}
              <div className="bg-gradient-to-r from-[#07183A] via-[#0B224D] to-[#0E2C61] text-white px-3.5 sm:pl-6 sm:pr-5 py-2 flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 sm:-ml-4 sm:rounded-l-[24px] border-t-[2.5px] sm:border-t-0 sm:border-l-[3px] border-[#F8D878] shadow-[-6px_0_16px_rgba(8,26,61,0.28)]">
                <Globe
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#F5CE67] shrink-0"
                  strokeWidth={1.65}
                  aria-hidden="true"
                />
                <div className="flex flex-row sm:flex-col items-baseline sm:items-start gap-1.5 sm:gap-0 leading-tight flex-wrap justify-center">
                  <span className="text-[11.5px] sm:text-[12.5px] font-bold whitespace-nowrap">
                    {t3(lang, 'Couverture de flottes', 'Fleet Coverage', 'تغطية الأساطيل')}
                  </span>
                  <span className="text-[10.5px] sm:text-[11.5px] font-semibold italic text-white/90 whitespace-nowrap">
                    {t3(lang, 'Nationale & Internationale', 'National & International', 'وطني ودولي')}
                  </span>
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
