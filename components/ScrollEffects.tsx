'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

interface ScrollEffectsProps {
  /** Animations only start once the splash has finished. */
  active: boolean;
}

/**
 * Site-wide scroll choreography.
 *
 * Every element marked with `data-gsap-reveal` (optionally containing
 * `data-gsap-item` children) rises into view with a soft stagger.
 * `toggleActions: 'play none none reset'` makes the reveal replay every time
 * the visitor scrolls back up past the section and comes down again.
 *
 * `data-gsap-parallax="40"` adds a gentle scrubbed parallax. The scroll range
 * is measured against the closest `[data-gsap-parallax-scope]` ancestor (or
 * the element's parent when none is declared).
 */
export default function ScrollEffects({ active }: ScrollEffectsProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const groups = gsap.utils
        .toArray<HTMLElement>('[data-gsap-reveal]')
        .map((group) => {
          const items = gsap.utils.toArray<HTMLElement>(
            '[data-gsap-item]',
            group
          );
          return { group, targets: items.length > 0 ? items : [group] };
        });

      // Pre-hide right away (the splash curtain covers the page), so the
      // welcome reveal plays in front of the visitor once it lifts instead of
      // finishing unseen behind it.
      groups.forEach(({ targets }) =>
        gsap.set(targets, { y: 34, autoAlpha: 0 })
      );

      if (!active) return;

      let inViewIndex = 0;
      groups.forEach(({ group, targets }) => {
        // Sections already on screen when the curtain lifts cascade gently,
        // in document order; the rest still reveal as they scroll in.
        const startsInView =
          group.getBoundingClientRect().top < window.innerHeight * 0.86;
        const delay = startsInView ? Math.min(inViewIndex++, 3) * 0.12 : 0;

        gsap.to(targets, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          delay,
          overwrite: true,
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            toggleActions: 'play none play reset',
          },
        });
      });

      gsap.utils
        .toArray<HTMLElement>('[data-gsap-parallax]')
        .forEach((layer) => {
          const distance = Number(layer.dataset.gsapParallax || 40);
          const trigger =
            layer.closest<HTMLElement>('[data-gsap-parallax-scope]') ??
            layer.parentElement ??
            layer;

          gsap.fromTo(
            layer,
            { y: -distance / 2 },
            {
              y: distance / 2,
              ease: 'none',
              scrollTrigger: {
                trigger,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            }
          );
        });

      // Thin gold reading progress rail pinned to the very top of the page.
      if (barRef.current) {
        gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' });
        gsap.to(barRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            start: 0,
            end: 'max',
            scrub: 0.35,
          },
        });
      }

      // Images/fonts settle after mount: keep trigger positions honest.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      document.fonts?.ready?.then?.(refresh).catch(() => {});

      return () => {
        window.removeEventListener('load', refresh);
      };
    },
    { dependencies: [active], revertOnUpdate: true }
  );

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      data-testid="scroll-progress"
      style={{ transform: 'scaleX(0)' }}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2.5px] origin-left bg-[linear-gradient(90deg,#C98B18_0%,#F7D976_55%,#FFF1BF_100%)] shadow-[0_0_10px_rgba(247,217,118,0.55)] transition-opacity duration-500 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
