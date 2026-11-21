'use client';

import Image from 'next/image';
import { Fragment } from 'react';
import { Handshake, MapPin, ShieldCheck, Users } from 'lucide-react';
import crestImg from '@/src/assets/images/amekran_lion_crest_1794661933343.png';
import { DESKTOP_RESTING_WAVES, MOBILE_RESTING_WAVES } from '@/lib/waves';
import { t3, type Language } from '@/lib/insurance';
import { RMA_URL } from '@/lib/rma';

interface TrustAndFooterProps {
  lang: Language;
}

export function AmekranFooterBar({ lang }: { lang: Language }) {
  return (
    <footer className="relative z-30 px-3 sm:px-4 pb-1.5 sm:pb-2 pt-0.5 lg:pt-1 lg:pb-2.5">
      <div className="max-w-[1340px] mx-auto flex flex-row items-center justify-between gap-1.5 sm:gap-4 text-white">
        {/* Brand Logo & RMA Lockup */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div className="relative w-5 h-5 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#F4CB64]/80 bg-[#08193B] shrink-0 shadow-sm">
            <Image
              src={crestImg}
              alt="Amekran Assurances"
              fill
              sizes="32px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-xs sm:text-[15px] font-bold tracking-[0.08em] text-white"
              style={{ fontFamily: 'var(--font-serif-brand)' }}
            >
              AMEKRAN
            </span>
            <span className="text-[7.5px] sm:text-[9.5px] font-semibold tracking-[0.2em] text-[#F2CA63] uppercase hidden xs:inline">
              ASSURANCES
            </span>
          </div>

          <span
            aria-hidden="true"
            className="hidden sm:block h-4 sm:h-5 w-px bg-white/20"
          />

          {/* RMA — parent company lockup, linked to rmaassurance.com */}
          <a
            href={RMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RMA Assurance — Agent Général"
            className="flex items-center gap-1.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4CB64]"
          >
            <span className="inline-flex items-center rounded bg-white px-1 sm:px-1.5 py-[2px] sm:py-[3px] shadow-sm">
              <Image
                src="/rma-logo.png"
                alt="RMA Assurance"
                width={318}
                height={84}
                sizes="72px"
                className="h-2.5 sm:h-3.5 w-auto"
              />
            </span>
            <span className="hidden lg:flex flex-col leading-tight text-start">
              <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-[#F2CA63]">
                Agent Général
              </span>
              <span className="text-[9.5px] font-semibold text-white/85">
                RMA Assurance
              </span>
            </span>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-[9px] sm:text-[11.5px] text-white/80 whitespace-nowrap shrink-0">
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
      className="site-footer-root fixed bottom-0 inset-x-0 z-[45] bg-transparent pointer-events-none overflow-hidden h-[88px] sm:h-[102px] lg:h-[118px] flex flex-col justify-end"
    >
      {/* Intro: the brand logo centered on the full-page footer, with a small
          splash ring pulsing behind the crest; it hides as the footer settles
          into its place (desktop only) */}
      <div
        aria-hidden="true"
        className="site-footer-intro-logo hidden lg:flex pointer-events-none absolute inset-x-0 top-0 z-30 h-[100vh] flex-col items-center justify-center gap-5"
      >
        <div className="relative flex items-center justify-center">
          {/* little splash rings */}
          <span className="site-footer-intro-ring absolute h-24 w-24 rounded-full border-2 border-[#F4CB64]" />
          <span
            aria-hidden="true"
            className="site-footer-intro-ring site-footer-intro-ring-late absolute h-24 w-24 rounded-full border border-[#F4CB64]/70"
          />
          <div className="site-footer-intro-crest relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#F4CB64] bg-[#08193B] shadow-[0_0_46px_rgba(244,203,100,0.36)]">
            <Image
              src={crestImg}
              alt=""
              fill
              priority
              sizes="96px"
              referrerPolicy="no-referrer"
              className="object-cover"
            />
          </div>
        </div>
        <div className="site-footer-intro-wordmark flex flex-col items-center">
          <span
            className="text-[28px] font-bold leading-none tracking-[0.2em] text-white sm:text-[34px]"
            style={{ fontFamily: 'var(--font-serif-brand)' }}
          >
            AMEKRAN
          </span>
          <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.42em] text-[#F2CA63] sm:text-[11px]">
            ASSURANCES
          </span>
        </div>

        {/* Parent brand — RMA Assurance */}
        <div className="site-footer-intro-partner flex items-center gap-2.5">
          <span className="text-[8.5px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-[9.5px]">
            Agent Général
          </span>
          <span aria-hidden="true" className="h-4 w-px bg-white/25" />
          <span className="inline-flex items-center rounded-md bg-white px-2 py-1 shadow-[0_2px_14px_rgba(0,0,0,0.28)]">
            <Image
              src="/rma-logo.png"
              alt=""
              width={318}
              height={84}
              priority
              sizes="96px"
              className="h-5 w-auto sm:h-6"
            />
          </span>
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
