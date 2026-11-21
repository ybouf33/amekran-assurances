import type { CoverageTier, Language } from './insurance';

export type FamilyStatus = 'individuel' | 'couple' | 'famille' | 'senior';

export interface SanteSimulationInput {
  status: FamilyStatus;
  childrenCount: number;
  tier: CoverageTier;
  includeMaternity?: boolean;
}

export interface SanteSimulationResult {
  annualMad: number;
  monthlyMad: number;
  consultationRatePercent: number;
  hospitalizationRatePercent: number;
  opticsCeilingMad: number;
  dentalCeilingMad: number;
}

export interface FamilyStatusOption {
  id: FamilyStatus;
  label: Record<Language, string>;
  subtitle: Record<Language, string>;
  baseMad: number;
}

export const FAMILY_STATUS_OPTIONS: FamilyStatusOption[] = [
  {
    id: 'individuel',
    label: { fr: 'Individuel', en: 'Individual', ar: 'فردي' },
    subtitle: {
      fr: 'Pour vous-même (salarié, indépendant, profession libérale)',
      en: 'For yourself (employee, freelancer, professional)',
      ar: 'لحمايتكم الفردية (أجير، مستقل، مهنة حرة)',
    },
    baseMad: 2200,
  },
  {
    id: 'couple',
    label: { fr: 'Couple', en: 'Couple', ar: 'زوجان' },
    subtitle: {
      fr: 'Couverture conjointe sans enfant',
      en: 'Joint coverage without dependent children',
      ar: 'تغطية مشتركة للزوجين بدون أطفال',
    },
    baseMad: 3800,
  },
  {
    id: 'famille',
    label: { fr: 'Famille avec enfants', en: 'Family with Children', ar: 'عائلة مع أطفال' },
    subtitle: {
      fr: 'Conjoint et enfants à charge couverts',
      en: 'Spouse and dependent children included',
      ar: 'تشمل الزوج والأطفال المكفولين',
    },
    baseMad: 4900,
  },
  {
    id: 'senior',
    label: { fr: 'Senior / Retraité', en: 'Senior / Retired', ar: 'متقاعد / كبار السن' },
    subtitle: {
      fr: 'Formule renforcée sans limite d’âge à l’adhésion',
      en: 'Reinforced coverage without entry age barrier',
      ar: 'صيغة معززة بدون شرط سن الانخراط',
    },
    baseMad: 3400,
  },
];

export function calculateSanteEstimate(
  input: SanteSimulationInput
): SanteSimulationResult {
  const statusOpt =
    FAMILY_STATUS_OPTIONS.find((s) => s.id === input.status) ??
    FAMILY_STATUS_OPTIONS[0];

  const tierMultiplier =
    input.tier === 'essentiel' ? 1.0 : input.tier === 'confort' ? 1.45 : 1.95;

  const validChildren =
    input.status === 'famille'
      ? Math.min(6, Math.max(1, Math.round(input.childrenCount)))
      : 0;

  const childrenCost = validChildren > 1 ? (validChildren - 1) * 750 : 0;
  const rawAnnual = (statusOpt.baseMad + childrenCost) * tierMultiplier;
  const annualMad = Math.max(1800, Math.round(rawAnnual / 50) * 50);
  const monthlyMad = Math.round(annualMad / 12);

  const consultationRatePercent =
    input.tier === 'essentiel' ? 80 : input.tier === 'confort' ? 90 : 100;

  const hospitalizationRatePercent =
    input.tier === 'essentiel' ? 90 : input.tier === 'confort' ? 100 : 100;

  const opticsCeilingMad =
    input.tier === 'essentiel' ? 1500 : input.tier === 'confort' ? 3000 : 5000;

  const dentalCeilingMad =
    input.tier === 'essentiel' ? 2500 : input.tier === 'confort' ? 4500 : 8000;

  return {
    annualMad,
    monthlyMad,
    consultationRatePercent,
    hospitalizationRatePercent,
    opticsCeilingMad,
    dentalCeilingMad,
  };
}

export interface SanteGuarantee {
  num: string;
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
}

export const SANTE_GUARANTEES: SanteGuarantee[] = [
  {
    num: '01.',
    id: 'amo-topup',
    title: {
      fr: 'Complément AMO / CNSS jusqu’à 100%',
      en: 'AMO / CNSS Top-up up to 100%',
      ar: 'تكملة AMO / CNSS تصل إلى 100%',
    },
    description: {
      fr: 'Remboursement de la part restante après intervention de l’AMO/CNSS sur les consultations, analyses de laboratoire et radiologie.',
      en: 'Covers the remaining balance left after statutory AMO/CNSS reimbursement on specialist visits, lab tests, and imaging.',
      ar: 'استرجاع الفارق المتبقي بعد تعويض AMO/CNSS عن الاستشارات الطبية والتحاليل المخبرية والأشعة.',
    },
  },
  {
    num: '02.',
    id: 'tiers-payant',
    title: {
      fr: 'Tiers Payant Hospitalier & Cliniques Privées',
      en: 'Direct Hospital Billing & Private Clinics',
      ar: 'الثالث المؤدي بالاستشفاء والمصحات الخاصة',
    },
    description: {
      fr: 'Prise en charge directe sans avance de frais dans les cliniques conventionnées à Tanger et partout au Maroc pour chirurgie et hospitalisation.',
      en: 'Direct billing with zero upfront payment at vetted partner clinics across Tangier and Morocco for surgery and in-patient stays.',
      ar: 'تحمل مباشر لمصاريف الجراحة والاستشفاء بدون دفع مسبق بالمصحات المعتمدة بطنجة وكافة المدن المغربية.',
    },
  },
  {
    num: '03.',
    id: 'optique-dentaire',
    title: {
      fr: 'Forfaits Optique & Dentaire Renforcés',
      en: 'Enhanced Dental & Optical Packages',
      ar: 'باقات معززة للبصريات وطب الأسنان',
    },
    description: {
      fr: 'Prise en charge généreuse des montures, verres progressifs, soins dentaires, prothèses et orthodontie des enfants.',
      en: 'Generous annual coverage for optical frames, progressive lenses, dental surgery, prostheses, and pediatric orthodontics.',
      ar: 'تغطية سخية للنظارات والعدسات التطورية، وعلاج الأسنان والتركيبات وتقويم أسنان الأطفال.',
    },
  },
  {
    num: '04.',
    id: 'maternite',
    title: {
      fr: 'Maternité, Accouchement & Pédiatrie',
      en: 'Maternity, Childbirth & Pediatrics',
      ar: 'الأمومة والولادة وطب الأطفال',
    },
    description: {
      fr: 'Forfait accouchement par voie basse ou césarienne en clinique privée à Tanger, suivi de grossesse et soins du nouveau-né.',
      en: 'Comprehensive delivery package (natural or C-section) in private Tangier clinics, prenatal visits, and newborn pediatric care.',
      ar: 'باقة ولادة طبيعية أو قيصرية بمصحات طنجة الخاصة، ومتابعة الحمل ورعاية الرضيع.',
    },
  },
  {
    num: '05.',
    id: 'pharmacie-chronique',
    title: {
      fr: 'Pharmacie & Affections Longue Durée (ALD)',
      en: 'Pharmacy & Chronic Illness (ALD)',
      ar: 'الأدوية والأمراض المزمنة وطويلة الأمد',
    },
    description: {
      fr: 'Couverture des médicaments prescrits, prise en charge des traitements chroniques (diabète, hypertension) et soins oncologiques.',
      en: 'Full coverage for prescribed medication, ongoing chronic condition support (diabetes, hypertension), and oncology treatments.',
      ar: 'تغطية الأدوية الموصوفة وعلاجات الأمراض المزمنة (السكري، ضغط الدم) وأمراض الأورام.',
    },
  },
  {
    num: '06.',
    id: 'evacuation-internationale',
    title: {
      fr: 'Assistance & Évacuation Sanitaire Mondiale',
      en: 'Emergency Medical Evacuation & Global Assistance',
      ar: 'المساعدة والإخلاء الطبي الدولي',
    },
    description: {
      fr: 'Rapatriement sanitaire d’urgence, deuxième avis médical international et assistance 24h/7j partout dans le monde.',
      en: 'Emergency medical repatriation, worldwide second medical opinion, and round-the-clock medical assistance abroad.',
      ar: 'ترحيل صحي استعجالي، رأي طبي ثانٍ مع مراكز دولية، ومساعدة طبية على مدار الساعة في جميع أنحاء العالم.',
    },
  },
];

export interface SanteFormulaFeature {
  label: Record<Language, string>;
  essentiel: boolean | Record<Language, string>;
  confort: boolean | Record<Language, string>;
  integrale: boolean | Record<Language, string>;
}

export const SANTE_COMPARISON_ROWS: SanteFormulaFeature[] = [
  {
    label: {
      fr: 'Taux de remboursement consultations (Généraliste & Spécialiste)',
      en: 'Consultation reimbursement rate (GP & Specialists)',
      ar: 'نسبة تعويض الاستشارات الطبية (عام ومتخصص)',
    },
    essentiel: { fr: '80% Base AMO', en: '80% AMO base', ar: '80% قاعدة AMO' },
    confort: { fr: '90% Base AMO', en: '90% AMO base', ar: '90% قاعدة AMO' },
    integrale: { fr: '100% Frais Réels', en: '100% Actual costs', ar: '100% المصاريف الفعلية' },
  },
  {
    label: {
      fr: 'Hospitalisation médicale & chirurgicale en clinique privée',
      en: 'In-patient hospital and surgery stays in private clinics',
      ar: 'الاستشفاء الطبي والجراحي بالمصحات الخاصة',
    },
    essentiel: { fr: '90% Plafond 50k MAD', en: '90% Cap 50k MAD', ar: '90% سقف 50 ألف درهم' },
    confort: { fr: '100% Plafond 150k MAD', en: '100% Cap 150k MAD', ar: '100% سقف 150 ألف درهم' },
    integrale: { fr: '100% Sans plafond', en: '100% Unlimited', ar: '100% بدون سقف' },
  },
  {
    label: {
      fr: 'Tiers Payant hospitalier (sans avance de trésorerie)',
      en: 'Direct billing hospital admission (zero out-of-pocket)',
      ar: 'الثالث المؤدي للاستشفاء (بدون تسبيق مالي)',
    },
    essentiel: true,
    confort: true,
    integrale: true,
  },
  {
    label: {
      fr: 'Forfait Optique annuel (Montures & verres par bénéficiaire)',
      en: 'Annual optical allowance (Frames & lenses per person)',
      ar: 'باقة النظارات والعدسات السنوية للشخص',
    },
    essentiel: { fr: '1 500 MAD', en: '1,500 MAD', ar: '1,500 درهم' },
    confort: { fr: '3 000 MAD', en: '3,000 MAD', ar: '3,000 درهم' },
    integrale: { fr: '5 000 MAD', en: '5,000 MAD', ar: '5,000 درهم' },
  },
  {
    label: {
      fr: 'Soins dentaires, prothèses & orthodontie infantile',
      en: 'Dental care, implants, and pediatric orthodontics',
      ar: 'علاج الأسنان والتركيبات وتقويم أسنان الأطفال',
    },
    essentiel: { fr: '2 500 MAD / an', en: '2,500 MAD / year', ar: '2,500 درهم / سنوياً' },
    confort: { fr: '4 500 MAD / an', en: '4,500 MAD / year', ar: '4,500 درهم / سنوياً' },
    integrale: { fr: '8 000 MAD / an', en: '8,000 MAD / year', ar: '8,000 درهم / سنوياً' },
  },
  {
    label: {
      fr: 'Forfait Maternité & Accouchement clinique',
      en: 'Maternity & private clinic delivery benefit',
      ar: 'باقة الولادة بمصحة خاصة',
    },
    essentiel: { fr: '5 000 MAD', en: '5,000 MAD', ar: '5,000 درهم' },
    confort: { fr: '10 000 MAD', en: '10,000 MAD', ar: '10,000 درهم' },
    integrale: { fr: '18 000 MAD (Césarienne incluse)', en: '18,000 MAD (C-section included)', ar: '18,000 درهم (شاملة القيصرية)' },
  },
  {
    label: {
      fr: 'Évacuation Sanitaire d’urgence & Rapatriement',
      en: 'Emergency medical evacuation & international repatriation',
      ar: 'الإخلاء الطبي الاستعجالي والترحيل الصحي الدولي',
    },
    essentiel: false,
    confort: { fr: 'Maroc entier', en: 'All Morocco', ar: 'المغرب بأكمله' },
    integrale: { fr: 'Monde entier', en: 'Worldwide', ar: 'عالمي' },
  },
  {
    label: {
      fr: 'Chambre individuelle en clinique privée',
      en: 'Private single room in private clinic',
      ar: 'غرفة فردية خاصة بالمصحة',
    },
    essentiel: false,
    confort: true,
    integrale: true,
  },
];

export interface SanteClaimStep {
  num: string;
  title: Record<Language, string>;
  detail: Record<Language, string>;
}

export const SANTE_CLAIMS_STEPS: SanteClaimStep[] = [
  {
    num: '01.',
    title: {
      fr: 'Consultation ou soins médicaux',
      en: 'Medical consultation or treatment',
      ar: 'الاستشارة أو العلاج الطبي',
    },
    detail: {
      fr: 'Consultez votre médecin ou praticien agréé en faisant renseigner la feuille de soins AMO / complémentaire.',
      en: 'Visit your chosen physician and have the standard AMO/supplementary claim sheet stamped and signed.',
      ar: 'قم بزيارة طبيبكم المعتمد وتعبئة ورقة العلاج AMO / التأمين التكميلي مع التوقيع والختم.',
    },
  },
  {
    num: '02.',
    title: {
      fr: 'Dépôt express à l’agence de Tanger ou par voie numérique',
      en: 'Express drop-off at our Tangier agency or online',
      ar: 'إيداع سريع بوكالة طنجة أو عبر القنوات الرقمية',
    },
    detail: {
      fr: 'Déposez votre dossier complet directement à l’agence Avenue Mohammed V ou transmettez-le via l’espace client.',
      en: 'Drop your medical claim directly at our Avenue Mohammed V agency in Tangier or submit scans through the client portal.',
      ar: 'سلّم ملفكم الطبي مباشرة بوكالتنا بشارع محمد الخامس بطنجة أو أرسله عبر فضاء الزبون.',
    },
  },
  {
    num: '03.',
    title: {
      fr: 'Remboursement sur votre compte bancaire sous 48h',
      en: 'Direct bank transfer within 48 hours',
      ar: 'صرف التعويض بحسابكم البنكي خلال 48 ساعة',
    },
    detail: {
      fr: 'Dès validation de la CNSS/AMO, notre cabinet Amekran débloque votre virement complémentaire avec notification SMS.',
      en: 'Upon AMO clearance, our Amekran team issues the top-up bank transfer with instant SMS status notification.',
      ar: 'فور مصادقة AMO/CNSS، يصرف مكتب AMEKRAN التحويل التكميلي لحسابكم مع إشعار فوري عبر الرسائل القصيرة.',
    },
  },
];

export interface SanteFaqItem {
  id: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export const SANTE_FAQS: SanteFaqItem[] = [
  {
    id: 'amo-obligatoire',
    question: {
      fr: 'Faut-il obligatoirement être affilié à la CNSS / AMO pour souscrire ?',
      en: 'Is mandatory AMO/CNSS enrollment required to subscribe?',
      ar: 'هل يجب أن أكون منخرطاً في CNSS / AMO للاكتتاب في التأمين؟',
    },
    answer: {
      fr: 'Nos formules s’adaptent : soit en complément direct (AMC) pour maximiser les remboursements en venant compléter la part AMO, soit au 1er dirham pour les personnes ne disposant pas encore du régime de base.',
      en: 'Our policies are flexible: they work either as a secondary top-up (AMC) to cover the AMO shortfall, or as primary first-dirham health insurance for those without statutory state cover.',
      ar: 'عقودنا مرنة: تعمل إما كتأمين صحي تكميلي (AMC) لتغطية الفارق المتبقي من AMO، أو كتأمين صحي من الدرهم الأول للذين لا يتوفرون على تغطية أساسية.',
    },
  },
  {
    id: 'tiers-payant-tanger',
    question: {
      fr: 'Quelles sont les cliniques partenaires en Tiers Payant à Tanger ?',
      en: 'Which partner clinics in Tangier support direct billing (Tiers Payant)?',
      ar: 'ما هي المصحات الشريكة بنظام الثالث المؤدي بطنجة؟',
    },
    answer: {
      fr: 'Grâce au réseau RMA Assurance, vous bénéficiez du tiers payant dans toutes les principales cliniques privées de Tanger (Clinique Tingis, Hôpital Privé de Tanger, Clinique Al Amal, etc.) ainsi que dans les centres de radiologie et oncologie.',
      en: 'Through the RMA Assurance healthcare network, direct billing is honored across all leading private hospitals and clinics in Tangier (Clinique Tingis, Tangier Private Hospital, Clinique Al Amal) and accredited diagnostic imaging centers.',
      ar: 'بفضل شبكة RMA للتأمين، تستفيدون من الثالث المؤدي في كبرى المصحات الخاصة بطنجة (مصحة تينجيس، المستشفى الخاص بطنجة، مصحة الأمل وغيرها) ومراكز الأشعة والأورام.',
    },
  },
  {
    id: 'delai-carence',
    question: {
      fr: 'Y a-t-il un délai de carence avant de pouvoir utiliser l’assurance ?',
      en: 'Is there a waiting period before benefits become active?',
      ar: 'هل توجد فترة انتظار قبل الاستفادة من التعويضات؟',
    },
    answer: {
      fr: 'Les soins courants, urgences et hospitalisations accidentelles sont pris en charge immédiatement dès la souscription. Un délai conventionnel de 3 à 6 mois s’applique uniquement pour la maternité et certaines prothèses dentaires programmées.',
      en: 'Emergency medical care, accidents, and standard doctor visits are covered immediately on day one. A standard 3 to 6-month waiting period applies only for maternity delivery and scheduled heavy dental prosthetics.',
      ar: 'العلاجات العاجلة والحوادث والاستشارات الطبية مشمولة فوراً منذ اليوم الأول للاشتراك. وتطبق فترة انتظار قياسية من 3 إلى 6 أشهر فقط للولادة وبعض تركيبات الأسنان المبرمجة.',
    },
  },
  {
    id: 'dossier-medical-famille',
    question: {
      fr: 'Puis-je rattacher mes enfants étudiants et mes parents à charge ?',
      en: 'Can I include student children and dependent parents on my policy?',
      ar: 'هل يمكنني إضافة أبنائي الطلبة والوالدين المكفولين في العقد؟',
    },
    answer: {
      fr: 'Oui, les enfants sont couverts jusqu’à 26 ans s’ils poursuivent leurs études supérieures au Maroc ou à l’étranger. Une formule Ascendants dédiée permet également d’intégrer vos parents sous conditions d’âge.',
      en: 'Yes, dependent children remain covered up to age 26 if enrolled in higher education in Morocco or abroad. Dedicated parent riders also allow including elderly dependent parents.',
      ar: 'نعم، يشمل العقد الأبناء حتى سن 26 عاماً في حال متابعة دراساتهم العليا بالمغرب أو بالخارج، مع صيغة خاصة للأصول تتيح إدراج الوالدين المكفولين.',
    },
  },
  {
    id: 'delai-remboursement',
    question: {
      fr: 'Quel est le délai moyen de remboursement des dossiers maladie ?',
      en: 'What is the average turnaround time for medical claims reimbursement?',
      ar: 'ما هو متوسط المدة الزمنية لاسترجاع مصاريف الملفات المرضية؟',
    },
    answer: {
      fr: 'À l’agence Amekran Assurances Tanger, vos dossiers sont traités avec priorité : le virement bancaire intervient généralement sous 48h à 72h ouvrées après confirmation du bordereau avec accusé de réception par SMS.',
      en: 'At the Amekran Assurances Tangier agency, your claims are expedited with local priority: direct bank transfer settlement typically takes 48 to 72 business hours with instant SMS notification.',
      ar: 'في وكالة AMEKRAN بطنجة، تعالج ملفاتكم بأولوية تامة: يتم التحويل البنكي عادة خلال 48 إلى 72 ساعة عمل بعد التأكيد، مع إشعار فوري عبر الرسائل القصيرة.',
    },
  },
];
