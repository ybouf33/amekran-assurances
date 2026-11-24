'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import TopHeader from '@/components/TopHeader';
import Navbar, { type NavSection } from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SolutionsGrid from '@/components/SolutionsGrid';
import SpecialOffersSection from '@/components/SpecialOffersSection';
import RmaOffersSection from '@/components/RmaOffersSection';
import TrustAndFooter, {
  TrustPillarsStrip,
} from '@/components/TrustAndFooter';
import ClientPortalSection from '@/components/ClientPortalSection';
import AmekranBenefitsSection from '@/components/AmekranBenefitsSection';
import ContactSection from '@/components/ContactSection';
import SecondFooter from '@/components/SecondFooter';
import ScrollEffects from '@/components/ScrollEffects';
import GsapInteractions from '@/components/GsapInteractions';
import InteractiveModals, {
  type ActiveModalType,
} from '@/components/InteractiveModals';
import {
  INSURANCE_SOLUTIONS,
  solutionPath,
  swapLocale,
  type Language,
  type SolutionId,
} from '@/lib/insurance';
import { SPLASH_LIFT_MS, SPLASH_SETTLE_MS } from '@/lib/gsap';

const CAROUSEL_INTERVAL_MS = 5200;

/**
 * Scripted ease-in-out scroll animation to an element, honoring its
 * scroll-margin-top. Used instead of CSS smooth scrolling, whose timing
 * can't be controlled and which silently fails under some browser settings.
 */
function animateScrollToId(id: string, duration = 800) {
  const el = document.getElementById(id);
  if (!el || typeof window === 'undefined') return;

  const scrollMargin = parseFloat(
    window.getComputedStyle(el).scrollMarginTop || '0'
  );
  const startY = window.scrollY;
  const targetY =
    el.getBoundingClientRect().top + startY - Math.max(0, scrollMargin);
  const delta = targetY - startY;
  if (Math.abs(delta) < 2) return;

  const start = performance.now();
  // Cubic ease-in-out.
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(now: number) {
    const progress = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + delta * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

interface AmekranLandingProps {
  initialLang?: Language;
}

export default function AmekranLanding({
  initialLang = 'fr',
}: AmekranLandingProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<Language>(initialLang);
  const [activeNav, setActiveNav] = useState<NavSection>('accueil');
  const [modal, setModal] = useState<ActiveModalType>(null);
  const [introDone, setIntroDone] = useState(false);
  const [sectionsReady, setSectionsReady] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);

  // The landing content is uncovered from the top as the footer splash
  // curtain slides down: the hero entrance (and the carousel) starts the
  // moment it begins to lift, and the section welcomes follow once the
  // curtain is mostly down.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroTimer = window.setTimeout(
      () => setIntroDone(true),
      reduced ? 0 : SPLASH_LIFT_MS
    );
    const sectionsTimer = window.setTimeout(
      () => setSectionsReady(true),
      reduced ? 0 : SPLASH_SETTLE_MS
    );
    return () => {
      window.clearTimeout(heroTimer);
      window.clearTimeout(sectionsTimer);
    };
  }, []);

  // Direction aware header: slides away while reading downwards, and comes
  // back as soon as the visitor scrolls up — wherever they are in the page.
  useEffect(() => {
    const HIDE_AFTER_PX = 40;
    const REVEAL_AFTER_PX = 18;
    const TOP_REVEAL_PX = 12;

    let lastY = window.scrollY;
    let travel = 0;
    let hidden = false;

    const applyHidden = (next: boolean) => {
      if (hidden === next) return;
      hidden = next;
      setHeaderHidden(next);
    };

    const onScroll = () => {
      const y = Math.max(window.scrollY, 0);

      // Always reveal once the visitor is back at the very top.
      if (y <= TOP_REVEAL_PX) {
        lastY = y;
        travel = 0;
        applyHidden(false);
        return;
      }

      const delta = y - lastY;
      lastY = y;

      // Reset the accumulator whenever the direction flips.
      if ((delta > 0 && travel < 0) || (delta < 0 && travel > 0)) travel = 0;
      travel += delta;

      if (travel > HIDE_AFTER_PX) applyHidden(true);
      else if (travel < -REVEAL_AFTER_PX) applyHidden(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pausing only belongs to blocking interaction state (an open modal).
  // Hovering the hero slider or the solution cards never stops the carousel.
  const isPaused = modal !== null;

  // Single looping timeline: the grid owns the progress animation and asks the
  // page to move on when the active card reaches 100%.
  const handleAdvanceSolution = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % INSURANCE_SOLUTIONS.length);
  }, []);

  function handleSelectSolutionFromNav(id: SolutionId) {
    router.push(solutionPath(id, lang));
  }

  function handleSelectSolutionCard(idx: number, id: SolutionId) {
    void idx;
    router.push(solutionPath(id, lang));
  }

  // The navbar "Contact" entry leads to the on-page contact form section,
  // reached with a scripted ease-in-out scroll animation.
  function handleOpenContactSection() {
    setActiveNav('contact');
    setModal(null);
    animateScrollToId('contact-form', 900);
  }

  // Language change from the header dropdown, reflected in the URL (/fr /ar /en).
  function handleChangeLang(next: Language) {
    router.push(swapLocale(pathname, next));
  }

  return (
    <div
      id="top"
      className="min-h-dvh flex flex-col bg-white overflow-x-clip"
    >
      {/* Fixed chrome so hiding the gold bar never reflows the page */}
      <header className="fixed inset-x-0 top-0 z-40 bg-white">
        <motion.div
          initial={false}
          animate={{
            height: headerHidden ? 0 : 'auto',
            y: headerHidden ? -80 : 0,
            opacity: headerHidden ? 0 : 1,
          }}
          transition={{
            height: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 0.44, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.3, ease: 'easeOut' },
          }}
          aria-hidden={headerHidden}
          className={headerHidden ? 'overflow-hidden pointer-events-none' : 'z-[60] relative'}
        >
          <TopHeader
            lang={lang}
            onChangeLang={handleChangeLang}
            onOpenContact={() => setModal({ type: 'contact' })}
          />
        </motion.div>
        <Navbar
          lang={lang}
          activeNav={activeNav}
          onSelectHome={() => {
            setActiveNav('accueil');
            setModal(null);
            animateScrollToId('top', 800);
          }}
          onSelectSolution={handleSelectSolutionFromNav}
          onOpenAdvice={() => router.push(`/${lang}/conseils`)}
          onOpenContact={handleOpenContactSection}
          onOpenClientPortal={() => setModal({ type: 'client' })}
        />
      </header>

      {/* Reserves the header footprint now that it is out of the flow */}
      <div
        aria-hidden="true"
        className="shrink-0 h-[114px] sm:h-[120px] lg:h-[124px]"
      />

      <main className="flex-1 flex flex-col">
        <HeroSection
          lang={lang}
          revealReady={introDone}
          activeIndex={activeSlideIndex}
          onChangeIndex={setActiveSlideIndex}
          onRequestQuote={(id) => router.push(solutionPath(id, lang))}
          onOpenContact={handleOpenContactSection}
        />
        <SolutionsGrid
          lang={lang}
          activeIndex={activeSlideIndex}
          onSelectCard={handleSelectSolutionCard}
          onAdvance={handleAdvanceSolution}
          paused={!introDone || isPaused}
          progressDurationMs={CAROUSEL_INTERVAL_MS}
        />
        <TrustPillarsStrip lang={lang} />
        <SpecialOffersSection lang={lang} onOpenContact={handleOpenContactSection} />
        <RmaOffersSection lang={lang} onOpenContact={handleOpenContactSection} />
        <ClientPortalSection
          lang={lang}
          onOpenClientPortal={() => setModal({ type: 'client' })}
        />
        <AmekranBenefitsSection lang={lang} />
        <ContactSection lang={lang} />
      </main>

      {/* Light second footer, revealed on scroll just above the fixed wave */}
      <SecondFooter
        lang={lang}
        onSelectSolution={handleSelectSolutionFromNav}
        onOpenAdvice={() => router.push(`/${lang}/conseils`)}
        onOpenContact={handleOpenContactSection}
      />

      <TrustAndFooter lang={lang} />

      <ScrollEffects active={sectionsReady} />
      <GsapInteractions active={sectionsReady} />

      <InteractiveModals
        lang={lang}
        modal={modal}
        onClose={() => setModal(null)}
        onSwitchToQuote={(id) => {
          const idx = INSURANCE_SOLUTIONS.findIndex((s) => s.id === id);
          if (idx >= 0) setActiveSlideIndex(idx);
          setModal({ type: 'quote', solutionId: id });
        }}
      />
    </div>
  );
}
