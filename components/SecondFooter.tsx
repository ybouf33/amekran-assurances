'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import {
  INSURANCE_SOLUTIONS,
  t3,
  type Language,
  type SolutionId,
} from '@/lib/insurance';

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
      href: 'https://web.facebook.com/profile.php?id=100009611230080',
      icon: Facebook,
      label: 'Facebook Amekran Assurances',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/assurances.amekran/',
      icon: Instagram,
      label: 'Instagram Amekran Assurances',
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

      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-9 sm:pt-14 pb-[112px] sm:pb-[132px] lg:pb-[158px]">
        {/* Responsive 4-column links: 2 columns on mobile, 4 columns on desktop */}
        <div
          data-gsap-reveal
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 sm:gap-8 lg:gap-12"
        >
          {/* Column 1: Nos offres */}
          <div data-gsap-item>
            <h3 className="text-[15px] sm:text-[17px] lg:text-[18px] font-bold text-[#142554] mb-3 sm:mb-5">
              {t3(lang, 'Nos offres :', 'Our Offers:', 'عروضنا:')}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-[13px] sm:text-[15px] lg:text-[16px] text-[#283B66]">
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
                    'Offres & règles AMEKRAN',
                    'AMEKRAN offers & rules',
                    'عروض وقواعد AMEKRAN'
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Déclarer un sinistre */}
          <div data-gsap-item>
            <h3 className="text-[15px] sm:text-[17px] lg:text-[18px] font-bold text-[#142554] mb-3 sm:mb-5">
              {t3(lang, 'Déclarer un sinistre :', 'Report a Claim:', 'التصريح بحادث:')}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-[13px] sm:text-[15px] lg:text-[16px] text-[#283B66]">
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
            <h3 className="text-[15px] sm:text-[17px] lg:text-[18px] font-bold text-[#142554] mb-3 sm:mb-5">
              {t3(lang, 'Aide et assistance :', 'Help & Assistance:', 'المساعدة والدعم:')}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-[13px] sm:text-[15px] lg:text-[16px] text-[#283B66]">
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
            <h3 className="text-[15px] sm:text-[17px] lg:text-[18px] font-bold text-[#142554] mb-3 sm:mb-5">
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
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#697BB0]/12 hover:bg-[#142554] text-[#697BB0] hover:text-[#F4CB64] flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Subtle Divider & Legal Regulatory Notice */}
        <div
          data-gsap-reveal
          className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-[#E6ECF5] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-[12px] sm:text-[14px] text-[#5B6E99]"
        >
          <span data-gsap-item>
            {t3(
              lang,
              'Amekran Assurances · AMEKRAN Assurances à Tanger',
              'Amekran Assurances · Insurer in Tangier',
              'AMEKRAN للتأمين بطنجة'
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
