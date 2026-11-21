'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import agencyPortalImg from '@/src/assets/images/client_portal_agency_1794666348528.jpg';
import { t3, type Language } from '@/lib/insurance';

interface ClientPortalSectionProps {
  lang: Language;
  onOpenClientPortal: () => void;
}

export default function ClientPortalSection({
  lang,
  onOpenClientPortal,
}: ClientPortalSectionProps) {
  const checklist = [
    t3(
      lang,
      'Suivez vos dossiers maladie en temps réel',
      'Track your medical claims in real time',
      'تابع ملفاتكم في الصحة في الوقت الحقيقي',
    ),
    t3(
      lang,
      "Consultez vos situations d'épargne en un clic",
      'View your savings statements in one click',
      'اطّلع على حالات ادخاركم بنقرة واحدة',
    ),
    t3(
      lang,
      'Accédez en toute simplicité à votre espace Automobile',
      'Access your Auto & Fleet coverage effortlessly',
      'ادخل بكل بساطة إلى فضائكم الخاص بالسيارات',
    ),
  ];

  return (
    <section
      id="espace-client"
      aria-label={t3(
        lang,
        'Espace client Amekran Assurances',
        'Amekran Assurances Client Portal',
        'فضاء الزبون AMEKRAN للتأمين',
      )}
      className="relative z-10 bg-white pt-4 pb-8 sm:pt-6 sm:pb-12 lg:pt-7 lg:pb-14 px-3 sm:px-6 lg:px-10"
    >
      <div
        data-gsap-reveal
        className="relative max-w-[1280px] mx-auto overflow-hidden rounded-[24px] lg:rounded-[30px] border border-[#D99E26]/35 shadow-[0_24px_56px_-18px_rgba(6,20,48,0.42)]"
        style={{
          background:
            'linear-gradient(112deg, #061534 0%, #0B224D 50%, #102B5E 82%, #07193B 100%)',
        }}
      >
        {/* Top metallic gold hairline sheen */}
        <div
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#F6D36E]/75 to-transparent pointer-events-none"
        />

        {/* Ambient sapphire-gold glow behind right media */}
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 w-[460px] h-[460px] rounded-full pointer-events-none opacity-45"
          style={{
            background:
              'radial-gradient(circle, rgba(244,203,100,0.22) 0%, rgba(28,74,158,0.18) 45%, transparent 72%)',
          }}
        />

        {/* Ambient subtle sapphire-gold glow behind left watermark */}
        <div
          aria-hidden="true"
          className={`absolute ${
            lang === 'ar' ? '-right-20' : '-left-20'
          } -bottom-20 w-[420px] h-[420px] rounded-full pointer-events-none opacity-35`}
          style={{
            background:
              'radial-gradient(circle, rgba(244,203,100,0.16) 0%, rgba(28,74,158,0.2) 48%, transparent 72%)',
          }}
        />

        {/* Amekran logo watermark in the background on the left side (behind text & CTA) */}
        <div
          data-gsap-item
          aria-hidden="true"
          className={`absolute pointer-events-none select-none z-0 ${
            lang === 'ar'
              ? '-right-10 sm:-right-6 lg:right-2 top-1/2 -translate-y-1/2'
              : '-left-10 sm:-left-6 lg:left-2 top-1/2 -translate-y-1/2'
          } w-[300px] h-[310px] sm:w-[380px] sm:h-[390px] lg:w-[460px] lg:h-[475px]`}
        >
          <div
            data-gsap-parallax="-36"
            className="relative w-full h-full brightness-150 contrast-125 opacity-75 lg:opacity-90"
          >
            <Image
              src="/amekran-logo-watermark.svg"
              alt=""
              fill
              sizes="(max-width: 768px) 300px, 460px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Main 2-Column Showcase Content */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-9 lg:gap-10 items-center px-5 py-7 sm:px-9 sm:py-10 lg:px-12 lg:py-11">
          {/* Left Column: Headline, Checklist & Connect CTA */}
          <div className="lg:col-span-6 space-y-5">
            <div
              data-gsap-item
              className="flex items-start gap-3.5 sm:gap-4"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/10 border border-[#F5CE67]/45 text-[#F6D36E] flex items-center justify-center shrink-0 shadow-[0_8px_20px_rgba(0,0,0,0.24)] mt-0.5">
                <ShieldCheck className="w-6 h-6" strokeWidth={2} />
              </div>

              <h2 className="text-[20px] sm:text-[25px] lg:text-[28px] font-extrabold text-white leading-[1.2] tracking-tight text-balance">
                {t3(
                  lang,
                  'Accédez à votre espace client et gérez vos dossiers en toute autonomie !',
                  'Access your client portal and manage your policies effortlessly!',
                  'ادخل إلى فضاء الزبون وتوصّل مساراتك باستقلالية تامة!',
                )}
              </h2>
            </div>

            {/* Tapered Metallic Gold Rule */}
            <div
              data-gsap-item
              aria-hidden="true"
              className="h-[2px] w-48 sm:w-64 bg-gradient-to-r from-[#F6D36E] via-[#D99E26] to-transparent"
            />

            {/* Benefits Checklist */}
            <ul className="space-y-3">
              {checklist.map((item) => (
                <li
                  key={item}
                  data-gsap-item
                  className="flex items-center gap-3 text-[13.5px] sm:text-[15px] text-white/95 font-medium"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-[#F5CE67] shrink-0"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Connect CTA */}
            <div data-gsap-item className="pt-1">
              <button
                type="button"
                onClick={onOpenClientPortal}
                className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white hover:bg-[#FFF8E4] text-[#081A3D] text-[14px] sm:text-[15px] font-extrabold border border-[#F5CE67]/60 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.45)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[46px] whitespace-nowrap"
              >
                <span>{t3(lang, 'Connectez-vous', 'Sign in', 'سجّل الدخول')}</span>
                <ArrowRight
                  className="w-4 h-4 text-[#B87D14] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Tangier Agency Photography with Scroll Parallax */}
          <div
            data-gsap-item
            className="lg:col-span-6 lg:flex lg:justify-end"
          >
            <div className="relative w-full max-w-[520px] aspect-[16/10] rounded-2xl overflow-hidden border border-[#F5CE67]/40 shadow-[0_20px_48px_-14px_rgba(2,10,28,0.72)] bg-[#0A2048]">
              <div
                data-gsap-parallax="40"
                className="relative w-full h-[116%] -top-[8%]"
              >
                <Image
                  src={agencyPortalImg}
                  alt={t3(
                    lang,
                    'Conseillers Amekran Assurances accueillant un client dans notre agence à Tanger',
                    'Amekran Assurances advisors welcoming a policyholder in Tangier',
                    'مستشارو AMEKRAN للتأمين يستقبلون زبونا في وكالتنا بطنجة',
                  )}
                  fill
                  sizes="(max-width: 1024px) 92vw, 520px"
                  referrerPolicy="no-referrer"
                  className="object-cover object-center"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#061430]/35 via-transparent to-transparent pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
