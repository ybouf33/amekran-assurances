'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown, Globe, MapPin, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import crestImg from '@/src/assets/images/amekran_lion_crest_1794661933343.png';
import { RMA_URL } from '@/lib/rma';
import { t3, type Language } from '@/lib/insurance';

interface TopHeaderProps {
  lang: Language;
  onSelectLang?: (lang: Language) => void;
  onChangeLang?: (lang: Language) => void;
  onOpenContact: () => void;
  logoHref?: string;
}

const LANGUAGE_OPTIONS: {
  code: Language;
  shortLabel: string;
  label: string;
}[] = [
    { code: 'fr', shortLabel: 'FR', label: 'Français' },
    { code: 'en', shortLabel: 'EN', label: 'English' },
    { code: 'ar', shortLabel: 'AR', label: 'العربية' },
  ];

export default function TopHeader({
  lang,
  onSelectLang,
  onChangeLang,
  onOpenContact,
  logoHref = '/',
}: TopHeaderProps) {
  const handleLang = onChangeLang ?? onSelectLang ?? (() => { });
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLangOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLangOpen(false);
    }
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentLang =
    LANGUAGE_OPTIONS.find((item) => item.code === lang) ?? LANGUAGE_OPTIONS[0];

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#051129] via-[#091D42] to-[#06132E] text-white border-b border-[#D99E26]/35 shrink-0">
      {/* Contained atmospheric sapphire glow & sculpted metallic gold swoosh */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="hidden md:block w-full h-full"
        >
          <defs>
            <radialGradient id="topBarGlow" cx="44%" cy="50%" r="34%">
              <stop offset="0%" stopColor="#1E4E9E" stopOpacity="0.46" />
              <stop offset="55%" stopColor="#102E66" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#06132E" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="topBarGoldHalo" cx="41%" cy="52%" r="14%">
              <stop offset="0%" stopColor="#F5C451" stopOpacity="0.22" />
              <stop offset="65%" stopColor="#D99E26" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#06132E" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="topBarGoldBlade"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#A66D0D" stopOpacity="0.88" />
              <stop offset="28%" stopColor="#D99B26" />
              <stop offset="56%" stopColor="#F4C756" />
              <stop offset="80%" stopColor="#FCE79C" />
              <stop offset="100%" stopColor="#FFF5CC" />
            </linearGradient>
            <linearGradient
              id="topBarGoldSheen"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FFF4C2" stopOpacity="0" />
              <stop offset="45%" stopColor="#FFF4C2" stopOpacity="0.35" />
              <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#FFF8D8" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="topBarRibbon" x1="34%" y1="100%" x2="86%" y2="0%">
              <stop offset="0%" stopColor="#F5CE67" stopOpacity="0" />
              <stop offset="26%" stopColor="#FCE79C" stopOpacity="0.52" />
              <stop offset="58%" stopColor="#E4AE3C" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F5CE67" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width="1440" height="60" fill="url(#topBarGlow)" />
          <rect width="1440" height="60" fill="url(#topBarGoldHalo)" />

          {/* Soft ambient gold halo beneath the primary crescent swoosh */}
          <path
            d="M 526 60 C 572 47, 604 24, 632 0 L 664 0 C 625 27, 581 50, 526 60 Z"
            fill="#F4C756"
            opacity="0.16"
          />

          {/* Primary sculpted metallic gold crescent swoosh */}
          <path
            d="M 530 60 C 574 47, 606 24, 634 0 L 660 0 C 623 26, 580 49, 530 60 Z"
            fill="url(#topBarGoldBlade)"
          />

          {/* Specular bright upper-edge sheen for luxury metallic depth */}
          <path
            d="M 548 56 C 584 43, 613 22, 636 0 L 647 0 C 620 22, 588 43, 548 56 Z"
            fill="url(#topBarGoldSheen)"
          />

          {/* Fine companion gold silk filaments */}
          <path
            d="M 556 60 C 674 30, 845 36, 1110 0"
            fill="none"
            stroke="url(#topBarRibbon)"
            strokeWidth="1.15"
          />
          <path
            d="M 615 60 C 755 34, 920 44, 1190 6"
            fill="none"
            stroke="url(#topBarRibbon)"
            strokeOpacity="0.42"
            strokeWidth="0.7"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 h-14 lg:h-[60px] flex items-center justify-between gap-3">
        {/* Left: Brand Lockup & Unified Agency Heritage */}
        <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
          <Link
            href={logoHref}
            className="flex items-center gap-2.5 shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4CB64] rounded-lg"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-1 ring-[#F4CB64]/75 shadow-[0_0_16px_rgba(244,203,100,0.22)] shrink-0 bg-[#08193B] transition-transform duration-200 group-hover:scale-105">
              <Image
                src={crestImg}
                alt="Amekran Assurances"
                fill
                sizes="40px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-[15px] sm:text-[18px] font-bold tracking-[0.08em] text-white whitespace-nowrap"
                style={{ fontFamily: 'var(--font-serif-brand)' }}
              >
                AMEKRAN
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] font-semibold tracking-[0.3em] text-[#F2CA63] uppercase mt-0.5 whitespace-nowrap">
                ASSURANCES
              </span>
            </div>
          </Link>

          <span
            aria-hidden="true"
            className="hidden md:block h-6 w-px bg-gradient-to-b from-transparent via-[#F4CB64]/35 to-transparent shrink-0"
          />

          {/* RMA Assurance — parent brand & General Agent marker */}
          <a
            href={RMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2.5 shrink-0 select-none rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4CB64]"
            aria-label={
              lang === 'fr'
                ? 'Agent Général RMA Assurance à Tanger'
                : lang === 'ar'
                  ? 'الوكيل العام لـ RMA للتأمين بطنجة'
                  : 'RMA Assurance General Agent in Tangier'
            }
          >
            <span className="inline-flex items-center rounded-md bg-white px-2 py-1 shadow-[0_1px_10px_rgba(0,0,0,0.28)] transition-transform duration-200 hover:scale-[1.04]">
              <Image
                src="/rma-logo.png"
                alt="RMA Assurance"
                width={318}
                height={84}
                sizes="80px"
                className="h-[18px] w-auto lg:h-5"
              />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-[9px] lg:text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-300/85 whitespace-nowrap">
                {t3(lang, 'Agent Général RMA', 'RMA General Agent', 'الوكيل العام RMA')}
              </span>
              <span className="text-[11.5px] lg:text-[12.5px] font-bold tracking-tight text-[#F6D36E] whitespace-nowrap">
                {t3(lang, 'Tanger · 20 ans d’expertise', 'Tangier · 20 years of expertise', 'طنجة · 20 سنة من الخبرة')}
              </span>
            </div>
          </a>
        </div>

        {/* Right: Quick Contact Actions & Language Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <a
            href="tel:0661508925"
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[#F4CB64]/45 text-xs sm:text-[13.5px] font-semibold text-white hover:text-[#F8D366] transition-all whitespace-nowrap min-h-[38px] focus-visible:outline-2 focus-visible:outline-[#F4CB64]"
            aria-label="Appeler le 0661 50 89 25"
          >
            <Phone
              className="w-3.5 h-3.5 text-[#F2CA63] shrink-0"
              aria-hidden="true"
            />
            <span className="tabular-nums">0661 50 89 25</span>
          </a>

          <button
            type="button"
            onClick={onOpenContact}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[#F4CB64]/45 text-[13.5px] font-medium text-slate-100 hover:text-[#F8D366] transition-all whitespace-nowrap min-h-[38px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F4CB64]"
          >
            <MapPin
              className="w-3.5 h-3.5 text-[#F2CA63] shrink-0"
              aria-hidden="true"
            />
            <span>{lang === 'fr' ? 'Agence Tanger' : 'Tangier Office'}</span>
          </button>

          <span
            aria-hidden="true"
            className="h-5 w-px bg-white/15 mx-0.5 shrink-0"
          />

          {/* Modern Language Selector Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              data-testid="lang-dropdown-trigger"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={
                lang === 'fr'
                  ? `Changer de langue (${currentLang.label})`
                  : `Change language (${currentLang.label})`
              }
              onClick={() => setLangOpen((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs sm:text-[13px] font-bold tracking-wide transition-all whitespace-nowrap min-h-[38px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F4CB64] ${langOpen
                  ? 'bg-white/[0.15] border-[#F4CB64]/70 text-[#F8D366] shadow-[0_0_12px_rgba(244,203,100,0.2)]'
                  : 'bg-white/[0.07] hover:bg-white/[0.13] border-white/15 hover:border-[#F4CB64]/50 text-white'
                }`}
            >
              <Globe
                className="w-3.5 h-3.5 text-[#F4CB64] shrink-0"
                aria-hidden="true"
              />
              <span>{currentLang.shortLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-150 ${langOpen ? 'rotate-180 text-[#F4CB64]' : ''
                  }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  role="listbox"
                  aria-label={
                    lang === 'fr'
                      ? 'Sélectionner la langue'
                      : 'Select language'
                  }
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-white text-[#0B1E40] border border-[#DCE5F2] shadow-[0_16px_38px_-10px_rgba(6,18,44,0.34)] p-1.5 z-[80]"
                >
                  {LANGUAGE_OPTIONS.map((option) => {
                    const selected = option.code === lang;
                    return (
                      <button
                        key={option.code}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          handleLang(option.code);
                          setLangOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-left flex items-center justify-between gap-2 transition-colors cursor-pointer ${selected
                            ? 'bg-[#FFF6DD] text-[#0B1E40] font-bold'
                            : 'text-[#2C4166] hover:bg-[#F4F7FC] font-semibold'
                          }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#B57D14] w-5">
                            {option.shortLabel}
                          </span>
                          <span className="text-[13px]">{option.label}</span>
                        </div>
                        {selected && (
                          <Check
                            className="w-4 h-4 text-[#D99E26] shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
