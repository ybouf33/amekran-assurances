'use client';

import type { Language } from '@/lib/insurance';

interface SectionHeadingProps {
  lang: Language;
  title: string;
  subtitle?: string;
  /** Optional small gold kicker above the title. */
  eyebrow?: string;
  /** Extra classes on the wrapper (spacing, max-width…). */
  className?: string;
  /** id for aria-labelledby on the parent section. */
  id?: string;
}

/**
 * Shared section title used across the site.
 *
 * A large navy title, centred and flanked by two thin gold rules that fade
 * out towards the page edges and stay solid where they meet the text. The
 * rules mirror automatically in Arabic (RTL) through `globals.css`, and
 * `data-line-origin` tells `GsapInteractions` which end should stay anchored
 * so each rule draws outwards, away from the title.
 */
export default function SectionHeading({
  lang,
  title,
  subtitle,
  eyebrow,
  className = '',
  id,
}: SectionHeadingProps) {
  const startOrigin = lang === 'ar' ? 'left center' : 'right center';
  const endOrigin = lang === 'ar' ? 'right center' : 'left center';

  return (
    <div
      data-gsap-reveal
      className={`flex flex-col items-center text-center ${className}`}
    >
      {eyebrow && (
        <p
          data-gsap-item
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B57D14]"
        >
          {eyebrow}
        </p>
      )}

      <div
        data-gsap-item
        className="flex w-full items-center justify-center gap-4 sm:gap-6 lg:gap-8"
      >
        <span
          aria-hidden="true"
          data-gsap-line
          data-line-origin={startOrigin}
          className="heading-rule heading-rule--start hidden sm:block"
        />
        <h2
          id={id}
          className="text-balance text-[22px] font-extrabold leading-tight tracking-tight text-[#0B1E40] sm:text-[30px] lg:text-[38px]"
        >
          {title}
        </h2>
        <span
          aria-hidden="true"
          data-gsap-line
          data-line-origin={endOrigin}
          className="heading-rule heading-rule--end hidden sm:block"
        />
      </div>

      {subtitle && (
        <p
          data-gsap-item
          className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-600 sm:text-base"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
