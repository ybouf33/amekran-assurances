'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, User, X } from 'lucide-react';
import { t3, type Language, type SolutionId } from '@/lib/insurance';
import { INSURANCE_SOLUTIONS } from '@/lib/insurance';
import { gsap, useGSAP } from '@/lib/gsap';
import { RMA_CLIENT_URL } from '@/lib/rma';

export type NavSection =
  | 'accueil'
  | 'particuliers'
  | 'entreprises'
  | 'poids-lourds'
  | 'sante'
  | 'conseils'
  | 'contact'
  | 'a-propos';

interface NavbarProps {
  lang: Language;
  activeNav: NavSection;
  onSelectHome: () => void;
  onSelectSolution: (id: SolutionId) => void;
  onOpenAdvice: () => void;
  onOpenContact: () => void;
  onOpenClientPortal: () => void;
}

export default function Navbar({
  lang,
  activeNav,
  onSelectHome,
  onSelectSolution,
  onOpenAdvice,
  onOpenContact,
}: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<'particuliers' | 'entreprises' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  // GSAP entrance for the solution dropdown panels (Particuliers / Entreprises).
  useGSAP(
    () => {
      if (!openDropdown || !navRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const panel = navRef.current.querySelector<HTMLElement>(
        '[data-gsap-menu]'
      );
      if (!panel) return;

      const items = panel.querySelectorAll('button');
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: -8, scale: 0.97, transformOrigin: 'top center' },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.24, ease: 'power3.out' }
      );
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 6 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
          stagger: 0.045,
          delay: 0.03,
        }
      );
    },
    { dependencies: [openDropdown], scope: navRef }
  );

  // GSAP entrance for the mobile drawer.
  useGSAP(
    () => {
      if (!mobileMenuOpen || !navRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const drawer = navRef.current.querySelector<HTMLElement>(
        '[data-gsap-drawer]'
      );
      if (!drawer) return;

      const items = drawer.querySelectorAll('button');
      gsap.fromTo(
        drawer,
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power3.out' }
      );
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.035,
          delay: 0.04,
        }
      );
    },
    { dependencies: [mobileMenuOpen], scope: navRef }
  );

  const particuliersItems = INSURANCE_SOLUTIONS.filter(
    (s) => s.category === 'particuliers'
  );
  const entreprisesItems = INSURANCE_SOLUTIONS.filter(
    (s) => s.category === 'entreprises'
  );

  return (
    <nav
      ref={navRef}
      aria-label={t3(lang, 'Navigation principale', 'Main navigation', 'التنقل الرئيسي')}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_6px_20px_-4px_rgba(11,30,64,0.12)] shrink-0 w-full"
    >
      <div className="max-w-[1380px] mx-auto px-3 sm:px-6 lg:px-8 h-12 lg:h-[46px] flex items-center justify-between gap-3">
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              onSelectHome();
            }}
            className={`px-5 py-1.5 rounded-full text-[13.5px] font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeNav === 'accueil'
                ? 'bg-gold-pill text-[#0B1E40] shadow-[0_3px_10px_rgba(217,158,38,0.38)]'
                : 'text-[#0B1E40] hover:bg-slate-100 hover:text-[#B57D14]'
            }`}
          >
            {t3(lang, 'Accueil', 'Home', 'الرئيسية')}
          </button>

          {/* Particuliers dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'particuliers'}
              onClick={() =>
                setOpenDropdown((prev) =>
                  prev === 'particuliers' ? null : 'particuliers'
                )
              }
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeNav === 'particuliers'
                  ? 'bg-[#FFF5DA] text-[#0B1E40]'
                  : 'text-[#0B1E40] hover:text-[#B57D14]'
              }`}
            >
              <span>{t3(lang, 'Particuliers', 'Individuals', 'الأفراد')}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openDropdown === 'particuliers' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'particuliers' && (
              <div
                data-gsap-menu
                className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl p-1.5 z-50"
              >
                {particuliersItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      onSelectSolution(item.id);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FFF7E2] transition-colors flex flex-col cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#0B1E40]">
                      {item.title[lang]}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {item.subtitle[lang]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Entreprises dropdown */}
          <div className="relative">
            <button
              type="button"
              aria-expanded={openDropdown === 'entreprises'}
              onClick={() =>
                setOpenDropdown((prev) =>
                  prev === 'entreprises' ? null : 'entreprises'
                )
              }
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[13.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeNav === 'entreprises'
                  ? 'bg-[#FFF5DA] text-[#0B1E40]'
                  : 'text-[#0B1E40] hover:text-[#B57D14]'
              }`}
            >
              <span>{t3(lang, 'Entreprises', 'Business', 'الشركات')}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openDropdown === 'entreprises' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openDropdown === 'entreprises' && (
              <div
                data-gsap-menu
                className="absolute left-0 top-full mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl p-1.5 z-50"
              >
                {entreprisesItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setOpenDropdown(null);
                      onSelectSolution(item.id);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FFF7E2] transition-colors flex flex-col cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#0B1E40]">
                      {item.title[lang]}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {item.subtitle[lang]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Nos conseils */}
          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              onOpenAdvice();
            }}
            className={`px-3 py-1.5 rounded-full text-[13.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeNav === 'conseils'
                ? 'bg-[#FFF5DA] text-[#0B1E40] font-bold shadow-sm'
                : 'text-[#0B1E40] hover:text-[#B57D14]'
            }`}
          >
            {t3(lang, 'Nos conseils', 'Our Advice', 'نصائحنا')}
          </button>

          <button
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              onOpenContact();
            }}
            className={`px-3 py-1.5 rounded-full text-[13.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeNav === 'contact'
                ? 'bg-[#FFF5DA] text-[#0B1E40] font-bold shadow-sm'
                : 'text-[#0B1E40] hover:text-[#B57D14]'
            }`}
          >
            {t3(lang, 'Contact', 'Contact', 'اتصل بنا')}
          </button>
        </div>

        {/* Mobile left active pill + menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t3(lang, 'Fermer le menu', 'Close menu', 'إغلاق القائمة') : t3(lang, 'Ouvrir le menu', 'Open menu', 'فتح القائمة')}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-[#0B1E40] hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={onSelectHome}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-gold-pill text-[#0B1E40] shadow-sm whitespace-nowrap"
          >
            {t3(lang, 'Accueil', 'Home', 'الرئيسية')}
          </button>
        </div>

        {/* Right Espace client button — opens RMA's client portal */}
        <a
          data-magnetic
          href={RMA_CLIENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            setOpenDropdown(null);
            setMobileMenuOpen(false);
          }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border-[1.5px] border-[#D99E26] bg-[#FFFDF7] hover:bg-[#FEF4D8] text-[#0B1E40] text-xs sm:text-[13.5px] font-bold shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[36px]"
        >
          <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0B1E40] fill-[#0B1E40]" />
          <span>{t3(lang, 'Espace client', 'Client Portal', 'فضاء الزبون')}</span>
        </a>
      </div>

      {/* Mobile Collapsible Drawer */}
      {mobileMenuOpen && (
        <div
          data-gsap-drawer
          className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg"
        >
          <div className="grid grid-cols-2 gap-2">
            {INSURANCE_SOLUTIONS.map((sol) => (
              <button
                key={sol.id}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSelectSolution(sol.id);
                }}
                className="text-left px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-[#FFF7E2] border border-slate-200/80 text-xs font-bold text-[#0B1E40] min-h-[44px]"
              >
                {sol.title[lang]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdvice();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-[#0B1E40] min-h-[44px]"
            >
              {t3(lang, 'Nos conseils', 'Our Advice', 'نصائحنا')}
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#0B1E40] text-xs font-bold text-white min-h-[44px]"
            >
              {t3(lang, 'Contact Tanger', 'Tangier Contact', 'اتصل بنا - طنجة')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
