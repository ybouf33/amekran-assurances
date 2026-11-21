'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

interface GsapInteractionsProps {
  /** Animations only start once the splash curtain has lifted. */
  active: boolean;
}

/**
 * Site-wide GSAP interaction layer, complementary to ScrollEffects:
 *
 * - Gold heading rules (`.bg-gold-divider` or `[data-gsap-line]`) draw in
 *   left→right / right→left as they enter the viewport.
 * - Primary CTAs marked `data-magnetic` get a subtle magnetic pull towards
 *   the pointer (fine pointers only, skipped for reduced motion), released
 *   smoothly on pointer leave.
 *
 * Everything is created inside useGSAP, so ScrollTriggers, quickTo tweens
 * and media-query contexts are all reverted on unmount.
 */
export default function GsapInteractions({ active }: GsapInteractionsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!active) return;

      // --- Gold rules draw in as their section scrolls into view ---------
      const rules = gsap.utils.toArray<HTMLElement>(
        '[data-gsap-line], .bg-gold-divider'
      );
      rules.forEach((rule, index) => {
        // Bars flanking a heading grow away from the text. An explicit
        // `data-line-origin` wins so mirrored (RTL) rules stay anchored on
        // the side closest to the title.
        const origin =
          rule.dataset.lineOrigin ?? (index % 2 === 0 ? 'left center' : 'right center');
        gsap.fromTo(
          rule,
          { scaleX: 0, autoAlpha: 0.4, transformOrigin: origin },
          {
            scaleX: 1,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rule,
              start: 'top 94%',
              toggleActions: 'play none play reset',
            },
          }
        );
      });

      // --- Magnetic pull on primary CTAs ---------------------------------
      const mm = gsap.matchMedia();
      mm.add(
        '(pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const cleanups = gsap.utils
            .toArray<HTMLElement>('[data-magnetic]')
            .map((el) => {
              const xTo = gsap.quickTo(el, 'x', {
                duration: 0.4,
                ease: 'power3.out',
              });
              const yTo = gsap.quickTo(el, 'y', {
                duration: 0.4,
                ease: 'power3.out',
              });

              const onMove = (event: PointerEvent) => {
                const rect = el.getBoundingClientRect();
                const relX =
                  (event.clientX - (rect.left + rect.width / 2)) /
                  (rect.width / 2);
                const relY =
                  (event.clientY - (rect.top + rect.height / 2)) /
                  (rect.height / 2);
                xTo(gsap.utils.clamp(-1, 1, relX) * 7);
                yTo(gsap.utils.clamp(-1, 1, relY) * 5);
              };
              const onLeave = () => {
                xTo(0);
                yTo(0);
              };

              el.addEventListener('pointermove', onMove);
              el.addEventListener('pointerleave', onLeave);

              return () => {
                el.removeEventListener('pointermove', onMove);
                el.removeEventListener('pointerleave', onLeave);
                gsap.set(el, { clearProps: 'x,y' });
              };
            });

          return () => cleanups.forEach((fn) => fn());
        }
      );

      return () => mm.revert();
    },
    { dependencies: [active], revertOnUpdate: true }
  );

  return <div ref={rootRef} className="hidden" aria-hidden="true" />;
}
