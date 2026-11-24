'use client';

import { useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import {
  Check,
  ChevronRight,
  Maximize2,
  Phone,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import offer15Family from '@/src/assets/images/offers/-15_family.jpg';
import offer25HomeCar from '@/src/assets/images/offers/-25_home_car_offer.jpg';
import offerTotalEnergies from '@/src/assets/images/offers/total_energies.jpg';
import { t3, type Language } from '@/lib/insurance';

interface SpecialOfferItem {
  id: string;
  image: StaticImageData;
  badge: { fr: string; en: string; ar: string };
  badgeColor: string;
  title: { fr: string; en: string; ar: string };
  tagline: { fr: string; en: string; ar: string };
  highlights: Array<{ fr: string; en: string; ar: string }>;
  ctaText: { fr: string; en: string; ar: string };
}

const SPECIAL_OFFERS: SpecialOfferItem[] = [
  {
    id: 'pack-auto-habitation',
    image: offer25HomeCar,
    badge: {
      fr: '-25% sur l’Habitation',
      en: '-25% on Home Insurance',
      ar: '25%- على تأمين الدار',
    },
    badgeColor: 'from-[#D99E26] to-[#F5CE67] text-[#0B1E40]',
    title: {
      fr: 'Pack Combiné Auto + Habitation',
      en: 'Combined Auto + Home Bundle',
      ar: 'باقة الدار والسيارة معاً',
    },
    tagline: {
      fr: 'Assurez votre véhicule et votre domicile en même temps auprès d’AMEKRAN Assurances et bénéficiez de -25% immédiats sur votre prime multirisque habitation.',
      en: 'Insure your vehicle and home together with AMEKRAN Assurances and enjoy an immediate -25% discount on your comprehensive home insurance premium.',
      ar: 'أمّن الدار والسيارة في نفس الوقت عند وكالة أمقران بطنجة واقتصد فالثمن: استفد فوراً من تخفيض 25% على تأمين دارك.',
    },
    highlights: [
      {
        fr: '-25% direct sur votre contrat Multirisque Habitation',
        en: 'Direct -25% savings on your Home Insurance contract',
        ar: 'تخفيض مباشر بنسبة 25% على تأمين السكن',
      },
      {
        fr: 'Gestion unifiée et simplifiée d’un seul interlocuteur à Tanger',
        en: 'Unified single-advisor claim and policy management in Tangier',
        ar: 'تدبير موحد وبسيط مع مخاطب واحد معتمد بطنجة',
      },
      {
        fr: 'Assistance dépannage et serrurerie d’urgence 24h/7j',
        en: '24/7 emergency roadside and locksmith dispatch assistance',
        ar: 'مساعدة وإغاثة طارئة 24/7 للسيارة والمنزل',
      },
    ],
    ctaText: {
      fr: 'Profiter du Pack -25%',
      en: 'Claim the -25% Bundle',
      ar: 'الاستفادة من باقة 25%-',
    },
  },
  {
    id: 'offre-auto-famille',
    image: offer15Family,
    badge: {
      fr: '-15% Réduction Famille',
      en: '-15% Family Discount',
      ar: '15%- تخفيض عائلي',
    },
    badgeColor: 'from-[#0E8A5E] to-[#1CD392] text-white',
    title: {
      fr: 'Offre Auto Protection Famille',
      en: 'Family Protection Auto Offer',
      ar: 'تخفيض 15% على تأمين السيارات العائلي',
    },
    tagline: {
      fr: 'Avec RMA et AMEKRAN, la protection réunit toute la famille : vos parents, votre conjoint(e), vos enfants et votre fratrie bénéficient de 15% de remise sur leur contrat automobile.',
      en: 'With RMA and AMEKRAN, protection unites the whole family: parents, spouse, children, and siblings benefit from a 15% discount on their auto insurance policy.',
      ar: 'مع RMA وأمقران، الحماية كتجمع العائلة كاملة: الوالدين، الزوج أو الزوجة، الأبناء والإخوة كيستافدو من تخفيض مميز 15% على تأمين السيارات.',
    },
    highlights: [
      {
        fr: 'Éligible pour parents, conjoint, enfants et fratrie',
        en: 'Eligible for parents, spouse, children, and siblings',
        ar: 'يشمل الوالدين، الزوج أو الزوجة، الأبناء والإخوة',
      },
      {
        fr: 'Tarifs préférentiels garantis et garanties sur-mesure',
        en: 'Guaranteed preferential rates with tailored protection tiers',
        ar: 'تعريفة تفضيلية مضمونة وتغطيات مصممة حسب الاحتياج',
      },
      {
        fr: 'Émission rapide et attestation immédiate à l’agence de Tanger',
        en: 'Rapid policy issuance and certificate delivery at Tangier agency',
        ar: 'إصدار سريع وتسليم فوري للشهادة بوكالة طنجة',
      },
    ],
    ctaText: {
      fr: 'Demander l’Offre Famille',
      en: 'Request Family Offer',
      ar: 'طلب العرض العائلي',
    },
  },
  {
    id: 'partenariat-totalenergies',
    image: offerTotalEnergies,
    badge: {
      fr: 'Partenariat TotalEnergies',
      en: 'TotalEnergies Club Perk',
      ar: 'شراكة نادي TotalEnergies',
    },
    badgeColor: 'from-[#D9381E] to-[#FA6941] text-white',
    title: {
      fr: 'Club TotalEnergies & RMA',
      en: 'TotalEnergies Club & RMA',
      ar: 'نادي TotalEnergies و RMA',
    },
    tagline: {
      fr: 'Membres du Club TotalEnergies : profitez de 10% de remise sur votre assurance Automobile RMA et donnez encore plus de valeur à vos points de fidélité.',
      en: 'TotalEnergies Club members: take advantage of 10% off your RMA Auto Insurance and get maximum value from your accumulated loyalty points.',
      ar: 'لأعضاء نادي TotalEnergies: استفد من 10% تخفيض على تأمين السيارات RMA مع تثمين حقيقي لنقاط الوفاء الخاصة بك.',
    },
    highlights: [
      {
        fr: '-10% immédiats sur votre contrat Automobile RMA',
        en: 'Immediate -10% on your RMA Auto contract',
        ar: 'تخفيض مباشر 10% على عقد تأمين السيارات',
      },
      {
        fr: 'Points fidélité valorisés sur vos services et primes',
        en: 'Loyalty points valorized toward services and premiums',
        ar: 'تثمين نقاط الوفاء على الخدمات والأقساط',
      },
      {
        fr: 'Conditions avantageuses et accompagnement local AMEKRAN',
        en: 'Privileged terms with local AMEKRAN Tanger claim assistance',
        ar: 'شروط امتيازية ومرافقة مستمرة من طرف وكيلكم بطنجة',
      },
    ],
    ctaText: {
      fr: 'Profiter de l’Avantage Club',
      en: 'Access Club Discount',
      ar: 'الاستفادة من امتياز النادي',
    },
  },
];

interface SpecialOffersSectionProps {
  lang: Language;
  onOpenContact: () => void;
}

export default function SpecialOffersSection({
  lang,
  onOpenContact,
}: SpecialOffersSectionProps) {
  const [zoomedOffer, setZoomedOffer] = useState<SpecialOfferItem | null>(null);

  return (
    <section
      id="offres-speciales"
      aria-labelledby="offres-speciales-title"
      className="relative z-10 scroll-mt-28 overflow-hidden bg-[linear-gradient(180deg,#F6F9FD_0%,#FFFFFF_38%,#EEF4FC_100%)] py-14 sm:py-18 lg:py-20"
    >
      {/* Decorative ribbons matching landing page sections */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#184694]/5 blur-3xl" />
        <span className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#D99E26]/7 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading respecting exact theme and typography of the landing page */}
        <SectionHeading
          lang={lang}
          id="offres-speciales-title"
          title={t3(
            lang,
            'Nos offres spéciales & avantages partenaires',
            'Our special offers & partner benefits',
            'عروض خاصة وامتيازات حصرية لزبناء أمقران'
          )}
          subtitle={t3(
            lang,
            'En tant qu’Agent Général agréé RMA à Tanger, AMEKRAN Assurances met à votre disposition des réductions exclusives sur vos contrats Auto, Habitation et Famille.',
            'As an authorized RMA General Agent in Tangier, AMEKRAN Assurances provides you with exclusive premium savings across your Auto, Home, and Family policies.',
            'بصفتها الوكيل العام المعتمد لـ RMA بطنجة، تضع تأمينات أمقران رهن إشارتكم عروضاً وتخفيضات حصرية على عقود السيارات، السكن، وتأمين العائلة.'
          )}
          className="mb-10 sm:mb-14"
        />

        {/* 3 Interactive Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SPECIAL_OFFERS.map((offer) => (
            <article
              key={offer.id}
              className="group relative flex flex-col rounded-2xl sm:rounded-3xl bg-white border border-[#E1E9F4] hover:border-[#D8C48A]/80 shadow-[0_16px_44px_-34px_rgba(11,30,64,0.55)] hover:shadow-[0_24px_54px_-30px_rgba(11,30,64,0.45)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle gold highlight line at top of card */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#D99E26]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
              />

              {/* Top Card Poster Image with Zoom Trigger */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setZoomedOffer(offer)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setZoomedOffer(offer);
                  }
                }}
                aria-label={t3(
                  lang,
                  `Agrandir l'affiche : ${offer.title.fr}`,
                  `Zoom in poster: ${offer.title.en}`,
                  `تكبير الإعلان: ${offer.title.ar}`
                )}
              >
                <Image
                  src={offer.image}
                  alt={offer.title[lang]}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={offer.id === 'pack-auto-habitation'}
                />

                {/* Subtle gradient vignette at bottom of image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-3.5 start-3.5 z-10">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold shadow-md bg-gradient-to-r ${offer.badgeColor}`}
                  >
                    <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{offer.badge[lang]}</span>
                  </span>
                </div>

                {/* Quick zoom icon */}
                <div className="absolute top-3.5 end-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 text-[#0B1E40] hover:bg-white shadow-md backdrop-blur-sm">
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col bg-white">
                <h3 className="text-[17px] sm:text-[18px] lg:text-[19px] font-bold text-[#0B1E40] mb-2 leading-tight group-hover:text-[#B7791F] transition-colors">
                  {offer.title[lang]}
                </h3>

                <p className="text-[12.5px] leading-relaxed text-[#51648C] mb-4">
                  {offer.tagline[lang]}
                </p>

                {/* Key Highlights Bullet points */}
                <ul className="space-y-2.5 mb-6">
                  {offer.highlights.map((h, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-[12px] leading-snug text-[#283B66]"
                    >
                      <span className="mt-[2px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FFF7DE] ring-1 ring-[#E8CF8E]/70 text-[#B7791F]">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span>{h[lang]}</span>
                    </li>
                  ))}
                </ul>

                {/* Card Actions Footer */}
                <div className="mt-auto pt-4 border-t border-[#EEF3FA] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    type="button"
                    onClick={onOpenContact}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D99E26] via-[#F4CB64] to-[#E5B548] text-[#0B1E40] font-bold text-xs sm:text-[13px] shadow-[0_4px_16px_rgba(244,203,100,0.25)] hover:shadow-[0_6px_20px_rgba(244,203,100,0.4)] hover:brightness-105 transition-all cursor-pointer"
                  >
                    <span>{offer.ctaText[lang]}</span>
                    <ChevronRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                  </button>

                  <a
                    href="tel:0661508925"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#F4F8FE] hover:bg-[#EBF2FC] border border-[#DCE7F4] text-[#0B1E40] hover:text-[#B7791F] text-xs font-semibold transition-all"
                    aria-label="Appeler l'agence au 0661 50 89 25"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B7791F]" aria-hidden="true" />
                    <span className="tabular-nums font-bold">0661 50 89 25</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Agency guarantee footer callout */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl border border-[#DCE7F4] bg-white shadow-[0_14px_40px_-30px_rgba(11,30,64,0.4)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-start">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF7DE] to-[#F7E7B4] ring-1 ring-[#E8CF8E]/70 text-[#B7791F]">
              <Sparkles className="w-6 h-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm sm:text-base font-bold text-[#0B1E40]">
                {t3(
                  lang,
                  'Des offres valables directement à l’agence AMEKRAN Tanger',
                  'Offers valid directly at AMEKRAN Tangier agency',
                  'عروض متوفرة مباشرة بوكالة أمقران للتأمين بطنجة'
                )}
              </p>
              <p className="text-xs sm:text-sm text-[#51648C]">
                {t3(
                  lang,
                  'Bénéficiez de conseils personnalisés, d’un devis instantané et de conditions de paiement souples.',
                  'Enjoy personalized advice, an instant estimate, and flexible payment arrangements.',
                  'استفد من استشارة مخصصة، دراسة مجانية لملفك، وتسهيلات مريحة في الأداء.'
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenContact}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B1E40] hover:bg-[#152B58] text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <span>
              {t3(
                lang,
                'Prendre contact avec un conseiller',
                'Speak with an advisor',
                'التواصل مع مستشار الوكالة'
              )}
            </span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Lightbox / Zoom Modal for full poster inspection */}
      {zoomedOffer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomedOffer.title[lang]}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={() => setZoomedOffer(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white border border-[#E1E9F4] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#EEF3FA] bg-[#F7F9FC]">
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gradient-to-r ${zoomedOffer.badgeColor}`}
                >
                  {zoomedOffer.badge[lang]}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-[#0B1E40] truncate">
                  {zoomedOffer.title[lang]}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setZoomedOffer(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B1E40] hover:bg-slate-200/60 transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Image display */}
            <div className="relative aspect-square w-full max-h-[65vh] bg-slate-50">
              <Image
                src={zoomedOffer.image}
                alt={zoomedOffer.title[lang]}
                fill
                sizes="(max-width: 768px) 90vw, 650px"
                className="object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#F7F9FC] border-t border-[#EEF3FA] flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="tel:0661508925"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1E40] hover:text-[#B7791F]"
              >
                <Phone className="w-4 h-4 text-[#B7791F]" />
                <span>Agence Tanger : 0661 50 89 25</span>
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setZoomedOffer(null);
                    onOpenContact();
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#D99E26] via-[#F4CB64] to-[#E5B548] text-[#0B1E40] font-bold text-xs sm:text-sm hover:brightness-105 transition-all cursor-pointer"
                >
                  <span>{zoomedOffer.ctaText[lang]}</span>
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
