'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  FileText,
  Headset,
  Home,
  Landmark,
  Medal,
  PiggyBank,
  Plus,
  Wallet,
  Warehouse,
  Wrench,
  X,
} from 'lucide-react';
import type { StaticImageData } from 'next/image';
import TopHeader from '@/components/TopHeader';
import Navbar, { type NavSection } from '@/components/Navbar';
import TrustAndFooter from '@/components/TrustAndFooter';
import ScrollEffects from '@/components/ScrollEffects';
import GsapInteractions from '@/components/GsapInteractions';
import SectionHeading from '@/components/SectionHeading';
import SecondFooter from '@/components/SecondFooter';
import { gsap, SPLASH_LIFT_MS, SPLASH_SETTLE_MS, useGSAP } from '@/lib/gsap';
import InteractiveModals, {
  type ActiveModalType,
} from '@/components/InteractiveModals';
import {
  type CoverageTier,
  type Language,
  type SolutionId,
  estimateAnnualPremium,
  solutionPath,
  swapLocale,
  t3,
} from '@/lib/insurance';
import heroAuto from '@/src/assets/images/hero_auto_tangier_amekran_1794666685553.jpg';

/* ------------------------------------------------------------------ */
/* Offers data                                                         */
/* ------------------------------------------------------------------ */

interface AutomobileOffer {
  id: string;
  icon: typeof Landmark;
  percent: string;
  partner: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  condition: Record<Language, string>;
}

const AUTOMOBILE_OFFERS: AutomobileOffer[] = [
  {
    id: 'bank-of-africa',
    icon: Landmark,
    percent: '−10%',
    partner: 'Bank of Africa',
    title: {
      fr: 'Remise partenaire bancaire',
      en: 'Bank partner discount',
      ar: 'خصم البنك الشريك',
    },
    description: {
      fr: 'Clients Bank of Africa : 10% de remise immédiate sur votre contrat Automobile, de la formule aux tiers au Tous Risques.',
      en: 'Bank of Africa clients: an instant 10% discount on your motor policy, from third-party to comprehensive cover.',
      ar: 'عملاء Bank of Africa: خصم فوري بنسبة 10% على عقد تأمين السيارات الخاص بكم، من صيغة الغير إلى كل المخاطر.',
    },
    condition: {
      fr: 'Sur simple présentation de votre carte bancaire en agence.',
      en: 'Simply present your bank card at the agency.',
      ar: 'بمجرد تقديم بطاقتكم البنكية في الوكالة.',
    },
  },
  {
    id: 'attijariwafa',
    icon: CreditCard,
    percent: '−10%',
    partner: 'Attijariwafa Bank',
    title: {
      fr: 'Offre clients Attijariwafa',
      en: 'Attijariwafa client offer',
      ar: 'عرض عملاء Attijariwafa',
    },
    description: {
      fr: '10% de remise pour les clients Attijariwafa Bank sur toute nouvelle souscription Automobile.',
      en: 'A 10% discount for Attijariwafa Bank clients on any new motor subscription.',
      ar: 'خصم بنسبة 10% لعملاء Attijariwafa Bank على أي اشتراك جديد في تأمين السيارات.',
    },
    condition: {
      fr: 'Valable sur les contrats souscrits en agence.',
      en: 'Valid on policies subscribed at the agency.',
      ar: 'سارٍ على العقود المشتراة في الوكالة.',
    },
  },
  {
    id: 'banque-populaire',
    icon: Landmark,
    percent: '−8%',
    partner: 'Banque Populaire',
    title: {
      fr: 'Partenariat Banque Populaire',
      en: 'Banque Populaire partnership',
      ar: 'شراكة Banque Populaire',
    },
    description: {
      fr: '8% de remise pour les clients de la Banque Populaire, sur les formules Confort et Tous Risques.',
      en: 'An 8% discount for Banque Populaire clients on Comfort and Comprehensive plans.',
      ar: 'خصم بنسبة 8% لعملاء Banque Populaire، على صيغتي المرتاحة وكل المخاطر.',
    },
    condition: {
      fr: 'Cumulable avec la remise paiement comptant.',
      en: 'Can be combined with the pay-upfront discount.',
      ar: 'قابل للجمع مع خصم الدفع نقداً.',
    },
  },
  {
    id: 'cih-bank',
    icon: PiggyBank,
    percent: '−7%',
    partner: 'CIH Bank',
    title: {
      fr: 'Offre clients CIH',
      en: 'CIH client offer',
      ar: 'عرض عملاء CIH',
    },
    description: {
      fr: '7% de remise pour les clients CIH Bank, sur toutes les formules du contrat Automobile.',
      en: 'A 7% discount for CIH Bank clients, on every motor insurance plan.',
      ar: 'خصم بنسبة 7% لعملاء CIH Bank، على جميع صيغ عقد تأمين السيارات.',
    },
    condition: {
      fr: 'Réservée aux particuliers.',
      en: 'For individual clients.',
      ar: 'مخصص للأفراد.',
    },
  },
  {
    id: 'paiement-comptant',
    icon: Wallet,
    percent: '−5%',
    partner: 'Paiement annuel',
    title: {
      fr: 'Remise paiement comptant',
      en: 'Pay-upfront discount',
      ar: 'خصم الدفع نقداً',
    },
    description: {
      fr: 'Payez votre prime annuelle en une seule fois et bénéficiez de 5% de remise supplémentaire.',
      en: 'Pay your annual premium in one single payment and get an extra 5% discount.',
      ar: 'ادفعوا قسطكم السنوي دفعة واحدة واستفيدوا من خصم إضافي بنسبة 5%.',
    },
    condition: {
      fr: 'Pour toute formule, par carte ou virement.',
      en: 'For any plan, by card or bank transfer.',
      ar: 'لكل الصيغ، بالبطاقة البنكية أو بالتحويل.',
    },
  },
  {
    id: 'bonus-fidelite',
    icon: Medal,
    percent: '−12%',
    partner: 'Bonus 50+',
    title: {
      fr: 'Bonus fidélité conducteur',
      en: 'Driver loyalty bonus',
      ar: 'خصم الوفاء للسائق',
    },
    description: {
      fr: 'Vous êtes assuré depuis plus de 3 ans sans sinistre responsable ? Profitez de 12% de remise fidélité.',
      en: 'Insured for over 3 years with no at-fault claim? Enjoy a 12% loyalty discount.',
      ar: 'مؤمَّنون لدىنا منذ أكثر من 3 سنوات دون حادث مسؤول؟ استفيدوا من خصم وفاء بنسبة 12%.',
    },
    condition: {
      fr: 'Selon votre relevé d’informations.',
      en: 'According to your claims statement.',
      ar: 'حسب بيان المعلومات الخاص بكم.',
    },
  },
  {
    id: 'flotte',
    icon: CarFront,
    percent: '−15%',
    partner: 'Flottes',
    title: {
      fr: 'Remise flotte multi-véhicules',
      en: 'Multi-vehicle fleet discount',
      ar: 'خصم الأساطيل متعددة المركبات',
    },
    description: {
      fr: 'Assurez 3 véhicules ou plus (famille ou entreprise) et obtenez jusqu’à 15% de remise sur la flotte.',
      en: 'Insure 3 vehicles or more (family or company) and get up to 15% off the fleet.',
      ar: 'أمينوا 3 مركبات أو أكثر (عائلة أو شركة) واحصلوا على خصم يصل إلى 15% على الأسطول.',
    },
    condition: {
      fr: 'À partir de 3 véhicules assurés ensemble.',
      en: 'From 3 vehicles insured together.',
      ar: 'انطلاقاً من 3 مركبات مؤمَّنة معاً.',
    },
  },
  {
    id: 'pack-combine',
    icon: Home,
    percent: '−8%',
    partner: 'Pack combiné',
    title: {
      fr: 'Pack Habitation + Auto',
      en: 'Home + Motor pack',
      ar: 'باقة المسكن + السيارات',
    },
    description: {
      fr: 'Regroupez votre assurance Habitation et votre contrat Auto chez Amekran et économisez 8% sur les deux.',
      en: 'Bring your home and motor insurance together at Amekran and save 8% on both.',
      ar: 'اجمعوا تأمين المسكن وعقد تأمين السيارات لدى AMEKRAN ووفّروا 8% على كليهما.',
    },
    condition: {
      fr: 'Souscription simultanée des deux contrats.',
      en: 'Both policies subscribed at the same time.',
      ar: 'الاشتراك المتزامن في العقدَين.',
    },
  },
];

interface WhyCard {
  id: string;
  icon: typeof CarFront;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

const WHY_AUTOMOBILE: WhyCard[] = [
  {
    id: 'couverture-elargie',
    icon: CarFront,
    title: { fr: 'Couverture élargie', en: 'Extended cover', ar: 'تغطية موسعة' },
    description: {
      fr: 'Une palette de garanties étendues vous permettant une couverture complète de votre véhicule.',
      en: 'A wide range of extended guarantees giving your vehicle complete protection.',
      ar: 'مجموعة واسعة من الضمانات الموسعة تتيح لكم تغطية كاملة لمركبتكم.',
    },
  },
  {
    id: 'assistance-24-7',
    icon: Headset,
    title: {
      fr: 'Service d’assistance disponible 24h/7j',
      en: 'Assistance service available 24/7',
      ar: 'خدمة المساعدة متوفرة 24س/7أيام',
    },
    description: {
      fr: 'Afin de répondre efficacement à vos besoins, notre service d’assistance est joignable 24h/7j.',
      en: 'To answer your needs efficiently, our assistance team is reachable 24/7.',
      ar: 'للإجابة بفعالية عن احتياجاتكم، يمكن الاتصال بخدمتنا للمساعدة 24س/7أيام.',
    },
  },
  {
    id: 'amekran-services',
    icon: BadgeCheck,
    title: { fr: 'Amekran Services', en: 'Amekran Services', ar: 'خدمات AMEKRAN' },
    description: {
      fr: 'Un centre de gestion de sinistres unique au Maroc qui garantit une gestion centralisée du sinistre via un point de contact unique, couvrant l’ensemble des démarches post-sinistre.',
      en: 'A claims management centre unique in Morocco, guaranteeing centralised handling through a single point of contact covering every post-claim step.',
      ar: 'مركز فريد في المغرب لإدارة الحوادث يضمن معالجة مركزية للحادث عبر نقطة اتصال واحدة، يشمل جميع إجراءات ما بعد الحادث.',
    },
  },
  {
    id: 'garages-agrees',
    icon: Warehouse,
    title: { fr: 'Garages agréés', en: 'Approved garages', ar: 'الورشات المعتمدة' },
    description: {
      fr: 'Un réseau de garages agréés à Tanger et partout au Maroc pour réparer votre véhicule en toute confiance.',
      en: 'A network of approved garages in Tangier and across Morocco to repair your vehicle with confidence.',
      ar: 'شبكة من الورشات المعتمدة في طنجة وفي جميع أنحاء المغرب لإصلاح مركبتكم بكل ثقة.',
    },
  },
  {
    id: 'auto-hifad-express',
    icon: Wrench,
    title: { fr: 'Auto Hifad Express', en: 'Auto Hifad Express', ar: 'أوتو حفاظ إكسبرس' },
    description: {
      fr: 'Une indemnisation rapide par chèque ou mise à disposition, après accord de l’expert désigné.',
      en: 'Fast compensation by cheque or courtesy vehicle, once the appointed expert has approved.',
      ar: 'تعويض سريع بشيك أو بوضع مركبة رهن إشارتكم، بعد موافقة الخبير المعين.',
    },
  },
];

interface FaqItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

const AUTOMOBILE_FAQS: FaqItem[] = [
  {
    id: 'obligatoire',
    question: {
      fr: 'Quelles sont les assurances automobiles obligatoires au Maroc ?',
      en: 'Which motor insurances are mandatory in Morocco?',
      ar: 'ما هي تأمينات السيارات الإلزامية في المغرب؟',
    },
    answer: {
      fr: 'La loi marocaine impose au minimum la garantie de Responsabilité Civile Automobile, qui couvre les dommages causés aux tiers en cas d’accident. Chez Amekran, nous vous recommandons de la compléter avec l’assistance, le bris de glace ou le vol selon l’usage de votre véhicule.',
      en: 'Moroccan law requires at minimum Compulsory Third-Party Liability, which covers damage caused to others in an accident. At Amekran, we recommend complementing it with assistance, glass breakage or theft cover depending on your vehicle’s use.',
      ar: 'يفرض القانون المغربي كحد أدنى ضمان المسؤولية المدنية للسيارات، الذي يغطي الأضرار التي تلحق بالغير في حالة حادث. في AMEKRAN، ننصحكم بإكماله بالمساعدة أو كسر الزجاج أو السرقة حسب استعمال مركبتكم.',
    },
  },
  {
    id: 'calcul-prime',
    question: {
      fr: 'Comment est calculée la prime d’assurance automobile ?',
      en: 'How is the motor insurance premium calculated?',
      ar: 'كيف يُحسب قسط تأمين السيارات؟',
    },
    answer: {
      fr: 'La prime dépend de plusieurs critères : la formule choisie (Tiers, Confort ou Tous Risques), la puissance fiscale du véhicule, son usage, votre profil de conducteur et votre historique de sinistres. Nos partenaires bancaires et le paiement comptant permettent de la réduire encore.',
      en: 'The premium depends on several criteria: the chosen plan (Third-party, Comfort or Comprehensive), the vehicle’s fiscal horsepower, its use, your driver profile and claims history. Our bank partners and upfront payment can reduce it further.',
      ar: 'يعتمد القسط على عدة معايير: الصيغة المختارة (للغير، المرتاحة أو كل المخاطر)، والقدرة الضريبية للمركبة، واستعمالها، وملفكم كسائق، وسجل حوادثكم. ويتيح شركاؤنا البنكيون والدفع نقداً تخفيضه أكثر.',
    },
  },
  {
    id: 'vol',
    question: {
      fr: 'L’assurance couvre-t-elle les dommages en cas de vol de mon véhicule ?',
      en: 'Does the insurance cover damage in case my vehicle is stolen?',
      ar: 'هل يغطي التأمين الأضرار في حالة سرقة مركبتي؟',
    },
    answer: {
      fr: 'Oui, à partir de la formule Confort, la garantie Vol couvre le vol du véhicule et les dommages causés lors de la tentative de vol. En formule Tous Risques, vous bénéficiez en plus de la prise en charge de tous dommages subis par votre voiture.',
      en: 'Yes, from the Comfort plan upwards, the Theft cover protects against vehicle theft and damage during an attempted theft. On the Comprehensive plan, all damage sustained by your car is also covered.',
      ar: 'نعم، انطلاقاً من صيغة المرتاحة، يغطي ضمان السرقة سرقة المركبة والأضرار الناتجة عن محاولة السرقة. وفي صيغة كل المخاطر، تستفيدون إضافةً من تغطية جميع الأضرار التي تلحق بسيارتكم.',
    },
  },
  {
    id: 'sinistre',
    question: {
      fr: 'Que faire en cas de sinistre ?',
      en: 'What should I do in case of a claim?',
      ar: 'ماذا أفعل في حالة حادث؟',
    },
    answer: {
      fr: 'Déclarez le sinistre dans les 5 jours ouvrés auprès de notre agence ou via le service Amekran Services. Un point de contact unique suit votre dossier de bout en bout, du constat amiable jusqu’à l’indemnisation.',
      en: 'Declare the claim within 5 working days through our agency or via Amekran Services. A single point of contact follows your file end to end, from the joint report to compensation.',
      ar: 'صرّحوا بالحادث في أجل 5 أيام عمل لدى وكالتنا أو عبر خدمة خدمات AMEKRAN. تتبع نقطة اتصال واحدة ملفكم من البداية إلى النهاية، من التقرير الودي إلى التعويض.',
    },
  },
  {
    id: 'permis-etranger',
    question: {
      fr: 'Puis-je assurer un véhicule avec un permis étranger ?',
      en: 'Can I insure a vehicle with a foreign driving licence?',
      ar: 'هل يمكنني تأمين مركبة برخصة أجنبية؟',
    },
    answer: {
      fr: 'Oui. Un permis étranger en cours de validité est accepté pour la souscription, avec une simple traduction officielle si nécessaire. Nos conseillers à Tanger vous accompagnent pour constituer le dossier complet.',
      en: 'Yes. A valid foreign licence is accepted for subscription, with a simple official translation if needed. Our advisors in Tangier will help you put together the full file.',
      ar: 'نعم. تُقبل الرخصة الأجنبية السارية للاشتراك، مع ترجمة رسمية بسيطة إذا لزم الأمر. يرافقكم مستشارونا في طنجة لتكوين الملف الكامل.',
    },
  },
];

interface TierCard {
  tier: CoverageTier;
  title: Record<Language, string>;
  tagline: Record<Language, string>;
  features: Record<Language, string[]>;
}

const AUTOMOBILE_TIERS: TierCard[] = [
  {
    tier: 'essentiel',
    title: { fr: 'Essentielle', en: 'Essential', ar: 'الأساسية' },
    tagline: {
      fr: 'Aux tiers — l’obligatoire, bien fait.',
      en: 'Third-party — the cover you must have.',
      ar: 'للغير — الإلزامي، مقدم بشكل متقن.',
    },
    features: {
      fr: ['Responsabilité civile', 'Assistance & remorquage 24h/24', 'Défense & recours'],
      en: ['Third-party liability', '24/7 assistance & towing', 'Defence & legal recourse'],
      ar: ['المسؤولية المدنية', 'المساعدة والسحب 24س/24', 'الدفاع والمرافعة'],
    },
  },
  {
    tier: 'confort',
    title: { fr: 'Confort', en: 'Comfort', ar: 'المرتاحة' },
    tagline: {
      fr: 'Aux tiers + vol, incendie & bris de glace.',
      en: 'Third-party + theft, fire & glass.',
      ar: 'للغير + السرقة والحريق وكسر الزجاج.',
    },
    features: {
      fr: ['Vol & incendie', 'Bris de glace', 'Assistance renforcée'],
      en: ['Theft & fire', 'Glass breakage', 'Enhanced assistance'],
      ar: ['السرقة والحريق', 'كسر الزجاج', 'مساعدة معززة'],
    },
  },
  {
    tier: 'integrale',
    title: { fr: 'Tous Risques', en: 'Comprehensive', ar: 'كل المخاطر' },
    tagline: {
      fr: 'La protection la plus complète.',
      en: 'The most complete protection.',
      ar: 'الحماية الأكثر اكتمالاً.',
    },
    features: {
      fr: ['Tous dommages & collision', 'Véhicule de remplacement', 'Sinistres priorisés à Tanger'],
      en: ['All damage & collision', 'Courtesy replacement vehicle', 'Priority claims in Tangier'],
      ar: ['جميع الأضرار والتصادم', 'مركبة بديلة', 'أولوية معالجة الحوادث في طنجة'],
    },
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AutomobileOffersPage({
  initialLang = 'fr',
}: {
  initialLang?: Language;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<Language>(initialLang);
  const [modal, setModal] = useState<ActiveModalType>(null);
  const [activeOffer, setActiveOffer] = useState<AutomobileOffer | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showAllOffers, setShowAllOffers] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  // Same splash curtain as the landing: the hero starts as it begins to lift
  // (so it blooms into the uncovered area) and the section welcomes + gold
  // rules follow once the curtain is mostly down. Reduced motion skips the
  // wait entirely.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroTimer = window.setTimeout(
      () => setHeroReady(true),
      reduced ? 0 : SPLASH_LIFT_MS
    );
    const sectionsTimer = window.setTimeout(
      () => setIntroReady(true),
      reduced ? 0 : SPLASH_SETTLE_MS
    );
    return () => {
      window.clearTimeout(heroTimer);
      window.clearTimeout(sectionsTimer);
    };
  }, []);

  const offersGridRef = useRef<HTMLDivElement>(null);
  const faqAnswerRef = useRef<HTMLDivElement>(null);
  const offersMountedRef = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Hero entrance, choreographed with the splash curtain: the photo settles
  // from a slight zoom while breadcrumb, title, copy and CTAs rise in.
  useGSAP(
    () => {
      if (!heroRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const items = gsap.utils.toArray<HTMLElement>(
        '[data-auto-hero]',
        heroRef.current
      );
      const media = heroRef.current.querySelector<HTMLElement>(
        '[data-auto-hero-media]'
      );

      // Stage everything out of view while the splash still covers the page.
      if (!heroReady) {
        gsap.set(items, { y: 26, autoAlpha: 0 });
        if (media) gsap.set(media, { scale: 1.06, autoAlpha: 0.5 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (media) {
        tl.fromTo(
          media,
          { scale: 1.06, autoAlpha: 0.5 },
          { scale: 1, autoAlpha: 1, duration: 1.5, ease: 'power2.out' },
          0
        );
      }

      tl.fromTo(
        items,
        { y: 26, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: 0.09,
          clearProps: 'transform',
        },
        0.08
      );
    },
    { scope: heroRef, dependencies: [heroReady] }
  );

  // Scroll reveal for the discount offer cards (staggered, replays on re-entry).
  useGSAP(
    () => {
      if (!offersGridRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const cards = offersGridRef.current.querySelectorAll(
        '[data-offer-card]'
      );
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: offersGridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reset',
          },
        }
      );
    },
    { scope: offersGridRef }
  );

  // Expanding "show more offers" cascades only the freshly revealed cards in.
  useGSAP(
    () => {
      if (!offersMountedRef.current) {
        offersMountedRef.current = true;
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!offersGridRef.current || !showAllOffers) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        '[data-offer-card]',
        offersGridRef.current
      );
      const fresh = cards.slice(4);
      if (!fresh.length) return;

      gsap.fromTo(
        fresh,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.07,
        }
      );
    },
    { dependencies: [showAllOffers], scope: offersGridRef }
  );

  // FAQ answers open with a smooth height + fade reveal.
  useGSAP(
    () => {
      if (!openFaq || !faqAnswerRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        faqAnswerRef.current,
        { height: 0, autoAlpha: 0, overflow: 'hidden' },
        {
          height: 'auto',
          autoAlpha: 1,
          duration: 0.32,
          ease: 'power2.out',
          clearProps: 'height,overflow',
        }
      );
    },
    { dependencies: [openFaq] }
  );

  // Close the offer detail dialog on Escape, like the shared modals.
  useEffect(() => {
    if (!activeOffer) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveOffer(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeOffer]);

  const openQuote = (id: SolutionId) => {
    if (id !== 'automobile') {
      router.push(solutionPath(id, lang));
      return;
    }
    setModal({ type: 'quote', solutionId: id });
  };

  const headingText = t3(
    lang,
    'Offres & réductions exclusives',
    'Exclusive offers & discounts',
    'عروض وتخفيضات حصرية',
  );
  const introText = t3(
    lang,
    'Chez Amekran Assurances, votre fidélité et vos partenariats sont récompensés. Présentez votre carte partenaire en agence et roulez avec une prime allégée.',
    'At Amekran Assurances, your loyalty and partnerships pay off. Present your partner card at the agency and drive with a lighter premium.',
    'في AMEKRAN للتأمين، يُكافأ وفاؤكم وشراكاتكم. قدّموا بطاقتكم الشريكة في الوكالة وانطلقوا بقسط أخف.',
  );

  return (
    <div id="top" className="min-h-dvh flex flex-col bg-white overflow-x-clip">
      {/* Header — same chrome as the landing page */}
      <header className="fixed inset-x-0 top-0 z-40 bg-white">
        <TopHeader
          lang={lang}
          onChangeLang={(next: Language) => {
            setLang(next);
            router.push(swapLocale(pathname, next));
          }}
          onOpenContact={() => setModal({ type: 'contact' })}
        />
        <Navbar
          lang={lang}
          activeNav={'particuliers' as NavSection}
          onSelectHome={() => router.push(`/${lang}`)}
          onSelectSolution={openQuote}
          onOpenAdvice={() => router.push(`/${lang}/conseils`)}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
          onOpenClientPortal={() => setModal({ type: 'client' })}
        />
      </header>

      {/* Reserves the header footprint */}
      <div aria-hidden="true" className="shrink-0 h-[114px] sm:h-[120px] lg:h-[124px]" />

      <main className="flex-1 flex flex-col">
        {/* ---------------- Hero (rounded navy banner) ---------------- */}
        <section className="bg-white px-3 sm:px-6 lg:px-8 pt-5 lg:pt-7">
          <div className="max-w-[1380px] mx-auto">
            <div
              ref={heroRef}
              className={`relative overflow-hidden rounded-[24px] shadow-card-featured ${
                /* Arabic: flat navy so the photo's veil lands seamlessly. */
                lang === 'ar' ? 'bg-[#061430]' : 'bg-navy-header'
              }`}
            >
              {/* Photo. LTR: full-bleed, faded into the banner on the copy side.
                  RTL: anchored on the physical left (and snapped to full width
                  on small screens) so the vehicles stay opposite the copy. */}
              <div
                className={
                  lang === 'ar'
                    ? 'absolute inset-y-0 left-0 w-full sm:w-[62%] lg:w-[56%]'
                    : 'absolute inset-0'
                }
              >
                <Image
                  src={heroAuto as StaticImageData}
                  alt={t3(
                    lang,
                    'Véhicules assurés Amekran à Tanger',
                    'Vehicles insured by Amekran in Tangier',
                    'مركبات مؤمَّنة لدى AMEKRAN في طنجة',
                  )}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1380px"
                  referrerPolicy="no-referrer"
                  data-auto-hero-media
                  className="object-cover object-[72%_50%]"
                />

                {lang === 'ar' ? (
                  <>
                    {/* Long, smooth navy fade into the copy side (right) */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,25,59,0)_0%,rgba(8,25,59,0.18)_34%,rgba(8,25,59,0.56)_56%,rgba(7,23,54,0.88)_78%,#061430_100%)]"
                    />
                    {/* Soft bottom vignette for depth */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#04102A]/70 via-[#04102A]/10 to-transparent"
                    />
                    {/* Faint gold bloom in the top-right corner */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(90%_130%_at_100%_0%,rgba(217,158,38,0.16),rgba(217,158,38,0)_58%)]"
                    />
                    {/* Extra scrim on narrow screens, where the copy spans the
                        whole banner and needs a stronger backdrop */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[#061430]/45 lg:bg-transparent"
                    />
                  </>
                ) : (
                  <>
                    {/* Long, smooth navy veil so the copy never sits on a seam */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(90deg,#061430_0%,#061430_34%,rgba(7,23,54,0.94)_44%,rgba(8,25,59,0.72)_57%,rgba(8,25,59,0.34)_72%,rgba(8,25,59,0.08)_86%,rgba(8,25,59,0)_100%)]"
                    />
                    {/* Soft bottom vignette for depth */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#04102A]/70 via-[#04102A]/10 to-transparent"
                    />
                    {/* Faint gold bloom in the top-left corner */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[radial-gradient(90%_130%_at_0%_0%,rgba(217,158,38,0.16),rgba(217,158,38,0)_58%)]"
                    />
                    {/* Extra scrim on narrow screens, where the copy spans the
                        whole banner and needs a stronger backdrop */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[#061430]/45 lg:bg-transparent"
                    />
                  </>
                )}
              </div>

              {/* Arabic only: soft navy depth on the copy side, fading to
                  nothing so the photo edge stays invisible */}
              {lang === 'ar' && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-[52%] bg-[radial-gradient(115%_150%_at_100%_0%,#0E2B5E_0%,rgba(11,33,74,0.55)_46%,rgba(6,20,48,0)_78%)]"
                />
              )}

              <div
                className={`relative flex flex-col justify-center min-h-[250px] lg:min-h-[280px] max-w-2xl px-6 sm:px-10 lg:px-14 py-8 lg:py-10 ${
                  /* Arabic mirrors the layout: copy on the physical right. */
                  lang === 'ar' ? 'me-auto text-right' : ''
                }`}
              >
                {/* Breadcrumb */}
                <nav
                  data-auto-hero
                  aria-label={t3(lang, 'Fil d’Ariane', 'Breadcrumb', 'مسار التنقل')}
                  className="flex items-center gap-1.5 text-sm"
                >
                  <button
                    type="button"
                    onClick={() => router.push(`/${lang}`)}
                    className="font-semibold text-white/85 hover:text-[#F5CC65] transition-colors cursor-pointer"
                  >
                    {t3(lang, 'Accueil', 'Home', 'الرئيسية')}
                  </button>
                  <ChevronRight className="w-4 h-4 shrink-0 text-[#F5CC65] rtl:rotate-180" />
                  <span className="font-semibold text-white">
                    {t3(lang, 'Automobile', 'Motor', 'السيارات')}
                  </span>
                </nav>

                <h1
                  data-auto-hero
                  className="mt-5 text-4xl sm:text-[44px] font-extrabold leading-tight text-white"
                >
                  {t3(lang, 'Automobile', 'Motor Insurance', 'تأمين السيارات')}
                </h1>
                <p
                  data-auto-hero
                  className="mt-2 text-base sm:text-lg text-white/85"
                >
                  {t3(
                    lang,
                    'Roulez l’esprit tranquille avec l’assurance automobile d’Amekran.',
                    'Drive worry-free with Amekran motor insurance.',
                    'انطلقوا ببال راحة مع تأمين السيارات من AMEKRAN.',
                  )}
                </p>

                <div
                  data-auto-hero
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  <button
                    type="button"
                    data-magnetic
                    onClick={() => openQuote('automobile')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-sm font-bold shadow-[0_6px_18px_rgba(217,158,38,0.45)] transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    {t3(lang, 'Demander un devis', 'Request a quote', 'اطلب عرض سعر')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setModal({ type: 'contact' })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors cursor-pointer"
                  >
                    {t3(lang, 'Nous contacter', 'Contact us', 'اتصل بنا')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Discount offers ---------------- */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section heading — shared gold-rule title design */}
            <SectionHeading lang={lang} title={headingText} subtitle={introText} />

            <div
              ref={offersGridRef}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
            >
              {AUTOMOBILE_OFFERS.slice(0, showAllOffers ? undefined : 4).map((offer) => {
                const Icon = offer.icon;
                return (
                  <button
                    key={offer.id}
                    type="button"
                    data-offer-card
                    onClick={() => setActiveOffer(offer)}
                    aria-haspopup="dialog"
                    className="group flex h-full w-full flex-col items-start rounded-[18px] bg-slate-100 p-5 lg:p-6 text-start transition-all hover:-translate-y-1 hover:shadow-card-soft cursor-pointer"
                  >
                    <div className="flex w-full items-start justify-between gap-3">
                      <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#E7B94B]/50 shadow-sm">
                        <Icon className="w-7 h-7 text-[#0B1E40]" />
                      </span>
                      <span className="px-3 py-1.5 rounded-full bg-gold-pill text-sm font-extrabold text-[#0B1E40] shadow-[0_3px_10px_rgba(217,158,38,0.35)]">
                        {offer.percent}
                      </span>
                    </div>

                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#B57D14]">
                      {offer.partner}
                    </p>
                    <h3 className="mt-1 line-clamp-2 text-base font-extrabold text-[#0B1E40]">
                      {offer.title[lang]}
                    </h3>
                    <p className="mt-2 line-clamp-4 text-[13px] leading-relaxed text-slate-600">
                      {offer.description[lang]}
                    </p>

                    <div className="mt-auto pt-4" aria-hidden="true">
                      <ArrowRight className="h-6 w-6 text-[#0B1E40] transition-transform duration-200 group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllOffers((prev) => !prev)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-[10px] bg-[#0B1E40] hover:bg-[#12295c] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                {showAllOffers
                  ? t3(lang, 'Afficher moins d’offres', 'Show fewer offers', 'اعرض عروضاً أقل')
                  : t3(
                      lang,
                      `Afficher plus d’offres (${AUTOMOBILE_OFFERS.length - 4})`,
                      `Show more offers (${AUTOMOBILE_OFFERS.length - 4})`,
                      `اعرض المزيد من العروض (${AUTOMOBILE_OFFERS.length - 4})`,
                    )}
              </button>
            </div>
          </div>
        </section>

        {/* ---------------- Offer detail dialog ---------------- */}
        <AnimatePresence>
          {activeOffer && (
            <motion.div
              key="offer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="fixed inset-0 z-[60] bg-[#061430]/60 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-5"
              onClick={() => setActiveOffer(null)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col"
              >
                {/* Navy header */}
                <div className="relative bg-navy-header px-6 py-5 flex items-center gap-4">
                  <span className="inline-flex items-center justify-center w-14 h-14 shrink-0 rounded-full bg-white border border-[#E7B94B]/50">
                    <activeOffer.icon className="w-7 h-7 text-[#0B1E40]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5CC65]">
                      {activeOffer.partner}
                    </p>
                    <h3 className="mt-0.5 text-lg font-extrabold text-white leading-snug">
                      {activeOffer.title[lang]}
                    </h3>
                  </div>
                  <span className="ms-auto me-10 px-3 py-1.5 rounded-full bg-gold-pill text-sm font-extrabold text-[#0B1E40] shadow">
                    {activeOffer.percent}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveOffer(null)}
                    aria-label={t3(lang, 'Fermer', 'Close', 'إغلاق')}
                    className="absolute top-3.5 right-3.5 inline-flex items-center justify-center w-8 h-8 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Detail body */}
                <div className="px-6 py-5 overflow-y-auto">
                  <p className="text-[14px] leading-relaxed text-slate-700">
                    {activeOffer.description[lang]}
                  </p>
                  <p className="mt-3 text-[12.5px] text-slate-500 italic">
                    {activeOffer.condition[lang]}
                  </p>

                  <div className="mt-5 rounded-xl bg-[#FDF1D4]/60 border border-[#E7B94B]/40 px-4 py-3 flex items-start gap-2.5">
                    <BadgeCheck className="w-4.5 h-4.5 mt-0.5 shrink-0 text-[#D99E26]" />
                    <p className="text-[12.5px] leading-relaxed text-[#0B1E40]">
                      {t3(
                        lang,
                        'Les remises partenaires, fidélité et paiement comptant sont cumulables dans la limite de 20% de la prime annuelle.',
                        'Partner, loyalty and upfront-payment discounts can be combined, up to 20% of the annual premium.',
                        'التخفيضات الشريكة والوفاء والدفع نقداً قابلة للجمع في حدود 20% من قسط سنوي.',
                      )}
                    </p>
                  </div>
                </div>

                {/* CTA footer */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveOffer(null);
                      openQuote('automobile');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-[13px] font-bold shadow-[0_3px_10px_rgba(217,158,38,0.4)] transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    {t3(lang, 'Demander un devis', 'Request a quote', 'اطلب عرض سعر')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveOffer(null)}
                    className="inline-flex items-center px-5 py-2.5 rounded-full border border-slate-200 text-[13px] font-bold text-[#0B1E40] hover:bg-white transition-colors cursor-pointer"
                  >
                    {t3(lang, 'Fermer', 'Close', 'إغلاق')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- Coverage tiers ---------------- */}
        <section className="pb-16 lg:pb-20 bg-white">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              lang={lang}
              title={t3(lang, 'Nos formules Automobile', 'Our motor plans', 'صيغنا للسيارات')}
            />

            <div
              data-gsap-reveal
              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {AUTOMOBILE_TIERS.map((tier, i) => {
                const featured = i === 2;
                return (
                  <article
                    key={tier.tier}
                    data-gsap-item
                    className={`relative flex flex-col rounded-[18px] p-6 border transition-all hover:-translate-y-1 ${
                      featured
                        ? 'border-[1.5px] border-[#D99E26] bg-gradient-to-b from-[#FFFDF7] to-[#FDF1D4] shadow-card-featured'
                        : 'border-slate-200/85 bg-white shadow-card-soft hover:border-[#D99E26]/60'
                    }`}
                  >
                    {featured && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold-pill text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0B1E40] shadow">
                        {t3(lang, 'Recommandée', 'Recommended', 'موصى بها')}
                      </span>
                    )}
                    <h3 className="text-lg font-extrabold text-[#0B1E40]">
                      {tier.title[lang]}
                    </h3>
                    <p className="mt-1 text-[13px] text-slate-600">
                      {tier.tagline[lang]}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#FFF7E2] border border-[#D99E26]/35 text-xs font-bold text-[#B57D14]">
                        {t3(lang, 'Tarif sur mesure · Sur devis', 'Custom rate · On quote', 'تسعيرة مخصصة · حسب دراسة الملف')}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {tier.features[lang].map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-[13px] text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#D99E26]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => openQuote('automobile')}
                      className={`mt-6 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-full text-[13px] font-bold transition-all hover:-translate-y-0.5 cursor-pointer ${
                        featured
                          ? 'bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] shadow-[0_3px_10px_rgba(217,158,38,0.4)]'
                          : 'bg-[#0B1E40] hover:bg-[#12295c] text-white'
                      }`}
                    >
                      {t3(lang, 'Demander un devis', 'Request a quote', 'اطلب عرض سعر')}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- Why choose Amekran automobile ---------------- */}
        <section className="pb-16 lg:pb-20 bg-white">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              lang={lang}
              title={t3(
                lang,
                'Pourquoi choisir l’assurance Automobile Amekran ?',
                'Why choose Amekran motor insurance?',
                'لماذا تختار تأمين السيارات AMEKRAN؟',
              )}
              subtitle={t3(
                lang,
                'Découvrez comment les solutions Amekran répondent à tous vos besoins en assurance automobile.',
                'Discover how Amekran solutions cover all your motor insurance needs.',
                'اكتشفوا كيف تلبي حلول AMEKRAN جميع احتياجاتكم في تأمين السيارات.',
              )}
            />

            <div
              data-gsap-reveal
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            >
              {WHY_AUTOMOBILE.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.id}
                    data-gsap-item
                    className="flex flex-col rounded-[18px] bg-slate-100 p-5 lg:p-6 transition-all hover:-translate-y-1 hover:shadow-card-soft"
                  >
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#E7B94B]/50 shadow-sm">
                      <Icon className="w-7 h-7 text-[#0B1E40]" />
                    </span>
                    <h3 className="mt-4 text-[15px] font-extrabold text-[#0B1E40] leading-snug">
                      {item.title[lang]}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                      {item.description[lang]}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- FAQ accordion ---------------- */}
        <section className="pb-16 lg:pb-20 bg-slate-100">
          <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              lang={lang}
              title={t3(lang, 'Questions fréquentes', 'Frequently asked questions', 'الأسئلة الشائعة')}
              subtitle={t3(
                lang,
                'Questions fréquentes sur l’assurance automobile au Maroc',
                'Frequently asked questions about motor insurance in Morocco',
                'أسئلة شائعة حول تأمين السيارات في المغرب',
              )}
            />

            <div data-gsap-reveal className="mt-10 space-y-4">
              {AUTOMOBILE_FAQS.map((faq, i) => {
                const isOpen = openFaq === faq.id;
                // The first three are always visible; the rest appears
                // via the "Afficher toutes les questions" button.
                const hidden = !showAllFaqs && i >= 3;
                if (hidden) return null;
                return (
                  <div
                    key={faq.id}
                    data-gsap-item
                    className="rounded-2xl bg-white shadow-sm border border-slate-200/70 overflow-hidden transition-shadow hover:shadow-card-soft"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-start cursor-pointer"
                    >
                      <span className="text-[15px] sm:text-base font-extrabold text-[#0B1E40] leading-snug">
                        {faq.question[lang]}
                      </span>
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 shrink-0 rounded-full border border-[#0B1E40]/25 text-[#0B1E40] transition-transform duration-200 ${
                          isOpen ? 'rotate-45 bg-[#0B1E40] text-white border-[#0B1E40]' : ''
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                    {isOpen && (
                      <div ref={faqAnswerRef} className="px-5 sm:px-6 pb-5">
                        <p className="text-[13.5px] leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                          {faq.answer[lang]}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!showAllFaqs && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs(true)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-[10px] bg-[#0B1E40] hover:bg-[#12295c] text-white text-sm font-bold transition-colors cursor-pointer"
                >
                  {t3(
                    lang,
                    'Afficher toutes les questions fréquentes',
                    'Show all frequently asked questions',
                    'اعرض جميع الأسئلة الشائعة',
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Light second footer, revealed on scroll just above the fixed wave */}
      <SecondFooter
        lang={lang}
        onSelectSolution={openQuote}
        onOpenAdvice={() => router.push(`/${lang}/conseils`)}
        onOpenContact={() => router.push(`/${lang}/#contact-form`)}
      />

      {/* Same fixed wave footer as the landing page */}
      <TrustAndFooter lang={lang} />

      <ScrollEffects active={introReady} />
      <GsapInteractions active={introReady} />

      <InteractiveModals
        lang={lang}
        modal={modal}
        onClose={() => setModal(null)}
        onSwitchToQuote={(id) => setModal({ type: 'quote', solutionId: id })}
      />
    </div>
  );
}
