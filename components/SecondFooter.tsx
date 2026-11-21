'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import {
  INSURANCE_SOLUTIONS,
  t3,
  type Language,
  type SolutionId,
} from '@/lib/insurance';
import { RMA_URL } from '@/lib/rma';

interface SecondFooterProps {
  lang: Language;
  onSelectSolution: (id: SolutionId) => void;
  onOpenAdvice: () => void;
  onOpenContact: () => void;
}

/**
 * Light second footer that closes the page flow, just above the fixed
 * gold-and-navy wave footer. Its bottom padding keeps its content clear of
 * that fixed bar; the columns reveal with the site-wide scroll choreography.
 */
export default function SecondFooter({
  lang,
  onSelectSolution,
  onOpenContact,
}: SecondFooterProps) {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com',
      icon: Facebook,
      label: 'Facebook Amekran Assurances',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com',
      icon: Instagram,
      label: 'Instagram Amekran Assurances',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com',
      icon: Linkedin,
      label: 'LinkedIn Amekran Assurances',
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com',
      icon: Youtube,
      label: 'YouTube Amekran Assurances',
    },
  ];

  return (
    <section
      aria-label={t3(
        lang,
        'Navigation secondaire et informations légales',
        'Secondary footer navigation and legal notice',
        'التنقل الثانوي والمعلومات القانونية'
      )}
      className="relative z-10 overflow-hidden bg-[#F8FAFD] text-[#1A2B56] border-t border-[#E4EAF4]"
    >
      {/* Moroccan woven-star watermark, fully in view at the top behind content: left in RTL, right in LTR */}
      <div
        aria-hidden="true"
        className={`absolute top-4 sm:top-6 pointer-events-none select-none opacity-25 lg:opacity-30 z-0 transition-all duration-300 ${
          lang === 'ar'
            ? 'left-3 sm:left-6 lg:left-10 right-auto'
            : 'right-3 sm:right-6 lg:right-10 left-auto'
        }`}
      >
        <Image
          src="/moroccan-woven-star.svg"
          alt=""
          width={320}
          height={320}
          priority={false}
          className="w-56 h-56 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] object-contain"
        />
      </div>

      <div className="relative z-10 max-w-[1160px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-[95px] sm:pb-[115px] lg:pb-[140px]">
        {/* Responsive 4-column links: 2 columns on mobile, 4 columns on desktop */}
        <div
          data-gsap-reveal
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6 lg:gap-10"
        >
          {/* Column 1: Nos offres */}
          <div data-gsap-item>
            <h3 className="text-[13.5px] sm:text-[15px] font-bold text-[#142554] mb-2.5 sm:mb-4">
              {t3(lang, 'Nos offres :', 'Our Offers:', 'عروضنا:')}
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-[12px] sm:text-[13.5px] text-[#283B66]">
              {INSURANCE_SOLUTIONS.map((sol) => (
                <li key={sol.id}>
                  <button
                    type="button"
                    onClick={() => onSelectSolution(sol.id)}
                    className="hover:text-[#D99E26] transition-colors text-start cursor-pointer"
                  >
                    {sol.title[lang]}
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href={`/${lang}#offres-rma`}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#B7791F] transition-colors hover:text-[#8A5A0F]"
                >
                  {t3(
                    lang,
                    'Offres & règles RMA',
                    'RMA offers & rules',
                    'عروض وقواعد RMA'
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Déclarer un sinistre */}
          <div data-gsap-item>
            <h3 className="text-[13.5px] sm:text-[15px] font-bold text-[#142554] mb-2.5 sm:mb-4">
              {t3(lang, 'Déclarer un sinistre :', 'Report a Claim:', 'التصريح بحادث:')}
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-[12px] sm:text-[13.5px] text-[#283B66]">
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-[#D99E26] transition-colors text-start cursor-pointer"
                >
                  {t3(lang, 'Sinistre automobile', 'Auto Claim', 'حادث سيارة')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-[#D99E26] transition-colors text-start cursor-pointer"
                >
                  {t3(
                    lang,
                    'Sinistre habitation & entreprise',
                    'Home & Business Claim',
                    'حادث سكن أو شركة'
                  )}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-[#D99E26] transition-colors text-start cursor-pointer"
                >
                  {t3(
                    lang,
                    'Assistance Poids lourds & Flottes',
                    'Truck & Fleet Assistance',
                    'مساعدة الشاحنات والأساطيل'
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Aide et assistance */}
          <div data-gsap-item>
            <h3 className="text-[13.5px] sm:text-[15px] font-bold text-[#142554] mb-2.5 sm:mb-4">
              {t3(lang, 'Aide et assistance :', 'Help & Assistance:', 'المساعدة والدعم:')}
            </h3>
            <ul className="space-y-1.5 sm:space-y-2.5 text-[12px] sm:text-[13.5px] text-[#283B66]">
              <li>
                <Link
                  href={`/${lang}/conseils`}
                  className="hover:text-[#D99E26] transition-colors text-start inline-block"
                >
                  {t3(lang, 'Conseils & FAQ', 'Advice & FAQ', 'النصائح والأسئلة الشائعة')}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="hover:text-[#D99E26] transition-colors text-start cursor-pointer"
                >
                  {t3(lang, 'Nous contacter', 'Contact Us', 'اتصل بنا')}
                </button>
              </li>
              <li>
                {/* About page link — navigates to the dedicated À propos route */}
                <Link
                  href={`/${lang}/a-propos`}
                  className="hover:text-[#D99E26] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block w-1 h-1 rounded-full bg-[#D99E26] opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                  />
                  {t3(lang, "À propos d'Amekran", 'About Amekran', 'من نحن')}
                </Link>
              </li>
              <li>
                <a
                  href="tel:0661508925"
                  className="hover:text-[#D99E26] transition-colors inline-block leading-relaxed"
                >
                  {t3(
                    lang,
                    'Agence :',
                    'Agency:',
                    'الوكالة:'
                  )}{' '}
                  <span dir="ltr" className="whitespace-nowrap font-bold text-[#0B1E40] tabular-nums">
                    0661 50 89 25
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Suivez-nous */}
          <div data-gsap-item>
            <h3 className="text-[13.5px] sm:text-[15px] font-bold text-[#142554] mb-2.5 sm:mb-4">
              {t3(lang, 'Suivez-nous', 'Follow Us', 'تابعونا')}
            </h3>
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#697BB0]/12 hover:bg-[#142554] text-[#697BB0] hover:text-[#F4CB64] flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* RMA parent brand */}
        <div
          data-gsap-reveal
          className="mt-6 sm:mt-10 flex flex-col items-start justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-[#E1E9F4] bg-white p-3.5 sm:px-5 sm:py-4 shadow-[0_16px_40px_-34px_rgba(11,30,64,0.5)] sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex shrink-0 items-center rounded-md border border-[#E4EAF4] bg-white px-2 py-1">
              <Image
                src="/rma-logo.png"
                alt="RMA Assurance"
                width={318}
                height={84}
                className="h-5 sm:h-6 w-auto"
              />
            </span>
            <div>
              <p className="text-[12px] sm:text-[12.5px] font-bold text-[#142554]">
                {t3(
                  lang,
                  'Agence RMA Assurance à Tanger',
                  'RMA Assurance agency in Tangier',
                  'وكالة RMA للتأمين بطنجة'
                )}
              </p>
              <p className="text-[10.5px] sm:text-[11.5px] text-[#5B6E99]">
                {t3(
                  lang,
                  'AMEKRAN Assurances · Agent Général Agréé RMA',
                  'AMEKRAN Assurances · Certified RMA General Agent',
                  'AMEKRAN للتأمين · الوكيل العام المعتمد لـ RMA'
                )}
              </p>
            </div>
          </div>
          <a
            href={RMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#CBD9EA] px-3 py-1.5 text-[11px] sm:text-[12px] font-bold text-[#0B1E40] transition-colors hover:border-[#D99E26]/60 hover:text-[#B7791F]"
          >
            rmaassurance.com
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Bottom Subtle Divider & Legal Regulatory Notice */}
        <div
          data-gsap-reveal
          className="mt-5 sm:mt-8 pt-3 sm:pt-5 border-t border-[#E6ECF5] flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-[12px] text-[#5B6E99]"
        >
          <span data-gsap-item>
            {t3(
              lang,
              'Amekran Assurances · Agent Général RMA Assurance à Tanger',
              'Amekran Assurances · RMA Assurance General Agent in Tangier',
              'AMEKRAN للتأمين · الوكيل العام لـ RMA بطنجة'
            )}
          </span>
          <span data-gsap-item className="text-center sm:text-end">
            {t3(
              lang,
              'Entreprise régie par la loi n° 17-99 portant Code des Assurances',
              'Regulated under Law No. 17-99 of the Moroccan Insurance Code',
              'مقاولة خاضعة للقانون رقم 17-99 المتعلق بمدونة التأمينات'
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
