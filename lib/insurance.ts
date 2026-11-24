export type Language = 'fr' | 'en' | 'ar';

export const LOCALES: Language[] = ['fr', 'ar', 'en'];
export const DEFAULT_LOCALE: Language = 'fr';

export function isLocale(value: string): value is Language {
  return (LOCALES as string[]).includes(value);
}

export function localeDir(lang: Language): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/** Picks the right string for a language (helper for inline copy). */
export function t3(lang: Language, fr: string, en: string, ar: string): string {
  return lang === 'fr' ? fr : lang === 'en' ? en : ar;
}

/** Rewrites a pathname so it starts with the given locale. */
export function swapLocale(pathname: string, next: Language): string {
  const parts = pathname.split('/');
  if (parts.length > 1 && isLocale(parts[1])) {
    parts[1] = next;
  } else {
    parts.splice(1, 0, next);
  }
  const joined = parts.join('/');
  return joined === '' ? `/${next}` : joined;
}

export type SolutionId =
  | 'automobile'
  | 'accidents-travail'
  | 'sante-cnss'
  | 'habitation'
  | 'poids-lourds'
  | 'entreprises'
  | 'maritime';

/** Dedicated page for every solution — no solution is modal-only any more. */
export const SOLUTION_ROUTES: Record<SolutionId, string> = {
  automobile: '/assurance-automobile',
  habitation: '/assurance-habitation',
  'sante-cnss': '/assurance-sante',
  'poids-lourds': '/assurance-poids-lourds',
  entreprises: '/assurance-entreprises',
  'accidents-travail': '/assurance-accidents-travail',
  maritime: '/assurance-maritime',
};

/** Locale-prefixed path to a solution page, e.g. `/fr/assurance-maritime`. */
export function solutionPath(id: SolutionId, lang: Language): string {
  return `/${lang}${SOLUTION_ROUTES[id]}`;
}

export const ADVICE_PATH = '/conseils';

export function advicePath(lang: Language): string {
  return `/${lang}${ADVICE_PATH}`;
}

export type CoverageTier = 'essentiel' | 'confort' | 'integrale';

export interface InsuranceSolution {
  id: SolutionId;
  category: 'particuliers' | 'entreprises';
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  badge?: Record<Language, string>;
  offerBadge?: Record<Language, string>;
  featured?: boolean;
  baseAnnualMad: number;
  summary: Record<Language, string>;
  heroHeadline: Record<Language, string>;
  heroTagline: Record<Language, string>;
  highlights: Record<Language, string[]>;
}

export const INSURANCE_SOLUTIONS: InsuranceSolution[] = [
  // ─── Particuliers (Cards 1 to 3) ──────────────────────────────────
  {
    id: 'automobile',
    category: 'particuliers',
    title: {
      fr: 'Automobile',
      en: 'Automobile',
      ar: 'السيارات',
    },
    subtitle: {
      fr: 'Particuliers & Flottes',
      en: 'Personal & Fleets',
      ar: 'الأفراد والأساطيل',
    },
    offerBadge: {
      fr: 'Offre spéciale',
      en: 'Special Offer',
      ar: 'عرض خاص',
    },
    featured: true,
    baseAnnualMad: 2850,
    summary: {
      fr: 'Protection complète pour véhicules personnels et flottes d’entreprise à Tanger et partout au Maroc.',
      en: 'Comprehensive motor coverage for personal vehicles and company fleets across Tangier and Morocco.',
      ar: 'حماية شاملة للسيارات الخاصة وأساطيل الشركات في طنجة وفي جميع أنحاء المغرب.',
    },
    heroHeadline: {
      fr: 'Prenez la route en toute sérénité, en ville comme sur autoroute.',
      en: 'Drive with complete confidence, across city streets and highways.',
      ar: 'انطلق على الطريق بكل اطمئنان، في المدينة وعلى الطرق السيارة',
    },
    heroTagline: {
      fr: 'Assurance Automobile · Particuliers & Flottes à Tanger.',
      en: 'Motor Insurance · Personal & Fleets in Tangier.',
      ar: 'تأمين السيارات · الأفراد والأساطيل في طنجة',
    },
    highlights: {
      fr: [
        'Responsabilité civile, bris de glace, vol & incendie',
        'Assistance remorquage 24h/24 et véhicule de remplacement',
        'Gestion accélérée des sinistres en agence à Tanger',
      ],
      en: [
        'Third-party liability, glass, theft & fire protection',
        '24/7 roadside towing & courtesy replacement vehicle',
        'Fast local claims handling at our Tangier agency',
      ],
      ar: [
        'المسؤولية المدنية، كسر الزجاج، السرقة والحريق',
        'مساعدة وسحب على مدار الساعة وسيارة بديلة',
        'معالجة سريعة للحوادث في وكالتنا بطنجة',
      ],
    },
  },
  {
    id: 'habitation',
    category: 'particuliers',
    title: {
      fr: 'Habitation',
      en: 'Home Insurance',
      ar: 'تأمين السكن',
    },
    subtitle: {
      fr: 'Protection de votre foyer',
      en: 'Protect your household',
      ar: 'حماية منزلك',
    },
    baseAnnualMad: 1150,
    summary: {
      fr: 'Sécurisez votre appartement ou villa contre les dégâts des eaux, incendies, vols et bris divers.',
      en: 'Protect your apartment or villa against water damage, fire, burglary, and liability.',
      ar: 'أمّن شقتك أو فيلتك ضد أضرار المياه والحريق والسرقة والأضرار المتنوعة',
    },
    heroHeadline: {
      fr: 'Veillez sur votre foyer, votre villa et vos biens précieux.',
      en: 'Safeguard your home, your villa, and everything inside.',
      ar: 'راقب منزلك وفيلتك وممتلكاتك الثمينة',
    },
    heroTagline: {
      fr: 'Assurance Habitation · Sérénité 7j/7 pour votre famille.',
      en: 'Home Insurance · 24/7 peace of mind for your family.',
      ar: 'تأمين السكن · اطمئنان على مدار الأسبوع لعائلتك',
    },
    highlights: {
      fr: [
        'Incendie, dégâts des eaux, vol et dommages électriques',
        'Responsabilité civile chef de famille incluse',
        'Dépannage d’urgence serrurerie et plomberie 7j/7',
      ],
      en: [
        'Fire, water damage, burglary & electrical surge cover',
        'Family personal liability protection included',
        '24/7 emergency locksmith and plumbing assistance',
      ],
      ar: [
        'الحريق، أضرار المياه، السرقة والأضرار الكهربائية',
        'مسؤولية مدنية لرب الأسرة مشمولة',
        'تدخل مستعجل للقفل والسباكة على مدار الأسبوع',
      ],
    },
  },
  {
    id: 'sante-cnss',
    category: 'particuliers',
    title: {
      fr: 'Santé & AMC CNSS',
      en: 'Health & AMC CNSS',
      ar: 'الصحة والتأمين التكميلي CNSS',
    },
    subtitle: {
      fr: 'Couverture santé complémentaire',
      en: 'Supplementary health cover',
      ar: 'تغطية صحية تكميلية',
    },
    baseAnnualMad: 2200,
    summary: {
      fr: 'Remboursement optimal des frais médicaux en complément de l’AMO/CNSS pour familles et dirigeants.',
      en: 'High reimbursement rates complementing AMO/CNSS for families, executives, and staff.',
      ar: 'أفضل نسبة استرجاع للمصاريف الطبية مكملة لـ AMO/CNSS للعائلات والمسيرين',
    },
    heroHeadline: {
      fr: 'Une couverture santé complète pour vous et vos proches.',
      en: 'Comprehensive health coverage for you and your loved ones.',
      ar: 'تغطية صحية شاملة لك ولأحبائك',
    },
    heroTagline: {
      fr: 'Santé & AMC CNSS · Soins, optique et hospitalisation.',
      en: 'Health & AMC CNSS · Care, optical and hospitalization.',
      ar: 'الصحة والتأمين التكميلي CNSS · العلاج والنظارات والاستشفاء',
    },
    highlights: {
      fr: [
        'Complément AMO/CNSS jusqu’à 100% selon la formule',
        'Optique, dentaire, maternité et hospitalisation',
        'Tiers payant et prise en charge internationale en option',
      ],
      en: [
        'AMO/CNSS top-up up to 100% depending on tier',
        'Optical, dental, maternity, and hospitalization benefits',
        'Direct billing & optional international medical evacuation',
      ],
      ar: [
        'مكمل AMO/CNSS يصل إلى 100% حسب الصيغة',
        'النظارات، طب الأسنان، الولادة والاستشفاء',
        'الدفع من طرف الغير وتغطية دولية اختيارية',
      ],
    },
  },
  // ─── Entreprises (Cards 4 to 7) ──────────────────────────────────
  {
    id: 'poids-lourds',
    category: 'entreprises',
    title: {
      fr: 'Poids lourds & Flottes',
      en: 'Heavy Trucks & Fleets',
      ar: 'الشاحنات الثقيلة والأساطيل',
    },
    subtitle: {
      fr: 'Couverture nationale & Internationale',
      en: 'National & International cover',
      ar: 'تغطية وطنية ودولية',
    },
    offerBadge: {
      fr: 'Tarif compétitif',
      en: 'Competitive rate',
      ar: 'تعرفة تنافسية',
    },
    badge: {
      fr: 'Tarif compétitif',
      en: 'Competitive rate',
      ar: 'تعرفة تنافسية',
    },
    featured: true,
    baseAnnualMad: 7800,
    summary: {
      fr: 'Formules spécialisées pour transporteurs routiers, tracteurs, remorques et flottes TIR au départ de Tanger Med.',
      en: 'Specialized policies for hauliers, tractors, trailers, and TIR fleets operating out of Tanger Med.',
      ar: 'صيغ متخصصة لناقلي البضائع والجرارات والمقطورات وأساطيل TIR انطلاقاً من طنجة المتوسط.',
    },
    heroHeadline: {
      fr: 'La référence de l’assurance Poids Lourds & Flottes à Tanger',
      en: 'The benchmark for Heavy Truck & Fleet Insurance in Tangier',
      ar: 'المرجع في تأمين الشاحنات الثقيلة والأساطيل بطنجة',
    },
    heroTagline: {
      fr: 'Des solutions performantes pour les transporteurs et les grandes flottes.',
      en: 'High-performance solutions for hauliers and commercial fleets.',
      ar: 'حلول عالية الأداء لناقلي البضائع والأساطيل الكبرى.',
    },
    highlights: {
      fr: [
        'Carte Verte internationale & extensions Europe / Maghreb',
        'Remise flotte multi-véhicules et suivi sinistres prioritaire',
        'Couverture marchandise transportée et immobilisation',
      ],
      en: [
        'International Green Card & Europe / Maghreb extensions',
        'Multi-vehicle fleet discounts & priority claims desk',
        'Cargo liability and downtime coverage options',
      ],
      ar: [
        'البطاقة الخضراء الدولية وامتدادات أوروبا / المغرب العربي',
        'خصم الأساطيل متعددة المركبات ومتابعة أولوية للحوادث',
        'تغطية البضائع المنقولة وفترة التوقف',
      ],
    },
  },
  {
    id: 'entreprises',
    category: 'entreprises',
    title: {
      fr: 'Entreprises & Professionnels',
      en: 'Business & Commercial',
      ar: 'الشركات والمهنيين',
    },
    subtitle: {
      fr: 'Solutions sur mesure pour vos activités',
      en: 'Tailored solutions for your business',
      ar: 'حلول مصممة لأنشطتكم',
    },
    baseAnnualMad: 5400,
    summary: {
      fr: 'Multirisque professionnelle, RC exploitation, bris de machine et perte d’exploitation pour PME et grands comptes.',
      en: 'Commercial multi-risk, general liability, machinery breakdown, and business interruption.',
      ar: 'التأمين المتعدد المخاطر المهنية والمسؤولية المدنية وانكسار الآلات وتوقف النشاط للصغرى والكبرى.',
    },
    heroHeadline: {
      fr: 'Sécurise la croissance et l’activité de votre entreprise.',
      en: 'Secure your company’s growth, assets, and daily operations.',
      ar: 'أمّن نمو شركة أنشطتك وممتلكاتها ويومياتها',
    },
    heroTagline: {
      fr: 'Entreprises & Professionnels · Solutions sur mesure à Tanger.',
      en: 'Business & Commercial · Tailored protection in Tangier.',
      ar: 'الشركات والمهنيين · حلول مصممة في طنجة',
    },
    highlights: {
      fr: [
        'Multirisque locaux commerciaux, entrepôts et usines',
        'Responsabilité civile professionnelle & décennale',
        'Audit annuel des risques par notre cabinet à Tanger',
      ],
      en: [
        'Multi-risk for offices, warehouses, and industrial sites',
        'Professional indemnity & decennial liability',
        'Annual risk audit by our Tangier general agency',
      ],
      ar: [
        'متعدد المخاطر للمحلات التجارية والمستودعات والمصانع',
        'المسؤولية المدنية المهنية والمسؤولية العشرية',
        'تدقيق سنوي للمخاطر من مكتبنا بطنجة',
      ],
    },
  },
  {
    id: 'accidents-travail',
    category: 'entreprises',
    title: {
      fr: 'Accidents du Travail',
      en: 'Workplace Accidents',
      ar: 'حوادث الشغل',
    },
    subtitle: {
      fr: 'Protection des salariés',
      en: 'Employee protection',
      ar: 'حماية الأجراء',
    },
    baseAnnualMad: 3400,
    summary: {
      fr: 'Couverture légale et renforcée pour protéger vos équipes sur chantier, en usine ou au bureau.',
      en: 'Statutory and enhanced occupational coverage for your teams across sites, plants, and offices.',
      ar: 'تغطية قانونية ومعززة لحماية فرقك في الورشات والمصانع والمكاتب.',
    },
    heroHeadline: {
      fr: 'Protégez chaque collaborateur sur vos chantiers et sites industriels.',
      en: 'Protect every employee across your sites and workplaces.',
      ar: 'احمِ كل موظف في ورشاتك ومواقعك الصناعية.',
    },
    heroTagline: {
      fr: 'Accidents du Travail · Conformité & réactivité à Tanger.',
      en: 'Workplace Accidents · Compliance & rapid care in Tangier.',
      ar: 'حوادث الشغل ·امتثال وسرعة تدخل في طنجة',
    },
    highlights: {
      fr: [
        'Prise en charge immédiate des soins médicaux et hospitaliers',
        'Indemnités journalières et rentes conformes à la législation',
        'Accompagnement dédié des déclarations RH',
      ],
      en: [
        'Immediate medical and hospital care coverage',
        'Daily allowances and statutory disability benefits',
        'Dedicated HR claims filing support',
      ],
      ar: [
        'تغطية فورية للعلاجات الطبية والاستشفائية',
        'منح يومية وتعويضات مطابقة للتشريع',
        'مواكبة مخصصة لتصريحات الموارد البشرية',
      ],
    },
  },
  {
    id: 'maritime',
    category: 'entreprises',
    title: {
      fr: 'Assurance Maritime',
      en: 'Marine Insurance',
      ar: 'التأمين البحري',
    },
    subtitle: {
      fr: 'Transport de marchandises',
      en: 'Cargo & goods transport',
      ar: 'نقل البضائع والملاحة',
    },
    baseAnnualMad: 6200,
    summary: {
      fr: 'Couverture complète des facultés maritimes, corps de navires et fret transitant par Tanger Med et les ports marocains.',
      en: 'Comprehensive cargo, vessel hull, and freight coverage transiting through Tanger Med and Moroccan ports.',
      ar: 'تغطية شاملة للبضائع المنقولة بحراً وهياكل السفن والشحن العابر عبر طنجة المتوسط والموانئ المغربية.',
    },
    heroHeadline: {
      fr: 'Sécurisez vos cargaisons et expéditions maritimes à Tanger Med.',
      en: 'Protect your cargo and maritime freight through Tanger Med.',
      ar: 'أمّن شحناتك وبضائعك البحرية عبر طنجة المتوسط',
    },
    heroTagline: {
      fr: 'Assurance Maritime · Import-Export & Transit à Tanger.',
      en: 'Marine Insurance · Import-Export & Transit in Tangier.',
      ar: 'التأمين البحري · الاستيراد والتصدير والعبور في طنجة',
    },
    highlights: {
      fr: [
        'Garantie tous risques facultés (marchandises transportées)',
        'Assurance corps, machines et responsabilités maritimes',
        'Gestion rapide des avaries et commissariat d’avaries à Tanger Med',
      ],
      en: [
        'All-risks cargo cover (Institute Cargo Clauses A/B/C)',
        'Hull, machinery, and maritime liability protection',
        'Rapid claims & average adjuster network at Tanger Med',
      ],
      ar: [
        'ضمان كل المخاطر للبضائع المنقولة بحراً',
        'تأمين هياكل السفن والآلات والمسؤوليات البحرية',
        'معالجة سريعة للأضرار ومعاينة الحوادث بطنجة المتوسط',
      ],
    },
  },
];

export interface QuoteFormInput {
  solutionId: SolutionId;
  tier: CoverageTier;
  fullName: string;
  phone: string;
  email?: string;
  companyOrCity?: string;
  notes?: string;
}

export interface QuoteValidationResult {
  valid: boolean;
  errors: Partial<Record<'fullName' | 'phone' | 'email' | 'solutionId', string>>;
}

export function validateQuoteInput(
  input: QuoteFormInput,
  lang: Language = 'fr'
): QuoteValidationResult {
  const errors: QuoteValidationResult['errors'] = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = t3(
      lang,
      'Veuillez saisir votre nom complet (minimum 2 caractères).',
      'Please enter your full name (at least 2 characters).',
      'يرجى إدخال الاسم الكامل (حرفين على الأقل).'
    );
  }

  const normalizedPhone = (input.phone || '').replace(/[\s.-]/g, '');
  const moroccanPhoneRegex = /^(\+212|00212|0)(5|6|7)\d{8}$/;
  const intlPhoneRegex = /^\+?\d{9,15}$/;
  if (!normalizedPhone || (!moroccanPhoneRegex.test(normalizedPhone) && !intlPhoneRegex.test(normalizedPhone))) {
    errors.phone = t3(
      lang,
      'Numéro invalide (ex. 0661 50 89 25 ou +212 6...).',
      'Invalid phone number (e.g. 0661 50 89 25 or +212 6...).',
      'رقم غير صالح (مثال: 0661 50 89 25 ou +212 6...).'
    );
  }

  if (input.email && input.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.email = t3(
        lang,
        'Adresse e-mail invalide.',
        'Please enter a valid email address.',
        'يرجى إدخال بريد إلكتروني صالح.'
      );
    }
  }

  const exists = INSURANCE_SOLUTIONS.some((s) => s.id === input.solutionId);
  if (!exists) {
    errors.solutionId = t3(
      lang,
      'Veuillez sélectionner une solution d’assurance.',
      'Please select an insurance solution.',
      'يرجى اختيار حل تأميني.'
    );
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function estimateAnnualPremium(
  solutionId: SolutionId,
  tier: CoverageTier
): number {
  const solution = INSURANCE_SOLUTIONS.find((s) => s.id === solutionId);
  const base = solution ? solution.baseAnnualMad : 2500;
  const multiplier = tier === 'essentiel' ? 1 : tier === 'confort' ? 1.35 : 1.75;
  return Math.round((base * multiplier) / 50) * 50;
}

export function generateQuoteReference(solutionId: SolutionId, timestampMs: number): string {
  const prefixMap: Record<SolutionId, string> = {
    automobile: 'AUT',
    'accidents-travail': 'ATR',
    'sante-cnss': 'SNT',
    habitation: 'HAB',
    'poids-lourds': 'PLF',
    entreprises: 'ENT',
    maritime: 'MAR',
  };
  const code = prefixMap[solutionId] || 'GEN';
  const suffix = String(Math.abs(timestampMs) % 10000).padStart(4, '0');
  return `AMK-${code}-${suffix}`;
}

export interface ClientPolicyRecord {
  policyNumber: string;
  holderName: string;
  solutionTitle: Record<Language, string>;
  assetLabel: Record<Language, string>;
  status: 'active' | 'renewal_due';
  validUntil: string;
  agencyCity: string;
}

export const DEMO_CLIENT_POLICIES: ClientPolicyRecord[] = [
  {
    policyNumber: 'AMEKRAN-TNG-2026-4812',
    holderName: 'Karim El Amrani',
    solutionTitle: {
      fr: 'Automobile — Tous Risques',
      en: 'Automobile — Comprehensive',
      ar: 'السيارات — كل المخاطر',
    },
    assetLabel: {
      fr: 'SUV Hybride · 48-A-29410',
      en: 'Hybrid SUV · 48-A-29410',
      ar: 'دفع رباعي هجينة · 48-A-29410',
    },
    status: 'active',
    validUntil: '31/12/2026',
    agencyCity: 'Tanger',
  },
  {
    policyNumber: 'AMEKRAN-FLT-2025-1094',
    holderName: 'TransNord Logistique SARL',
    solutionTitle: {
      fr: 'Poids lourds & Flottes TIR',
      en: 'Heavy Trucks & TIR Fleet',
      ar: 'الشاحنات الثقيلة وأساطيل TIR',
    },
    assetLabel: {
      fr: 'Flotte 12 Tracteurs · Tanger Med',
      en: '12 Tractor Fleet · Tanger Med',
      ar: 'أسطول 12 جراراً · طنجة المتوسط',
    },
    status: 'renewal_due',
    validUntil: '15/12/2026',
    agencyCity: 'Tanger',
  },
  {
    policyNumber: 'AMEKRAN-SNT-2026-7721',
    holderName: 'Clinique Détroit',
    solutionTitle: {
      fr: 'Santé & AMC CNSS Groupe',
      en: 'Group Health & AMC CNSS',
      ar: 'صحة جماعية وتأمين تكميلي CNSS',
    },
    assetLabel: {
      fr: '42 Salariés · Option Confort',
      en: '42 Employees · Comfort Plan',
      ar: '42 موظفاً · صيغة Confort',
    },
    status: 'active',
    validUntil: '30/06/2027',
    agencyCity: 'Tanger',
  },
];

export function lookupClientPolicy(query: string): ClientPolicyRecord | null {
  const raw = query.trim().toUpperCase();
  if (!raw) return null;
  const normalized = raw.replace(/^RMA-/, 'AMEKRAN-');
  return (
    DEMO_CLIENT_POLICIES.find(
      (p) =>
        p.policyNumber.toUpperCase() === raw ||
        p.policyNumber.toUpperCase() === normalized
    ) ?? null
  );
}