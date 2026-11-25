'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useHydratedReducedMotion } from '@/lib/useHydratedReducedMotion';
import type { Language } from '@/lib/insurance';
import { AmekranFooterBar } from './TrustAndFooter';
import { DESKTOP_RESTING_WAVES, MOBILE_RESTING_WAVES } from '@/lib/waves';

interface FooterCurtainIntroProps {
  lang: Language;
  onComplete?: () => void;
}

/**
 * Premium opening splash.
 *
 * The footer starts taking the full screen and animates down into its exact
 * resting place at the bottom; then the footer content — which carries the
 * Amekran logo — slides up from the bottom to settle inside it. Nothing else
 * animates. Finally the curtain glides down (top to bottom) and hands the
 * page over to the hero.
 */
export default function FooterCurtainIntro({
  lang,
  onComplete,
}: FooterCurtainIntroProps) {
  const prefersReducedMotion = useHydratedReducedMotion();
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  }, [onComplete]);

  // Reduced motion or an explicit `?autostart=1` skips the show entirely.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const skip =
      params.get('autostart') === '1' || prefersReducedMotion === true;
    if (!skip) return;

    const id = window.setTimeout(() => {
      finish();
      setVisible(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion, finish]);

  // Safety net.
  useEffect(() => {
    const id = window.setTimeout(() => {
      finish();
      setVisible(false);
    }, 6000);
    return () => window.clearTimeout(id);
  }, [finish]);

  useGSAP(
    () => {
      if (!visible || !rootRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const root = rootRef.current;
      const q = gsap.utils.selector(root);

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => setVisible(false),
      });

      // The footer starts full-screen and settles into its resting place.
      tl.fromTo(
        q('.splash-footer-wave'),
        { scale: 12 },
        { scale: 1, duration: 1.1, ease: 'power3.inOut' },
        0
      )
        // footer content — with the logo — slides up from the bottom
        .fromTo(
          q('.splash-footer-content'),
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' },
          1.15
        );

      // ── Curtain glides down, top to bottom ────────────────────────────
      tl.add(finish, 2.2).to(
        root,
        {
          yPercent: 100,
          duration: 0.85,
          ease: 'power4.inOut',
        },
        2.25
      );
    },
    { scope: rootRef, dependencies: [visible] }
  );

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-testid="footer-intro-curtain"
      className="pointer-events-none fixed inset-0 z-[70] select-none overflow-hidden bg-[#04102A]"
    >
      {/* Soft vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[6]"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 50%, transparent 58%, rgba(2,8,22,0.32) 100%)',
        }}
      />

      {/* Splash Footer — starts full-screen, settles into place at bottom */}
      <div
        className="splash-footer-wave absolute bottom-0 inset-x-0 z-[10] flex flex-col justify-end bg-transparent pointer-events-none overflow-hidden h-[144px] sm:h-[130px] lg:h-[136px]"
        style={{
          transform: 'scale(12)',
          transformOrigin: '50% 100%',
          willChange: 'transform',
        }}
      >
        {/* Desktop Gull-Wing Waves */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 124"
          preserveAspectRatio="none"
          className="hidden lg:block absolute inset-0 z-20 w-full h-full pointer-events-none select-none"
        >
          <defs>
            <linearGradient id="splashGoldWaveMain" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5CE67" />
              <stop offset="12%" stopColor="#D39623" />
              <stop offset="28%" stopColor="#FCE491" />
              <stop offset="50%" stopColor="#C98A1B" />
              <stop offset="72%" stopColor="#FCE491" />
              <stop offset="88%" stopColor="#D39623" />
              <stop offset="100%" stopColor="#F5CE67" />
            </linearGradient>
            <linearGradient id="splashGoldWaveAccent" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B87A14" stopOpacity="0.55" />
              <stop offset="30%" stopColor="#F9DB7B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#B87A14" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#F9DB7B" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#B87A14" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="splashNavyWaveFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#061430" />
              <stop offset="50%" stopColor="#0B224D" />
              <stop offset="100%" stopColor="#061634" />
            </linearGradient>
          </defs>
          <path d={DESKTOP_RESTING_WAVES.goldMain} fill="url(#splashGoldWaveMain)" />
          <path d={DESKTOP_RESTING_WAVES.goldAccent} fill="url(#splashGoldWaveAccent)" />
          <path d={DESKTOP_RESTING_WAVES.navyFill} fill="url(#splashNavyWaveFill)" />
        </svg>

        {/* Mobile & Tablet Bottom Wave */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 132"
          preserveAspectRatio="none"
          className="lg:hidden absolute inset-x-0 bottom-0 z-20 w-full h-full pointer-events-none select-none"
        >
          <defs>
            <linearGradient id="splashGoldWaveMobile" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F5CE67" />
              <stop offset="30%" stopColor="#D39623" />
              <stop offset="50%" stopColor="#FCE491" />
              <stop offset="70%" stopColor="#D39623" />
              <stop offset="100%" stopColor="#F5CE67" />
            </linearGradient>
            <linearGradient id="splashNavyWaveMobile" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#061430" />
              <stop offset="50%" stopColor="#0B224D" />
              <stop offset="100%" stopColor="#061634" />
            </linearGradient>
          </defs>
          <path d={MOBILE_RESTING_WAVES.goldMain} fill="url(#splashGoldWaveMobile)" />
          <path d={MOBILE_RESTING_WAVES.navyFill} fill="url(#splashNavyWaveMobile)" />
        </svg>

        {/* Footer content slides up from bottom */}
        <div
          className="splash-footer-content pointer-events-auto relative z-30"
          style={{ transform: 'translateY(100%)', opacity: 0 }}
        >
          <AmekranFooterBar lang={lang} />
        </div>
      </div>
    </div>
  );
}
