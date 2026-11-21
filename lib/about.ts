import type { Language } from './insurance';

export interface TimelineMilestone {
  year: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export interface KeyIndicatorSeries {
  id: string;
  label: Record<Language, string>;
  yearPrevLabel: string;
  yearCurrLabel: string;
  valuePrev: number;
  valueCurr: number;
  unit: string;
}

export interface BusinessDomainCard {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  imageKey: 'family' | 'business' | 'assistance';
  actionType: 'particuliers' | 'entreprises' | 'contact';
  actionLabel: Record<Language, string>;
}

export interface KeyFigureItem {
  id: string;
  value: string;
  label: Record<Language, string>;
}

export interface TeamDirector {
  id: string;
  name: string;
  role: Record<Language, string>;
  bio: Record<Language, string>;
  imageKey: 'karim' | 'salma' | 'youssef' | 'nadia';
}

export interface CorporatePublication {
  id: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  year: string;
  pages: string;
  coverKey: 'business' | 'portal';
  highlights: Record<Language, string[]>;
}

export const INITIAL_TIMELINE_COUNT = 4;

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '2025',
    title: {
      fr: 'Pôle Digital & Flottes Tanger Med',
      en: 'Digital Hub & Tanger Med Fleets',
      ar: 'القطب الرقمي وأساطيل طنجة المتوسط',
    },
    description: {
      fr: 'Déploiement des services en ligne Amekran Assurances pour le suivi instantané des contrats, devis flottes et déclarations sinistres à Tanger.',
      en: 'Deployment of Amekran Assurances online services for instant policy tracking, fleet quotes, and claim declarations in Tangier.',
      ar: 'إطلاق الخدمات الإلكترونية لتأمين AMEKRAN لمتابعة العقود الفورية وتقديرات الأساطيل وتصريحات الحوادث بطنجة.',
    },
  },
  {
    year: '2022',
    title: {
      fr: 'Cellule Grands Comptes & Maritime',
      en: 'Key Accounts & Maritime Desk',
      ar: 'خلية كبار الحسابات والتأمين البحري',
    },
    description: {
      fr: 'Ouverture d’un pôle dédié aux entreprises de transport international, transitaires et acteurs portuaires opérant autour de Tanger Med.',
      en: 'Launch of a dedicated desk serving international road hauliers, freight forwarders, and port operators across Tanger Med.',
      ar: 'افتتاح قطب مخصص لشركات النقل الدولي والوسطاء الجمركيين والفاعلين المينائيين بطنجة المتوسط.',
    },
  },
  {
    year: '2019',
    title: {
      fr: 'Assistance Sinistres 24h/7j',
      en: '24/7 Claims Assistance',
      ar: 'مساعدة الحوادث 24س/7أيام',
    },
    description: {
      fr: 'Mise en place d’une cellule locale d’assistance continue et d’accompagnement prioritaire pour nos assurés particuliers et professionnels.',
      en: 'Establishment of a dedicated local continuous assistance and priority support unit for individual and corporate policyholders.',
      ar: 'إنشاء خلية محلية للمساعدة المستمرة والمواكبة ذات الأولوية لمؤمنينا من أفراد ومهنيين.',
    },
  },
  {
    year: '2016',
    title: {
      fr: 'Modernisation du Siège Avenue Mohammed V',
      en: 'Avenue Mohammed V Headquarters Expansion',
      ar: 'تحديث المقر بشارع محمد الخامس',
    },
    description: {
      fr: 'Extension de notre agence principale au cœur de Tanger avec des espaces dédiés à l’accueil patrimonial, santé et prévoyance.',
      en: 'Expansion of our flagship agency in central Tangier with dedicated advisory lounges for wealth, health, and protection.',
      ar: 'توسيع وكالتنا الرئيسية في قلب طنجة مع فضاءات مخصصة للاستقبال المالي والصحي والتأميني.',
    },
  },
  {
    year: '2012',
    title: {
      fr: 'Pôle Accidents du Travail & PME',
      en: 'Workplace Protection & SME Desk',
      ar: 'قطب حوادث الشغل والمقاولات الصغرى والمتوسطة',
    },
    description: {
      fr: 'Structuration d’offres complètes de protection des salariés et de responsabilité civile pour les industries de Tanger Free Zone.',
      en: 'Structuring comprehensive employee protection and liability solutions for industrial companies across Tangier Free Zone.',
      ar: 'هيكلة عروض شاملة لحماية الأجراء والمسؤولية المدنية للمصانع والشركات بالمنطقة الحرة بطنجة.',
    },
  },
  {
    year: '2009',
    title: {
      fr: 'Lancement de l’Offre Poids Lourds C2',
      en: 'Launch of Heavy Truck C2 Offer',
      ar: 'إطلاق عرض الشاحنات الثقيلة C2',
    },
    description: {
      fr: 'Création d’un programme tarifaire compétitif conçu spécialement pour les tracteurs routiers et flottes TIR du Nord du Maroc.',
      en: 'Creation of a competitive rate program tailored specifically for road tractors and TIR fleets in Northern Morocco.',
      ar: 'ابتكار برنامج تعريفي تنافسي مصمم خصيصاً للشاحنات والجرارات وأساطيل TIR بشمال المغرب.',
    },
  },
  {
    year: '2006',
    title: {
      fr: 'Développement Santé & AMC CNSS',
      en: 'Health & CNSS Complementary Growth',
      ar: 'تطوير تأمين الصحة والتكميلي CNSS',
    },
    description: {
      fr: 'Partenariat élargi avec les entreprises et cliniques de la région pour fluidifier les remboursements frais médicaux et optique.',
      en: 'Expanded partnerships with regional businesses and clinics to streamline medical and optical claim reimbursements.',
      ar: 'شراكة موسعة مع الشركات والعيادات بالمنطقة لتيسير استرجاع مصاريف العلاج والنظارات.',
    },
  },
  {
    year: '2004',
    title: {
      fr: 'Fondation de Amekran Assurances à Tanger',
      en: 'Founding of Amekran Assurances in Tangier',
      ar: 'تأسيس AMEKRAN للتأمين بطنجة',
    },
    description: {
      fr: 'Création du cabinet en qualité d’Agent Général à Tanger, animé par l’exigence du conseil sur mesure et la proximité terrain.',
      en: 'Establishment of the firm as a General Insurance Agent in Tangier, driven by tailored advice and local proximity.',
      ar: 'تأسيس المكتب بصفة وكيل عام بطنجة، انطلاقاً من الحرص على الاستشارة المصممة والقرب الميداني.',
    },
  },
];

export const KEY_INDICATORS: KeyIndicatorSeries[] = [
  {
    id: 'premiums',
    label: {
      fr: "Volume d'activité (MDH)*",
      en: 'Managed Volume (MDH)*',
      ar: 'حجم المعاملات (مليون درهم)*',
    },
    yearPrevLabel: '2023',
    yearCurrLabel: '2024',
    valuePrev: 64,
    valueCurr: 78,
    unit: 'MDH',
  },
  {
    id: 'settlement',
    label: {
      fr: 'Sinistres réglés (%)',
      en: 'Claims Settled (%)',
      ar: 'الحوادث المعالجة (%)',
    },
    yearPrevLabel: '2023',
    yearCurrLabel: '2024',
    valuePrev: 93,
    valueCurr: 97,
    unit: '%',
  },
  {
    id: 'retention',
    label: {
      fr: 'Fidélité assurés (%)',
      en: 'Client Retention (%)',
      ar: 'وفاء الزبناء (%)',
    },
    yearPrevLabel: '2023',
    yearCurrLabel: '2024',
    valuePrev: 91,
    valueCurr: 95,
    unit: '%',
  },
];

export const BUSINESS_DOMAINS: BusinessDomainCard[] = [
  {
    id: 'particuliers',
    imageKey: 'family',
    title: {
      fr: 'Des couvertures adaptées à vos besoins',
      en: 'Coverage Tailored to Your Needs',
      ar: 'تغطيات ملائمة لاحتياجاتكم',
    },
    description: {
      fr: 'Amekran Assurances propose aux particuliers de Tanger des formules personnalisées pour protéger leur quotidien : automobile, habitation, santé complémentaire, prévoyance familiale et épargne retraite aux conditions les plus justes.',
      en: 'Amekran Assurances offers Tangier individuals personalized coverage protecting every facet of daily life: auto, home, supplementary health, family protection, and retirement savings at competitive rates.',
      ar: 'توفّر AMEKRAN للتأمين لأفراد طنجة صيغاً مخصصة لحماية يومياتهم: السيارات، السكن، التغطية الصحية التكميلية، والتأمين العائلي بأفضل الشروط.',
    },
    actionType: 'particuliers',
    actionLabel: {
      fr: 'Découvrir nos offres Particuliers',
      en: 'Explore Individual Plans',
      ar: 'اكتشف عروض الأفراد',
    },
  },
  {
    id: 'entreprises',
    imageKey: 'business',
    title: {
      fr: 'Des protections contre les aléas de votre activité',
      en: 'Protection Against Business Risks',
      ar: 'حماية شاملة ضد مخاطر نشاطكم',
    },
    description: {
      fr: 'Une panne immobilisant un convoi, un sinistre sur chantier ou un risque maritime peut fragiliser votre entreprise. Nos solutions Accidents du Travail, Flottes Poids Lourds, Multirisque Pro et Maritime sécurisent durablement votre activité.',
      en: 'An immobilized fleet, worksite incident, or cargo loss can disrupt operations. Our Workers Compensation, Heavy Fleet, Business Multi-Risk, and Marine policies safeguard your operations long term.',
      ar: 'تعطل شاحنة أو حادث في ورشة أو خطر بحري قد يهدد نشاطكم. حلولنا لحوادث الشغل وأساطيل الشاحنات والتأمين المتعدد المخاطر والبحري تؤمن أعمالكم.',
    },
    actionType: 'entreprises',
    actionLabel: {
      fr: 'Voir nos solutions Entreprises',
      en: 'Explore Corporate Solutions',
      ar: 'شاهد حلول الشركات',
    },
  },
  {
    id: 'assistance',
    imageKey: 'assistance',
    title: {
      fr: 'Amekran veille sur vous 24h/7j',
      en: 'Amekran Watches Over You 24/7',
      ar: 'AMEKRAN في خدمتكم 24س/7أيام',
    },
    description: {
      fr: 'En cas d’urgence routière, médicale ou matérielle, nos conseillers et chargés d’assistance à Tanger sont joignables 24h/24 et 7j/7 pour orienter les secours, ouvrir votre dossier sans délai et vous accompagner jusqu’à l’indemnisation.',
      en: 'In any road, medical, or property emergency, our advisors and assistance coordinators in Tangier remain available 24/7 to dispatch help, open your claim promptly, and follow through until settlement.',
      ar: 'في حالات الطوارئ على الطريق أو العلاج أو الأضرار، مستشارونا بطنجة متاحون على مدار الساعة لتوجيه المساعدة وفتح ملفكم والمتابعة حتى التعويض.',
    },
    actionType: 'contact',
    actionLabel: {
      fr: 'Contacter un conseiller',
      en: 'Contact an Advisor',
      ar: 'اتصل بمستشار',
    },
  },
];

export const KEY_FIGURES_NETWORK: KeyFigureItem[] = [
  {
    id: 'years',
    value: '+20 ans',
    label: { fr: "D'expertise à Tanger", en: 'Expertise in Tangier', ar: 'من الخبرة بطنجة' },
  },
  {
    id: 'advisors',
    value: '18',
    label: { fr: 'Conseillers dédiés', en: 'Dedicated Advisors', ar: 'مستشاراً متخصصاً' },
  },
  {
    id: 'availability',
    value: '24h/7j',
    label: { fr: 'Assistance sinistres', en: 'Claims Assistance', ar: 'مساعدة الحوادث' },
  },
  {
    id: 'satisfaction',
    value: '97%',
    label: { fr: 'Taux de satisfaction', en: 'Client Satisfaction', ar: 'نسبة الرضا' },
  },
];

export const KEY_FIGURES_PORTFOLIO: KeyFigureItem[] = [
  {
    id: 'clients',
    value: '+12k',
    label: { fr: 'Clients particuliers', en: 'Individual Clients', ar: 'زبون من الأفراد' },
  },
  {
    id: 'vehicles',
    value: '+18,5k',
    label: { fr: 'Véhicules & flottes assurés', en: 'Insured Vehicles & Fleets', ar: 'مركبة وأسطول مؤمن' },
  },
  {
    id: 'companies',
    value: '+1,4k',
    label: { fr: 'Entreprises partenaires', en: 'Partner Businesses', ar: 'شركة شريكة' },
  },
  {
    id: 'homes',
    value: '+6,8k',
    label: { fr: 'Habitations & santé couvertes', en: 'Homes & Health Policies', ar: 'سكن وتأمين صحي' },
  },
];

export const TEAM_DIRECTORS: TeamDirector[] = [
  {
    id: 'karim-amekran',
    name: 'Mme.  Amekran',
    role: {
      fr: 'Agent Général & Fondateur',
      en: 'General Agent & Founder',
      ar: 'الوكيل العام والمؤسس',
    },
    imageKey: 'salma',
    bio: {
      fr: "Diplômé en finance et droit des assurances, Karim Amekran fonde le cabinet à Tanger en 2004 après plus de dix ans d'expérience auprès de compagnies nationales. Il pilote la stratégie de développement, les partenariats institutionnels et le conseil aux dirigeants de PME et groupes logistiques du Nord.",
      en: 'Holding degrees in finance and insurance law, Karim Amekran founded the Tangier agency in 2004 after a decade with leading national insurers. He leads strategic growth, institutional partnerships, and executive advisory for SMEs and logistics groups in Northern Morocco.',
      ar: 'حاصل على شهادات في المالية وقانون التأمين، أسس كريم أمقران المكتب بطنجة سنة 2004 بعد خبرة تفوق 10 سنوات لدى كبريات الشركات الوطنية. يقود استراتيجية التنمية والاستشارة للمقاولات والمجموعات اللوجستية.',
    },
  },
  {
    id: 'salma-benali',
    name: 'M. Ahmed Ben',
    role: {
      fr: 'Directrice Développement Entreprises',
      en: 'Head of Corporate Development',
      ar: 'مديرة تنمية قطاع الشركات',
    },
    imageKey: 'karim',
    bio: {
      fr: "Ingénieure d'État spécialisée en gestion des risques industriels, Salma Benali accompagne depuis plus de 14 ans les usines de Tanger Automotive City, les acteurs maritimes de Tanger Med et les professionnels dans la structuration de programmes d'assurance sur mesure.",
      en: 'State engineer specialized in industrial risk management, Salma Benali has advised Tanger Automotive City plants, Tanger Med maritime operators, and corporate groups for over 14 years on tailored commercial insurance programs.',
      ar: 'مهندسة دولة متخصصة في تدبير المخاطر الصناعية، تواكب سلمى بنعلي منذ أكثر من 14 عاماً مصانع مدينة السيارات بطنجة والفاعلين البحريين بطنجة المتوسط والمهنيين في هيكلة برامج التأمين.',
    },
  },
  {
    id: 'youssef-idrissi',
    name: 'M. Youssef El Idrissi',
    role: {
      fr: 'Responsable Flottes Poids Lourds & Maritime',
      en: 'Heavy Fleets & Marine Director',
      ar: 'مسؤول أساطيل الشاحنات والتأمين البحري',
    },
    imageKey: 'youssef',
    bio: {
      fr: "Expert technique en transport routier national et international (TIR), Youssef El Idrissi supervise les souscriptions poids lourds tarif C2, l'assurance facultés maritimes et l'optimisation de la sinistralité pour plus de 350 transporteurs partenaires.",
      en: 'Technical specialist in domestic and international road haulage (TIR), Youssef El Idrissi oversees C2-rate heavy truck underwriting, marine cargo insurance, and loss-ratio optimization for more than 350 partner transport operators.',
      ar: 'خبير تقني في النقل الطرقي الوطني والدولي (TIR)، يشرف يوسف الإدريسي على اكتتابات الشاحنات بتعرفة C2 وتأمين البضائع البحرية وتحسين معالجة الحوادث لأزيد من 350 ناقلاً شريكاً.',
    },
  },
  {
    id: 'nadia-tazi',
    name: 'Mme. Nadia Tazi',
    role: {
      fr: 'Responsable Sinistres, Santé & Prévoyance',
      en: 'Claims, Health & Protection Lead',
      ar: 'مسؤولة الحوادث والصحة والتغطية',
    },
    imageKey: 'nadia',
    bio: {
      fr: "Spécialiste de l'indemnisation automobile et de l'AMC CNSS, Nadia Tazi dirige l'équipe de gestion des sinistres à Tanger. Elle veille à la rapidité des expertises, au suivi humain des dossiers médicaux et à la qualité de service 24h/7j.",
      en: 'Specialist in motor claims settlement and supplementary CNSS health plans, Nadia Tazi leads our Tangier claims team, ensuring fast loss assessments, empathetic medical dossier handling, and 24/7 service quality.',
      ar: 'متخصصة في تعويضات السيارات والتأمين التكميلي CNSS، تدير نادية التازي فريق تدبير الحوادث بطنجة، وتسهر على سرعة المعاينات والمتابعة الإنسانية للملفات الطبية على مدار الساعة.',
    },
  },
];

export const CORPORATE_PUBLICATIONS: CorporatePublication[] = [
  {
    id: 'brochure-entreprises-2025',
    title: {
      fr: 'Brochure Solutions Entreprises & Flottes 2025',
      en: '2025 Corporate & Fleet Solutions Brochure',
      ar: 'كتيب حلول الشركات والأساطيل 2025',
    },
    subtitle: {
      fr: 'Présentation des garanties Poids Lourds, Accidents du Travail et Maritime Tanger Med',
      en: 'Overview of Heavy Truck, Workplace Injury, and Tanger Med Marine Guarantees',
      ar: 'عرض ضمانات الشاحنات الثقيلة وحوادث الشغل والتأمين البحري طنجة المتوسط',
    },
    year: '2025',
    pages: '16 pages',
    coverKey: 'business',
    highlights: {
      fr: [
        'Couverture Flottes Poids Lourds & Tracteurs Routiers (Tarif C2 compétitif)',
        'Conformité Accidents du Travail pour sites industriels et chantiers BTP',
        'Assurance Maritime Tous Risques import-export via Tanger Med',
        'Interlocuteur unique à Tanger et ouverture sinistre sous 24h',
      ],
      en: [
        'Heavy Truck & Road Tractor Fleet Coverage (Competitive C2 Rate)',
        'Workplace Injury compliance for industrial sites and construction',
        'All-Risk Marine Cargo coverage for import-export via Tanger Med',
        'Dedicated Tangier account advisor and 24-hour claim registration',
      ],
      ar: [
        'تغطية أساطيل الشاحنات والجرارات الطرقية (تعرفة C2 التنافسية)',
        'مطابقة حوادث الشغل للمواقع الصناعية وأوراش البناء',
        'تأمين بحري شامل لكل المخاطر للاستيراد والتصدير عبر طنجة المتوسط',
        'مخاطب وحيد بطنجة وفتح ملف الحادث في أقل من 24 ساعة',
      ],
    },
  },
  {
    id: 'guide-prevention-sinistres-2025',
    title: {
      fr: 'Guide Pratique Particuliers & Sinistres 2025',
      en: '2025 Individual & Claims Practical Guide',
      ar: 'الدليل العملي للأفراد والحوادث 2025',
    },
    subtitle: {
      fr: 'Réflexes essentiels Automobile, Habitation et remboursements Santé / AMC CNSS',
      en: 'Essential guidance for Auto, Home, and Health / CNSS reimbursements',
      ar: 'الإجراءات الأساسية للسيارات والسكن واسترجاع مصاريف الصحة / CNSS',
    },
    year: '2025',
    pages: '12 pages',
    coverKey: 'portal',
    highlights: {
      fr: [
        'Procédure express en cas d’accident matériel ou corporel à Tanger',
        'Checklist pièces pour remboursement AMC CNSS sous 7 jours ouvrés',
        'Garanties Multirisque Habitation contre dégâts des eaux, vol et incendie',
        'Ligne directe assistance 0661 50 89 25 et suivi via Espace Client',
      ],
      en: [
        'Express procedure after road accidents or vehicle damage in Tangier',
        'Checklist for supplementary CNSS health reimbursement within 7 business days',
        'Comprehensive Home protection against water damage, theft, and fire',
        'Direct 24/7 support line 0661 50 89 25 and online Client Portal tracking',
      ],
      ar: [
        'مسطرة سريعة في حالة حادث مادي أو جسدي بطنجة',
        'لائحة الوثائق لتعويضات AMC CNSS خلال 7 أيام عمل',
        'ضمانات متعددة المخاطر للسكن ضد أضرار المياه والسرقة والحريق',
        'خط مباشر للمساعدة 0661 50 89 25 وتتبع عبر فضاء الزبون',
      ],
    },
  },
];

export function getVisibleTimelineMilestones(
  expanded: boolean,
  milestones: TimelineMilestone[] = TIMELINE_MILESTONES
): TimelineMilestone[] {
  if (expanded) return milestones;
  return milestones.slice(0, INITIAL_TIMELINE_COUNT);
}

export function getTeamMaxStartIndex(
  totalMembers: number,
  visibleCount: number
): number {
  if (totalMembers <= visibleCount || visibleCount <= 0) return 0;
  return totalMembers - visibleCount;
}

export function clampTeamStartIndex(
  index: number,
  totalMembers: number,
  visibleCount: number
): number {
  const max = getTeamMaxStartIndex(totalMembers, visibleCount);
  if (index < 0) return 0;
  if (index > max) return max;
  return index;
}

export function calculateBarHeightPercent(value: number, maxScale = 100): number {
  if (maxScale <= 0) return 0;
  const clamped = Math.max(0, Math.min(maxScale, value));
  return Math.round((clamped / maxScale) * 100);
}
