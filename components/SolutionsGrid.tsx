'use client';

import { useEffect, useRef } from 'react';
import {
  Building2,
  Car,
  HardHat,
  HeartPulse,
  Home,
  Ship,
  Truck,
} from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { gsap, useGSAP } from '@/lib/gsap';
import { t3, type Language, type SolutionId } from '@/lib/insurance';
import { INSURANCE_SOLUTIONS } from '@/lib/insurance';

const DEFAULT_PROGRESS_MS = 5200;

interface SolutionsGridProps {
  lang: Language;
  activeIndex: number;
  onSelectCard: (index: number, id: SolutionId) => void;
  onPauseChange?: (paused: boolean) => void;
  /** Called once the active card progress reaches 100%. */
  onAdvance?: () => void;
  /** Freezes the progress (hover, modal open…). */
  paused?: boolean;
  /** Duration of a full progress cycle, in milliseconds. */
  progressDurationMs?: number;
}

function SolutionIcon({
  id,
  active,
}: {
  id: SolutionId;
  active: boolean;
}) {
  const haloClass = active ? 'bg-[#FAD97A] opacity-95 scale-105' : 'bg-[#FDE792] opacity-85';
  switch (id) {
    case 'automobile':
      return (
        <div className="relative w-12 h-11 flex items-center justify-center">
          <div
            className={`w-9 h-4 rounded-full absolute bottom-1 transition-all duration-300 ${haloClass}`}
          />
          <Car
            className="w-9 h-9 text-[#0B1E40] relative z-10"
            strokeWidth={2}
          />
        </div>
      );
    case 'accidents-travail':
      return (
        <div className="relative w-12 h-11 flex items-center justify-center">
          <div
            className={`w-9 h-6 rounded-t-full absolute top-1.5 transition-all duration-300 ${haloClass}`}
          />
          <HardHat
            className="w-9 h-9 text-[#0B1E40] relative z-10"
            strokeWidth={2}
          />
        </div>
      );
    case 'sante-cnss':
      return (
        <div className="relative w-12 h-11 flex items-center justify-center">
          <div
            className={`w-7 h-7 rounded-full absolute transition-all duration-300 ${haloClass}`}
          />
          <HeartPulse
            className="w-9 h-9 text-[#0B1E40] relative z-10"
            strokeWidth={2}
          />
        </div>
      );
    case 'habitation':
      return (
        <div className="relative w-12 h-11 flex items-center justify-center">
          <div
            className={`w-7 h-5 rounded-sm absolute bottom-1.5 transition-all duration-300 ${haloClass}`}
          />
          <Home
            className="w-9 h-9 text-[#0B1E40] relative z-10"
            strokeWidth={2}
          />
        </div>
      );
    case 'poids-lourds':
      return (
        <div className="relative w-13 h-11 flex items-center justify-center">
          <div
            className={`w-8 h-5 rounded-sm absolute left-1.5 top-2 transition-all duration-300 ${haloClass}`}
          />
          <Truck
            className="w-9 h-9 text-[#0B1E40] relative z-10"
            strokeWidth={2}
          />
        </div>
      );
    case 'entreprises':
      return (
        <div className="relative w-12 h-11 flex items-center justify-center">
          <div
            className={`w-6 h-7 rounded-sm absolute right-2 bottom-1 transition-all duration-300 ${haloClass}`}
          />
          <Building2
            className="w-9 h-9 text-[#0B1E40] relative z-10"
            strokeWidth={2}
          />
        </div>
      );
    case 'maritime':
      return (
        <div className="relative w-12 h-11 flex items-center justify-center">
          <div
            className={`w-9 h-3.5 rounded-full absolute bottom-1.5 transition-all duration-300 ${haloClass}`}
          />
          <Ship
            className="w-9 h-9 text-[#0B1E40] relative z-10"
            strokeWidth={2}
          />
        </div>
      );
  }
}

export default function SolutionsGrid({
  lang,
  activeIndex,
  onSelectCard,
  onAdvance,
  paused = false,
  progressDurationMs = DEFAULT_PROGRESS_MS,
}: SolutionsGridProps) {
  // Single source of truth for the timer: drives the bottom progress bar.
  const gridRef = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);
  const pausedRef = useRef(paused);
  const onAdvanceRef = useRef(onAdvance);
  const durationMs = Math.max(progressDurationMs, 400);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    onAdvanceRef.current = onAdvance;
  }, [onAdvance]);

  // Start (or restart) a cycle whenever a new card becomes active.
  //
  // The clock is owned here instead of being delegated to an animation
  // controller: every tick re-reads the latest pause flag, the elapsed time is
  // kept locally (so pause/resume can never lose it) and a cycle can only end
  // once before the parent moves to the next card. That makes a permanently
  // stalled progress bar impossible. `gsap.ticker` keeps it on the same clock
  // as every other animation on the page.
  useEffect(() => {
    progress.set(0);

    let elapsed = 0;
    let finished = false;

    const tick = (_time: number, deltaTime: number) => {
      // Clamp the delta so a throttled tab or a long frame cannot skip most of
      // the cycle in a single step.
      const delta = Math.min(Math.max(deltaTime, 0), 120);

      if (!pausedRef.current) {
        elapsed += delta;
      }

      const ratio = Math.min(elapsed / durationMs, 1);
      progress.set(ratio);

      if (ratio >= 1) {
        if (!finished) {
          finished = true;
          gsap.ticker.remove(tick);
          onAdvanceRef.current?.();
        }
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [activeIndex, durationMs, progress]);

  // Premium micro-choreography on the incoming active card: the wave wash
  // blooms, the icon floats and the progress rail glows in sync.
  useGSAP(
    () => {
      if (!gridRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const scope = gsap.utils.selector(gridRef);

      gsap.fromTo(
        scope('[data-progress-rail]'),
        { scaleY: 0.35, autoAlpha: 0 },
        {
          scaleY: 1,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'back.out(2)',
        }
      );

      gsap.fromTo(
        scope('[data-active-icon]'),
        { y: 2 },
        {
          y: -3,
          duration: 1.15,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );

      gsap.fromTo(
        scope('[data-progress-rail]'),
        { boxShadow: '0 0 0 rgba(247,217,118,0)' },
        {
          boxShadow: '0 0 10px rgba(247,217,118,0.55)',
          duration: 1.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );
    },
    { scope: gridRef, dependencies: [activeIndex] }
  );

  const railWidth = useTransform(progress, (value) => `${(value * 100).toFixed(2)}%`);

  const renderCard = (
    solution: (typeof INSURANCE_SOLUTIONS)[number],
    idx: number,
    isCompact: boolean
  ) => {
    const isActive = idx === activeIndex;

    return (
      <button
        key={solution.id}
        type="button"
        data-active={isActive ? 'true' : 'false'}
        aria-current={isActive ? 'true' : undefined}
        onClick={() => onSelectCard(idx, solution.id)}
        className={`group relative overflow-hidden flex flex-col justify-between text-center transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D99E26] ${
          isCompact
            ? 'rounded-[16px] min-h-[114px] p-0'
            : 'rounded-[22px] min-h-[220px]'
        } ${
          isActive
            ? 'border-[1.5px] border-[#D99E26] bg-white shadow-[0_4px_20px_-2px_rgba(217,158,38,0.22)] -translate-y-0.5'
            : 'border border-[#DCE7F5] bg-white hover:-translate-y-0.5 hover:border-[#D99E26]/60 shadow-[0_2px_10px_rgba(11,30,64,0.04)]'
        }`}
      >
        {/* Top Banner for Offers */}
        {solution.offerBadge ? (
          <div
            className={`w-full bg-[#FFF5D6] border-b border-[#F0D58C] flex items-center justify-center shrink-0 ${
              isCompact ? 'py-0.5 px-1' : 'py-1.5 px-2'
            }`}
          >
            <span
              className={`font-extrabold uppercase tracking-[0.14em] text-[#8C5D0E] select-none leading-none ${
                isCompact
                  ? 'text-[7.5px] sm:text-[8.5px]'
                  : 'text-[10px] sm:text-[10.5px]'
              }`}
            >
              {solution.offerBadge[lang]}
            </span>
          </div>
        ) : (
          <div
            className={`w-full shrink-0 ${isCompact ? 'h-[15px]' : 'h-[27px]'}`}
            aria-hidden="true"
          />
        )}

        {/* Card Center: Icon, Title, Subtitle */}
        <div
          className={`relative z-10 flex flex-col items-center w-full flex-1 justify-center ${
            isCompact ? 'px-1.5 py-0.5' : 'px-2.5 py-1'
          }`}
        >
          <div
            data-active-icon={isActive ? '' : undefined}
            className={`transition-transform duration-300 ${
              isCompact ? 'mb-0.5 scale-[0.82]' : 'mb-2'
            } ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
          >
            <SolutionIcon id={solution.id} active={isActive} />
          </div>
          <h3
            className={`font-extrabold text-[#0B1E40] leading-tight tracking-tight ${
              isCompact
                ? 'text-[10.5px] sm:text-[11.5px] line-clamp-1 px-0.5'
                : 'text-[14px] sm:text-[14.5px] lg:text-[15px]'
            }`}
          >
            {solution.title[lang]}
          </h3>
          <p
            className={`text-[#475569] leading-tight px-0.5 ${
              isCompact
                ? 'text-[8px] sm:text-[9.5px] line-clamp-1 mt-0.5'
                : 'text-[11.5px] lg:text-[12px] mt-1'
            }`}
          >
            {solution.subtitle[lang]}
          </p>
        </div>

        {/* Bottom Section: Divider, Category Label, Progress Track */}
        <div
          className={`relative z-10 w-full flex flex-col items-center shrink-0 ${
            isCompact ? 'pb-1.5 pt-0.5' : 'pb-2.5 pt-1'
          }`}
        >
          {/* Thin divider line */}
          <div
            className={`w-[86%] h-[1px] bg-[#E8EEF5] ${
              isCompact ? 'mb-1' : 'mb-2'
            }`}
          />

          {/* Category label */}
          <span
            className={`font-extrabold uppercase tracking-[0.12em] text-[#1E4A8A] select-none leading-none ${
              isCompact
                ? 'text-[7.5px] sm:text-[8.5px] mb-1'
                : 'text-[11px] sm:text-[11.5px] mb-2'
            }`}
          >
            {solution.category === 'particuliers'
              ? t3(lang, 'Particulier', 'Personal', 'أفراد')
              : t3(lang, 'Entreprise', 'Business', 'شركات')}
          </span>

          {/* Bottom rounded progress bar track */}
          <div
            className={`w-[88%] rounded-full bg-[#EBF1F8] overflow-hidden relative ${
              isCompact ? 'h-[3px]' : 'h-[5px]'
            }`}
          >
            {isActive && (
              <motion.div
                style={{ width: railWidth }}
                className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#C98B18_0%,#E0AB33_55%,#F7D976_100%)] shadow-[0_0_6px_rgba(217,158,38,0.55)]"
              />
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <section
      ref={gridRef}
      data-gsap-reveal
      aria-label={t3(lang, "Nos solutions d'assurance", 'Our Insurance Solutions', 'حلولنا التأمينية')}
      className="relative z-10 bg-white pt-1 pb-2.5 lg:pb-3 shrink-0"
    >
      {/* Section Heading flanked by tapered gold horizontal bars */}
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-4 mb-2.5 lg:mb-3">
        <div
          aria-hidden="true"
          data-gsap-line
          className="h-[2px] flex-1 max-w-[260px] bg-gradient-to-r from-transparent via-[#D99E26] to-[#D99E26]"
        />
        <h2 className="text-[17px] sm:text-[20px] lg:text-[22px] font-extrabold text-[#0B1E40] tracking-tight whitespace-nowrap text-center">
          {t3(lang, "Nos solutions d'assurance", 'Our Insurance Solutions', 'حلولنا التأمينية')}
        </h2>
        <div
          aria-hidden="true"
          data-gsap-line
          className="h-[2px] flex-1 max-w-[260px] bg-gradient-to-l from-transparent via-[#D99E26] to-[#D99E26]"
        />
      </div>

      {/* Mobile view (< lg): 7 cards in 2 compact lines */}
      <div className="lg:hidden max-w-[1380px] mx-auto px-2 sm:px-4 flex flex-col gap-2">
        {/* Line 1: First 4 cards (Auto, Habitation, Santé, Entreprises) */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {INSURANCE_SOLUTIONS.slice(0, 4).map((solution, idx) =>
            renderCard(solution, idx, true)
          )}
        </div>
        {/* Line 2: Next 3 cards (Poids Lourds, Accidents Travail, Maritime) centered */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 max-w-[85%] sm:max-w-[76%] mx-auto w-full">
          {INSURANCE_SOLUTIONS.slice(4).map((solution, i) =>
            renderCard(solution, i + 4, true)
          )}
        </div>
      </div>

      {/* Desktop view (>= lg): All 7 cards in 1 synchronized row */}
      <div className="hidden lg:grid lg:grid-cols-7 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 gap-2.5 lg:gap-3 items-stretch">
        {INSURANCE_SOLUTIONS.map((solution, idx) =>
          renderCard(solution, idx, false)
        )}
      </div>
    </section>
  );
}
