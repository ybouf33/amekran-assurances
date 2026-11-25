'use client';

import { BadgePercent, LifeBuoy, Truck, Wrench, type LucideIcon } from 'lucide-react';
import { t3, type Language } from '@/lib/insurance';

type Localized = Record<Language, string>;

interface Benefit {
  id: string;
  icon: LucideIcon;
  title: Localized;
  description: Localized;
  accent: 'navy' | 'gold' | 'blue';
}

const BENEFITS: Benefit[] = [
  {
    id: 'modulable',
    icon: Truck,
    accent: 'navy',
    title: {
      fr: 'Offres modulables',
      en: 'Flexible covers',
      ar: 'عروض مرنة',
    },
    description: {
      fr: 'Une solution personnalisable selon les besoins et l’activité de chaque professionnel.',
      en: 'A customizable solution tailored to the needs and activity of every professional.',
      ar: 'حل قابل للتخصيص حسب احتياجات ونشاط كل مهني.',
    },
  },
  {
    id: 'tarifs',
    icon: BadgePercent,
    accent: 'navy',
    title: {
      fr: 'Tarifs avantageux',
      en: 'Competitive rates',
      ar: 'أسعار مميزة',
    },
    description: {
      fr: 'Une couverture complète à des tarifs compétitifs, y compris en Europe.',
      en: 'Complete cover at competitive rates, including across Europe.',
      ar: 'تغطية شاملة بأسعار تنافسية، بما في ذلك في أوروبا.',
    },
  },
  {
    id: 'constat',
    icon: LifeBuoy,
    accent: 'blue',
    title: {
      fr: 'Aide au constat',
      en: 'Claim assistance',
      ar: 'مساعدة في المحضر',
    },
    description: {
      fr: 'Assistance immédiate offerte pour la gestion du constat en cas d’accident.',
      en: 'Immediate assistance to manage the accident report if a claim occurs.',
      ar: 'مساعدة فورية مجانية لإدارة محضر الحادث عند وقوعه.',
    },
  },
  {
    id: 'etranger',
    icon: Wrench,
    accent: 'navy',
    title: {
      fr: 'Réparations à l’étranger',
      en: 'Repairs abroad',
      ar: 'إصلاحات في الخارج',
    },
    description: {
      fr: 'En cas d’accident en Europe, bénéficiez d’une réparation au sein de notre réseau agréé de garages, sans avance de frais.',
      en: 'If you have an accident in Europe, get repairs through our approved garage network with no upfront payment.',
      ar: 'في حال وقوع حادث في أوروبا، استفد من الإصلاح ضمن شبكتنا المعتمدة من الورش، دون دفع مسبق.',
    },
  },
];

const accentClass: Record<Benefit['accent'], string> = {
  navy: 'text-[#0B1E40]',
  gold: 'text-[#B7791F]',
  blue: 'text-[#3F5373]',
};

export default function WhyChoosePoidsLourdsSection({
  lang,
}: {
  lang: Language;
}) {
  return (
    <section
      aria-labelledby="why-choose-poids-lourds-title"
      className="bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div data-gsap-reveal className="flex flex-col items-center text-center">
          <h2
            id="why-choose-poids-lourds-title"
            className="text-balance text-[22px] font-extrabold leading-tight tracking-tight text-[#0B1E40] sm:text-[28px] lg:text-[32px]"
          >
            {t3(
              lang,
              'Pourquoi choisir l’assurance Poids Lourds RMA ?',
              'Why choose RMA heavy goods vehicle insurance?',
              'لماذا تختار تأمين الشاحنات الثقيلة RMA؟',
            )}
          </h2>
          <span
            aria-hidden="true"
            className="mt-3 h-[3px] w-12 rounded-full bg-gradient-to-r from-[#D99E26] to-[#F2CA63]"
          />
          <p
            data-gsap-item
            className="mt-4 max-w-3xl text-[13px] leading-relaxed text-slate-600 sm:text-[15px]"
          >
            {t3(
              lang,
              'Une solution sur-mesure dédiée aux transporteurs des camions poids lourds, alliant protection du véhicule, du conducteur et de l’activité.',
              'A tailored solution for heavy truck carriers, combining protection for the vehicle, the driver and the business.',
              'حل مصمم خصيصاً لناقلي الشاحنات الثقيلة، يجمع بين حماية المركبة والسائق والنشاط.',
            )}
          </p>
        </div>

        <div
          data-gsap-reveal
          className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.id}
                data-gsap-item
                className="flex flex-col rounded-[18px] bg-[#F1F3F9] p-5 sm:p-6 min-h-[190px] transition-all duration-200 hover:-translate-y-1 hover:shadow-card-soft"
              >
                <Icon
                  className={`h-9 w-9 sm:h-10 sm:w-10 shrink-0 ${accentClass[benefit.accent]}`}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-[15px] sm:text-[16px] font-extrabold leading-snug text-[#0B1E40]">
                  {benefit.title[lang]}
                </h3>
                <p className="mt-2.5 text-[12.5px] sm:text-[13px] leading-relaxed text-slate-600">
                  {benefit.description[lang]}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
