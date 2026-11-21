import type { CoverageTier, Language } from './insurance';

export type PropertyType = 'appartement' | 'villa' | 'riad';
export type OccupancyStatus = 'proprietaire' | 'locataire' | 'bailleur';

export interface HabitationSimulationInput {
  propertyType: PropertyType;
  occupancy: OccupancyStatus;
  surfaceSqm: number;
  tier: CoverageTier;
}

export interface HabitationSimulationResult {
  annualMad: number;
  monthlyMad: number;
  capitalCoveredMad: number;
  deductibleMad: number;
  clampedSurface: number;
}

export interface PropertyOption {
  id: PropertyType;
  label: Record<Language, string>;
  baseMad: number;
  capitalPerSqmMad: number;
}

export interface OccupancyOption {
  id: OccupancyStatus;
  label: Record<Language, string>;
  factor: number;
}

export const PROPERTY_TYPE_OPTIONS: PropertyOption[] = [
  {
    id: 'appartement',
    label: { fr: 'Appartement', en: 'Apartment', ar: 'شقة' },
    baseMad: 900,
    capitalPerSqmMad: 2500,
  },
  {
    id: 'villa',
    label: { fr: 'Villa / Maison', en: 'Villa / House', ar: 'فيلا / منزل' },
    baseMad: 1650,
    capitalPerSqmMad: 3400,
  },
  {
    id: 'riad',
    label: { fr: 'Riad / Résidence', en: 'Riad / Residence', ar: 'رياض / إقامة' },
    baseMad: 1450,
    capitalPerSqmMad: 3100,
  },
];

export const OCCUPANCY_OPTIONS: OccupancyOption[] = [
  {
    id: 'proprietaire',
    label: { fr: 'Propriétaire occupant', en: 'Homeowner', ar: 'مالك شاغل' },
    factor: 1.0,
  },
  {
    id: 'locataire',
    label: { fr: 'Locataire', en: 'Tenant', ar: 'مستأجر' },
    factor: 0.78,
  },
  {
    id: 'bailleur',
    label: { fr: 'Propriétaire bailleur', en: 'Landlord', ar: 'مالك مؤجر' },
    factor: 0.86,
  },
];

export function calculateHabitationEstimate(
  input: HabitationSimulationInput
): HabitationSimulationResult {
  const clampedSurface = Math.min(1200, Math.max(30, Math.round(input.surfaceSqm)));
  const prop =
    PROPERTY_TYPE_OPTIONS.find((p) => p.id === input.propertyType) ??
    PROPERTY_TYPE_OPTIONS[0];
  const occ =
    OCCUPANCY_OPTIONS.find((o) => o.id === input.occupancy) ??
    OCCUPANCY_OPTIONS[0];

  const tierMultiplier =
    input.tier === 'essentiel' ? 1 : input.tier === 'confort' ? 1.32 : 1.72;
  const extraSqm = Math.max(0, clampedSurface - 60);
  const rawAnnual =
    (prop.baseMad + extraSqm * 6.5) * occ.factor * tierMultiplier;
  const annualMad = Math.max(650, Math.round(rawAnnual / 50) * 50);
  const monthlyMad = Math.round(annualMad / 12);

  const tierCapitalBoost =
    input.tier === 'essentiel' ? 1 : input.tier === 'confort' ? 1.4 : 1.9;
  const capitalCoveredMad =
    Math.round((clampedSurface * prop.capitalPerSqmMad * tierCapitalBoost) / 10000) *
    10000;

  const deductibleMad =
    input.tier === 'essentiel' ? 1000 : input.tier === 'confort' ? 500 : 0;

  return {
    annualMad,
    monthlyMad,
    capitalCoveredMad,
    deductibleMad,
    clampedSurface,
  };
}

export interface HabitationGuarantee {
  num: string;
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export const HABITATION_GUARANTEES: HabitationGuarantee[] = [
  {
    num: '01.',
    id: 'incendie',
    title: {
      fr: 'Incendie, Explosion & Foudre',
      en: 'Fire, Explosion & Lightning',
      ar: 'الحريق، الانفجار والصواعق',
    },
    description: {
      fr: 'Prise en charge des dommages causés au bâti et à votre mobilier ainsi que des frais de relogement temporaire et de déblais.',
      en: 'Covers structural building damage, furniture losses, debris removal, and temporary accommodation costs.',
      ar: 'تغطية الأضرار اللاحقة بالبناء والأثاث ومصاريف إعادة الإيواء المؤقت ورفع الأنقاض.',
    },
  },
  {
    num: '02.',
    id: 'degats-eaux',
    title: {
      fr: 'Dégâts des Eaux & Infiltrations',
      en: 'Water Damage & Leaks',
      ar: 'أضرار المياه والتسربات',
    },
    description: {
      fr: 'Indemnisation suite à une rupture de canalisation, fuite encastrée ou débordement, incluant les frais de recherche de fuite et dommages aux voisins.',
      en: 'Covers burst pipes, concealed plumbing leaks, leak-detection fees, and accidental water damage to neighboring units.',
      ar: 'تعويض إثر كسر الأنابيب، التسربات المضمنة أو الفيضان، شاملاً تكاليف تحديد موقع التسرب والأضرار للجيران.',
    },
  },
  {
    num: '03.',
    id: 'vol-glace',
    title: {
      fr: 'Vol, Effraction & Bris de Glace',
      en: 'Burglary & Glass Breakage',
      ar: 'السرقة، الكسر وكسر الزجاج',
    },
    description: {
      fr: 'Protection de vos biens mobiliers, appareils high-tech et objets précieux en cas d’effraction, plus remplacement des baies vitrées et miroirs.',
      en: 'Protects furniture, electronics, and valuables against forced entry, plus replacement of windows, glass doors, and mirrors.',
      ar: 'حماية الممتلكات المنقولة والأجهزة الإلكترونية والأشياء الثمينة في حال الكسر، واستبدال النوافذ الزجاجية والمرايا.',
    },
  },
  {
    num: '04.',
    id: 'rc-famille',
    title: {
      fr: 'Responsabilité Civile Chef de Famille',
      en: 'Family Personal Liability',
      ar: 'المسؤولية المدنية لرب الأسرة',
    },
    description: {
      fr: 'Défense et indemnisation pour les dommages involontaires causés à des tiers par vous, vos enfants, vos animaux ou votre personnel de maison.',
      en: 'Covers accidental bodily injury or property damage caused to third parties by you, your family, pets, or domestic staff.',
      ar: 'الدفاع والتعويض عن الأضرار غير العمدية الملحقة بالغير من طرفكم أو أطفالكم أو عمال المنزل.',
    },
  },
  {
    num: '05.',
    id: 'evcat',
    title: {
      fr: 'Catastrophes Naturelles (Régime EVCAT)',
      en: 'Natural Disasters (EVCAT Cover)',
      ar: 'الكوارث الطبيعية (نظام EVCAT)',
    },
    description: {
      fr: 'Couverture intégrée conformément à la législation marocaine en cas d’inondation exceptionnelle, tempête ou événement sismique.',
      en: 'Statutory Moroccan protection integrated against severe floods, storms, and seismic events.',
      ar: 'تغطية مدمجة وفقاً للتشريع المغربي في حال الفيضانات الاستثنائية، العواصف أو الزلازل.',
    },
  },
  {
    num: '06.',
    id: 'assistance',
    title: {
      fr: 'Assistance Dépannage à Domicile 24h/7j',
      en: '24/7 Emergency Home Assistance',
      ar: 'المساعدة والإصلاح المنزلي 24/7',
    },
    description: {
      fr: 'Envoi d’un plombier, serrurier, électricien ou vitrier agréé à Tanger et partout au Maroc en cas d’incident domestique urgent.',
      en: 'Dispatch of vetted plumbers, locksmiths, electricians, or glaziers across Tangier and Morocco for urgent home incidents.',
      ar: 'إيفاد سباك، قفال، كهربائي أو زجاجي معتمد في طنجة وكافة أنحاء المغرب في الحالات الطارئة.',
    },
  },
];

export interface HabitationFormulaFeature {
  label: Record<Language, string>;
  essentiel: boolean | Record<Language, string>;
  confort: boolean | Record<Language, string>;
  integrale: boolean | Record<Language, string>;
}

export const HABITATION_COMPARISON_ROWS: HabitationFormulaFeature[] = [
  {
    label: {
      fr: 'Incendie, explosion & événements climatiques',
      en: 'Fire, explosion & storm events',
      ar: 'الحريق، الانفجار والظواهر المناخية',
    },
    essentiel: true,
    confort: true,
    integrale: true,
  },
  {
    label: {
      fr: 'Dégâts des eaux & recherche de fuite',
      en: 'Water damage & leak detection',
      ar: 'أضرار المياه والبحث عن التسربات',
    },
    essentiel: true,
    confort: true,
    integrale: true,
  },
  {
    label: {
      fr: 'Responsabilité Civile Chef de Famille / Locative',
      en: 'Family & Tenant Personal Liability',
      ar: 'المسؤولية المدنية لرب الأسرة / الإيجارية',
    },
    essentiel: true,
    confort: true,
    integrale: true,
  },
  {
    label: {
      fr: 'Vol avec effraction & vandalisme',
      en: 'Burglary & vandalism protection',
      ar: 'السرقة بالكسر والتخريب',
    },
    essentiel: false,
    confort: true,
    integrale: true,
  },
  {
    label: {
      fr: 'Bris de glace, baies vitrées & panneaux solaires',
      en: 'Glass breakage & solar panels',
      ar: 'كسر الزجاج، الواجهات الزجاجية والألواح الشمسية',
    },
    essentiel: false,
    confort: true,
    integrale: true,
  },
  {
    label: {
      fr: 'Dommages électriques & électroménager',
      en: 'Electrical surge & appliances',
      ar: 'الأضرار الكهربائية والأجهزة المنزلية',
    },
    essentiel: false,
    confort: { fr: 'Jusqu’à 30 000 MAD', en: 'Up to 30,000 MAD', ar: 'حتى 30,000 درهم' },
    integrale: { fr: 'Valeur à neuf', en: 'New-for-old value', ar: 'القيمة كجديد' },
  },
  {
    label: {
      fr: 'Assistance dépannage 24h/7j (serrurerie, plomberie)',
      en: '24/7 emergency home repair',
      ar: 'المساعدة المنزلية 24/7 (أقفال، سباكة)',
    },
    essentiel: { fr: 'Urgence de base', en: 'Basic emergency', ar: 'طوارئ أساسية' },
    confort: true,
    integrale: true,
  },
  {
    label: {
      fr: 'Franchise en cas de sinistre',
      en: 'Claim deductible',
      ar: 'مبلغ التحمل عند الحادث',
    },
    essentiel: { fr: '1 000 MAD', en: '1,000 MAD', ar: '1,000 درهم' },
    confort: { fr: '500 MAD', en: '500 MAD', ar: '500 درهم' },
    integrale: { fr: '0 MAD (Sans franchise)', en: '0 MAD (Zero deductible)', ar: '0 درهم (بدون تحمل)' },
  },
];

export interface HabitationClaimStep {
  num: string;
  title: Record<Language, string>;
  detail: Record<Language, string>;
}

export const HABITATION_CLAIMS_STEPS: HabitationClaimStep[] = [
  {
    num: '01.',
    title: {
      fr: 'Déclaration directe en agence ou par téléphone',
      en: 'Direct reporting at our agency or by phone',
      ar: 'تصريح مباشر بالوكالة أو بالهاتف',
    },
    detail: {
      fr: 'Contactez votre conseiller dédié à Tanger au 0661 50 89 25 ou par WhatsApp dès le constat du sinistre.',
      en: 'Reach your dedicated Tangier advisor at 0661 50 89 25 or via WhatsApp as soon as an incident occurs.',
      ar: 'تواصل مع مستشارك المخصص بطنجة على الرقم 0661 50 89 25 أو عبر واتساب فور معاينة الحادث.',
    },
  },
  {
    num: '02.',
    title: {
      fr: 'Intervention d’urgence à domicile sous 2 heures',
      en: 'Emergency home dispatch within 2 hours',
      ar: 'تدخل عاجل بالمنزل خلال ساعتين',
    },
    detail: {
      fr: 'Pour une fuite d’eau, une porte forcée ou une panne électrique critique, notre réseau d’artisans sécurise votre logement.',
      en: 'For a burst pipe, forced lock, or critical power fault, our vetted technicians secure your home rapidly.',
      ar: 'لتسرب المياه، باب مكسور أو عطل كهربائي حرج، تؤمن شبكة الحرفيين المعتمدة مسكنكم بسرعة.',
    },
  },
  {
    num: '03.',
    title: {
      fr: 'Expertise accélérée & indemnisation transparente',
      en: 'Fast assessment & transparent settlement',
      ar: 'معاينة سريعة وتعويض بكل شفافية',
    },
    detail: {
      fr: 'Nous suivons le chiffrage et l’indemnisation de bout en bout pour vous éviter toute démarche administrative lourde.',
      en: 'We manage loss adjustment and payout end-to-end so you avoid lengthy administrative delays.',
      ar: 'نتابع تقييم الأضرار وصرف التعويض حتى النهاية لتجنيبكم أي تعقيدات إدارية.',
    },
  },
];

export interface HabitationFaqItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export const HABITATION_FAQS: HabitationFaqItem[] = [
  {
    id: 'credit-immo',
    question: {
      fr: 'L’assurance habitation est-elle valable pour un crédit immobilier au Maroc ?',
      en: 'Is this home policy accepted for a mortgage loan in Morocco?',
      ar: 'هل تأمين السكن صالح لطلب قرض عقاري بالمغرب؟',
    },
    answer: {
      fr: 'Oui. Nous délivrons immédiatement l’attestation Multirisque Habitation avec délégation de créance exigée par les banques marocaines lors du déblocage de votre prêt.',
      en: 'Yes. We immediately issue the bank-compliant Multi-Risk Home certificate with lender endorsement required by Moroccan banks.',
      ar: 'نعم. نصدر فورياً شهادة التأمين الشامل للمسكن مع التنازل عن الديون المشروطة من الأبناك المغربية عند تمويل القرض.',
    },
  },
  {
    id: 'locataire-vs-proprietaire',
    question: {
      fr: 'Quelle est la différence entre la formule Locataire et Propriétaire ?',
      en: 'What is the difference between Tenant and Homeowner coverage?',
      ar: 'ما الفرق بين صيغة المستأجر وصيغة المالك؟',
    },
    answer: {
      fr: 'La formule Locataire couvre votre responsabilité civile vis-à-vis du propriétaire (risques locatifs) et vos biens personnels. La formule Propriétaire couvre en plus les murs, la structure du logement et les équipements fixes.',
      en: 'Tenant coverage protects your legal liability toward the landlord plus your personal belongings. Homeowner coverage adds full protection for the building structure and fixed installations.',
      ar: 'تغطي صيغة المستأجر المسؤولية المدنية تجاه المالك (المخاطر الكرائية) والممتلكات الشخصية، بينما تشمل صيغة المالك إضافة إلى ذلك الجدران وهيكل البناء والتجهيزات الثابتة.',
    },
  },
  {
    id: 'villa-tanger',
    question: {
      fr: 'Les villas et résidences secondaires de Tanger (Malabata, Cap Spartel, Achakar) sont-elles couvertes ?',
      en: 'Are villas and second homes in Tangier coastal areas covered?',
      ar: 'هل الفيلات والمنازل الثانوية بطنجة (مالاباطا، كاب سبارتيل، أشقار) مشمولة بالتغطية؟',
    },
    answer: {
      fr: 'Oui, nos contrats s’adaptent aux résidences principales comme secondaires à Tanger et dans toute la région du Nord, incluant jardins, piscines, portails motorisés et installations solaires.',
      en: 'Yes, our policies tailor to both primary and secondary homes across Tangier and the Northern region, including gardens, pools, automated gates, and solar panels.',
      ar: 'نعم، عقودنا متلائمة مع الإقامات الرئيسية والثانوية بطنجة والشمال، شاملة الحدائق، المسابح، البوابات الأوتوماتيكية والألواح الشمسية.',
    },
  },
  {
    id: 'urgence-plomberie',
    question: {
      fr: 'Comment fonctionne l’assistance serrurerie ou plomberie 24h/7j ?',
      en: 'How does the 24/7 locksmith and plumbing assistance work?',
      ar: 'كيف تعمل خدمة المساعدة المنزلية للأقفال والسباكة 24/7؟'
    },
    answer: {
      fr: 'En cas de clé perdue, porte bloquée ou fuite importante, un seul appel déclenche l’envoi d’un artisan agréé avec prise en charge directe du déplacement et de la première tranche de main-d’œuvre selon votre contrat.',
      en: 'In case of lost keys, jammed locks, or major leaks, one phone call dispatches an approved technician with call-out and initial labor covered under your policy.',
      ar: 'في حال ضياع المفاتيح، انغلاق الباب أو تسرب كبير، مكالمة واحدة كفيلة بإيفاد حرفي معتمد مع التكفل المباشر بالتنقل واليد العاملة الأولية حسب العقد.',
    },
  },
  {
    id: 'delai-attestation',
    question: {
      fr: 'En combien de temps puis-je recevoir mon contrat et mon attestation ?',
      en: 'How quickly can I receive my policy contract and certificate?',
      ar: 'خلال كم من الوقت يمكنني التوصل بالعقد والشهادة؟',
    },
    answer: {
      fr: 'Votre attestation d’assurance habitation est émise le jour même après validation du devis en agence à Tanger ou à distance avec votre conseiller Amekran Assurances.',
      en: 'Your home insurance certificate is issued the same day after quote confirmation at our Tangier agency or remotely with your advisor.',
      ar: 'يتم إصدار شهادة تأمين السكن في نفس اليوم بعد تأكيد العرض بالوكالة بطنجة أو عن بعد مع مستشاركم AMEKRAN.',
    },
  },
];
