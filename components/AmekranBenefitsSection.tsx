'use client';

import Image from 'next/image';
import { ArrowRight, ShieldCheck, TimerReset, UserStar } from 'lucide-react';
import { t3, type Language } from '@/lib/insurance';

interface AmekranBenefitsSectionProps {
  lang: Language;
}

export default function AmekranBenefitsSection({
  lang,
}: AmekranBenefitsSectionProps) {
  const headingPart1 = t3(lang, 'Un accompagnement ', 'A tailored ', 'مواكبة ');
  const headingPart2 = t3(lang, 'sur mesure', 'approach', 'مصممة لكم');
  const subtitleText = t3(
    lang,
    "Profitez d'une expérience complète et d'un service de confiance",
    'Enjoy a complete experience and trusted service',
    'استفد من تجربة كاملة وخدمة موثوقة',
  );

  const cards = [
    {
      id: 'expertise',
      icon: UserStar,
      title: t3(lang, 'Expertise et Expérience', 'Expertise & Experience', 'الخبرة والتجربة'),
      desc: t3(
        lang,
        'Forte de son histoire, Amékran est une agence leader à Tanger, reconnue pour son expertise et sa fiabilité.',
        'With a strong history, Amékran is a leading agency in Tangier, recognized for expertise and reliability.',
        'بفضل تاريخها الحافل، AMEKRAN وكالة رائدة في طنجة، تشتهر بخبرتها وموثوقيتها.',
      ),
    },
    {
      id: 'solutions',
      icon: ShieldCheck,
      title: t3(lang, 'Solutions personnalisées', 'Tailored Solutions', 'حلول مخصصة'),
      desc: t3(
        lang,
        "Amékran Assurances propose une gamme complète de produits d'assurance adaptés à vos besoins spécifiques.",
        'Amékran Assurances offers a complete range of insurance products adapted to your specific needs.',
        'توفّر AMEKRAN للتأمين تشكيلة كاملة من منتجات التأمين المتكيّفة مع احتياجاتكم الخاصة.',
      ),
    },
    {
      id: 'assistance',
      icon: TimerReset,
      title: t3(lang, 'Assistance 24h/7j', '24/7 Assistance', 'مساعدة 24س/7أيام'),
      desc: t3(
        lang,
        'Nos conseillers à Tanger sont disponibles 24h/7j pour vous offrir une assistance optimale.',
        'Our advisors in Tangier are available 24/7 to provide you with optimal assistance.',
        'مستشارونا في طنجة متاحون على مدار 24س/7أيام لتقديم مساعدة مثالية لكم.',
      ),
    },
  ];

  return (
    <section
      aria-label={t3(
        lang,
        'Présentation et accompagnement sur mesure',
        'Presentation and tailored support',
        'تقديم ومواكبة مصممة لكم',
      )}
      className="relative z-10 overflow-hidden py-16 sm:py-20 lg:py-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F2F7FE_26%,#ECF3FC_64%,#F8FBFF_100%)]"
    >
      {/* Soft flowing background ribbons */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-64 -top-44 h-[430px] w-[880px] rotate-[-8deg] rounded-[50%] bg-[#E7F0FB]/85" />
        <div className="absolute -right-56 top-24 h-[380px] w-[780px] rotate-[6deg] rounded-[50%] bg-[#EDF4FD]/75" />
        <div className="absolute -bottom-64 left-1/4 h-[460px] w-[980px] rounded-[50%] bg-[#E9F2FB]/70" />
      </div>

      {/* Faded Moroccan woven-star watermark */}
      <div
        aria-hidden="true"
        className="absolute top-2 end-2 sm:top-4 sm:end-8 lg:top-6 lg:end-14 pointer-events-none select-none opacity-70"
      >
        <Image
          src="/moroccan-woven-star.svg"
          alt=""
          width={380}
          height={380}
          priority={false}
          className="w-56 h-56 sm:w-72 sm:h-72 lg:w-[380px] lg:h-[380px]"
        />
      </div>

      <div className="relative z-10 max-w-[1260px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-gsap-reveal className="text-center max-w-[920px] mx-auto">
          <h2
            data-gsap-item
            className="text-[27px] sm:text-[37px] lg:text-[46px] font-extrabold text-[#0B1E40] leading-[1.12] tracking-[-0.02em]"
          >
            {headingPart1}
            <span className="bg-[linear-gradient(90deg,#DC9E11_0%,#F4C64F_48%,#D4970F_100%)] bg-clip-text text-transparent">
              {headingPart2}
            </span>
          </h2>

          <p
            data-gsap-item
            className="text-[14.5px] sm:text-[17px] lg:text-[19.5px] text-[#4A5D78] mt-3.5 sm:mt-4 lg:mt-5 font-medium"
          >
            {subtitleText}
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div
          data-gsap-reveal
          className="mt-9 sm:mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                data-gsap-item
                className="group relative flex flex-col overflow-hidden rounded-[22px] lg:rounded-[26px] bg-white p-6 sm:p-7 lg:p-9 shadow-[0_20px_46px_-26px_rgba(11,30,64,0.28)] border border-[#E8F0F9] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_-24px_rgba(11,30,64,0.32)]"
              >
                {/* Each card gets its own decorative background effect */}
                {card.id === 'expertise' && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 320"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    fill="none"
                  >
                    {/* Concentric arcs radiating from the bottom-right corner */}
                    <circle cx="250" cy="330" r="90" stroke="#E7EFF9" strokeWidth="22" />
                    <circle cx="250" cy="330" r="150" stroke="#EFF5FC" strokeWidth="18" />
                    <circle cx="250" cy="330" r="212" stroke="#E7EFF9" strokeWidth="14" />
                    <circle cx="250" cy="330" r="278" stroke="#F2F7FD" strokeWidth="12" />
                  </svg>
                )}
                {card.id === 'solutions' && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 320"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute -right-6 top-0 h-full w-[55%]"
                    fill="none"
                  >
                    {/* Flowing swoosh curves (existing effect) */}
                    <path
                      d="M75 -50 C 205 45, 195 215, 30 340"
                      stroke="#E7EFF9"
                      strokeWidth="30"
                      strokeLinecap="round"
                    />
                    <path
                      d="M142 -70 C 285 55, 265 245, 95 380"
                      stroke="#EFF5FC"
                      strokeWidth="24"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {card.id === 'assistance' && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 320"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    fill="none"
                  >
                    {/* Dot grid in the top-left + diagonal speed lines */}
                    <defs>
                      <pattern
                        id="assistance-dots"
                        width="18"
                        height="18"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="3" cy="3" r="3" fill="#E7EFF9" />
                      </pattern>
                    </defs>
                    <rect width="150" height="160" fill="url(#assistance-dots)" />
                    <path d="M110 380 L 400 90" stroke="#EFF5FC" strokeWidth="26" strokeLinecap="round" />
                    <path d="M160 400 L 440 140" stroke="#E7EFF9" strokeWidth="18" strokeLinecap="round" />
                    <circle cx="205" cy="255" r="60" stroke="#EFF5FC" strokeWidth="16" />
                  </svg>
                )}

                <div className="relative z-10">
                  {/* Icon Medallion */}
                  <div className="flex h-[60px] w-[60px] lg:h-16 lg:w-16 items-center justify-center rounded-[16px] lg:rounded-[18px] bg-[#0B1E40] shadow-[0_10px_22px_-10px_rgba(11,30,64,0.55)]">
                    <Icon
                      className="w-7 h-7 lg:w-8 lg:h-8 text-[#E9B84C]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-6 lg:mt-7 text-[20px] sm:text-[22px] lg:text-[25px] font-extrabold text-[#0B1E40] tracking-[-0.01em]">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-[14.5px] sm:text-[15.5px] lg:text-[16.5px] text-[#42546E] leading-[1.6]">
                    {card.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-auto pt-7 flex items-center gap-3 text-[13.5px] sm:text-[14.5px] lg:text-[15px] font-bold text-[#0B1E40]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E9BC55] to-[#C7891A] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight
                      className="w-4 h-4 text-white"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{t3(lang, 'Amékran Assurances Tanger', 'Amékran Assurances Tangier', 'AMEKRAN للتأمين طنجة')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
