'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { Handshake, MapPin, ShieldCheck, Users } from 'lucide-react';
import crestImg from '@/src/assets/images/amekran_lion_crest_1794661933343.png';
import { DESKTOP_RESTING_WAVES, MOBILE_RESTING_WAVES } from '@/lib/waves';
import { t3, type Language } from '@/lib/insurance';

interface TrustAndFooterProps {
  lang: Language;
}

export function AmekranFooterBar({ lang }: { lang: Language }) {
  return (
    <footer className="relative z-30 px-4 sm:px-6 pb-2 sm:pb-3 pt-1 sm:pt-1.5 lg:pt-2 lg:pb-3">
      <div className="max-w-[1340px] mx-auto flex flex-row items-center justify-between gap-2 sm:gap-4 text-white">
        {/* Brand Logo & AMEKRAN Lockup */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 shrink-0">
            <Image
              src={crestImg}
              alt="Amekran Assurances"
              fill
              sizes="44px"
              referrerPolicy="no-referrer"
              className="object-contain drop-shadow-sm"
            />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-sm sm:text-[17px] lg:text-[18px] font-bold tracking-[0.08em] text-white"
              style={{ fontFamily: 'var(--font-serif-brand)' }}
            >
              AMEKRAN
            </span>
            <span className="text-[9px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#F2CA63] uppercase hidden xs:inline">
              ASSURANCES
            </span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-[11px] sm:text-[13px] lg:text-[14px] text-white/80 whitespace-nowrap shrink-0">
          {t3(lang, '© 2026 Amekran Assurances.', '© 2026 Amekran Assurances.', '© 2026 AMEKRAN للتأمين.')}
        </p>
      </div>
    </footer>
  );
}

export function TrustPillarsStrip({ lang }: { lang: Language }) {
  const pillars = [
    {
      icon: Handshake,
      label: t3(lang, 'Accompagnement personnalisé', 'Personalized advisory', 'مواكبة شخصية'),
    },
    {
      icon: ShieldCheck,
      label: t3(lang, 'Confiance & sécurité', 'Trust & security', 'ثقة وأمان'),
    },
    {
      icon: Users,
      label: t3(lang, 'Solutions adaptées aux grandes entreprises', 'Tailored enterprise solutions', 'حلول مخصصة للشركات الكبرى'),
    },
    {
      icon: MapPin,
      label: t3(lang, 'Proximité à Tanger', 'Local presence in Tangier', 'قرب منكم في طنجة'),
    },
  ];

  return (
    <section
      aria-label={t3(lang, 'Nos engagements', 'Our Commitments', 'التزاماتنا')}
      className="relative z-10 bg-white pt-2 pb-6 lg:pt-3 lg:pb-9"
    >
      <div className="max-w-[1220px] w-full mx-auto px-3 sm:px-6 lg:px-8">
        <div
          data-gsap-reveal
          className="relative overflow-hidden rounded-[20px] lg:rounded-[24px] border border-[#E2E9F3] bg-gradient-to-b from-white via-white to-[#F6F9FD] shadow-card-soft px-4 sm:px-7 lg:px-4 py-4 lg:py-3"
        >
          {/* Metallic gold hairline along the top edge */}
          <span
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D99E26]/65 to-transparent"
          />

          <div
            role="list"
            className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-y-4 gap-x-3 lg:gap-x-2"
          >
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <Fragment key={pillar.label}>
                  <div
                    role="listitem"
                    data-gsap-item
                    className="flex items-center gap-3 px-1 sm:px-2 lg:px-0"
                  >
                    {/* Gold medallion */}
                    <span className="inline-flex h-10 w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F8D366] via-[#E7B94B] to-[#C98A1B] p-[1.5px] shadow-[0_4px_14px_-5px_rgba(217,158,38,0.65)]">
                      <span className="flex h-full w-full items-center justify-center rounded-full bg-white/95">
                        <Icon
                          className="h-[18px] w-[18px] lg:h-5 lg:w-5 text-[#B7791F]"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="text-start text-[12px] sm:text-[12.5px] font-bold leading-snug text-[#0B1E40]">
                      {pillar.label}
                    </span>
                  </div>

                  {/* Gold gradient separator between pillars (desktop only) */}
                  {idx < pillars.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:block h-8 w-px shrink-0 bg-gradient-to-b from-transparent via-[#D99E26]/40 to-transparent"
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TrustAndFooter({
  lang,
}: TrustAndFooterProps) {
  return (
    <div
      id="site-footer"
      className="site-footer-root fixed bottom-0 inset-x-0 z-[45] bg-transparent pointer-events-none overflow-hidden h-[104px] sm:h-[118px] lg:h-[136px] flex flex-col justify-end"
    >
      {/* Intro: Full brand logo centered on the splash page (both mobile and desktop) */}
      <div
        aria-hidden="true"
        className="site-footer-intro-logo pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3 px-4 select-none"
      >
        <div className="site-footer-intro-crest relative w-52 h-52 sm:w-64 sm:h-64 lg:w-76 lg:h-76">
          <Image
            src={crestImg}
            alt="Amekran Assurances"
            fill
            priority
            sizes="(max-width: 640px) 208px, 304px"
            referrerPolicy="no-referrer"
            className="object-contain drop-shadow-[0_0_46px_rgba(244,203,100,0.5)]"
          />
        </div>
      </div>

      {/* Unified Gull-Wing Gold & Deep Navy Wave for both Desktop and Mobile */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 124"
        preserveAspectRatio="none"
        className="site-footer-wave absolute inset-0 z-20 w-full h-full pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="goldWaveMain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F5CE67" />
            <stop offset="12%" stopColor="#D39623" />
            <stop offset="28%" stopColor="#FCE491" />
            <stop offset="50%" stopColor="#C98A1B" />
            <stop offset="72%" stopColor="#FCE491" />
            <stop offset="88%" stopColor="#D39623" />
            <stop offset="100%" stopColor="#F5CE67" />
          </linearGradient>
          <linearGradient id="goldWaveAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B87A14" stopOpacity="0.55" />
            <stop offset="30%" stopColor="#F9DB7B" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#B87A14" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#F9DB7B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B87A14" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="navyWaveFill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#061430" />
            <stop offset="50%" stopColor="#0B224D" />
            <stop offset="100%" stopColor="#061634" />
          </linearGradient>
        </defs>

        {/* Metallic Gold Ribbon */}
        <path
          className="site-footer-wave-gold"
          d={DESKTOP_RESTING_WAVES.goldMain}
          fill="url(#goldWaveMain)"
        />

        {/* Subtle Inner Gold Metallic Fold Sheen */}
        <path
          className="site-footer-wave-accent"
          d={DESKTOP_RESTING_WAVES.goldAccent}
          fill="url(#goldWaveAccent)"
        />

        {/* Deep Navy Body */}
        <path
          className="site-footer-wave-navy"
          d={DESKTOP_RESTING_WAVES.navyFill}
          fill="url(#navyWaveFill)"
        />
      </svg>

      {/* Deep Navy Amekran Assurances Footer Info & Copyright (z-30) */}
      <div className="site-footer-content pointer-events-auto">
        <AmekranFooterBar lang={lang} />
      </div>
    </div>
  );
}
