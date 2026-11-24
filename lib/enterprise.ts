import type { AmekranLocalized } from './rma.ts';

/**
 * Dedicated content for the enterprise solution pages that used to open a
 * quote modal. Every page presents the cover as a solution placed with AMEKRAN
 * Assurance by AMEKRAN Assurances in Tangier.
 */

export type EnterpriseServiceId =
  | 'entreprises'
  | 'accidents-travail'
  | 'poids-lourds'
  | 'maritime';

export type EnterpriseImageKey = 'business' | 'workplace' | 'trucks' | 'marine';

export type EnterpriseIconKey =
  | 'building'
  | 'shield'
  | 'scale'
  | 'wrench'
  | 'trending'
  | 'truck'
  | 'hardhat'
  | 'heart'
  | 'wallet'
  | 'users'
  | 'file'
  | 'ship'
  | 'container'
  | 'anchor'
  | 'package'
  | 'globe';

export interface EnterpriseCoverage {
  icon: EnterpriseIconKey;
  title: AmekranLocalized;
  body: AmekranLocalized;
}

export interface EnterpriseStep {
  title: AmekranLocalized;
  body: AmekranLocalized;
}

export interface EnterpriseStat {
  value: string;
  label: AmekranLocalized;
}

export interface EnterpriseFaq {
  question: AmekranLocalized;
  answer: AmekranLocalized;
}

export interface EnterpriseService {
  id: EnterpriseServiceId;
  path: string;
  image: EnterpriseImageKey;
  nav: 'entreprises' | 'poids-lourds';
  badge: AmekranLocalized;
  title: AmekranLocalized;
  subtitle: AmekranLocalized;
  headline: AmekranLocalized;
  tagline: AmekranLocalized;
  summary: AmekranLocalized;
  heroPoints: AmekranLocalized[];
  stats: EnterpriseStat[];
  coverages: EnterpriseCoverage[];
  steps: EnterpriseStep[];
  faqs: EnterpriseFaq[];
}

export const ENTERPRISE_SERVICES: Record<
  EnterpriseServiceId,
  EnterpriseService
> = {
  entreprises: {
    id: 'entreprises',
    path: '/assurance-entreprises',
    image: 'business',
    nav: 'entreprises',
    badge: {
      fr: 'Entreprises & Professionnels',
      en: 'Business & Commercial',
      ar: 'الشركات والمهنيون',
    },
    title: {
      fr: 'Assurance Entreprises',
      en: 'Business Insurance',
      ar: 'تأمين الشركات',
    },
    subtitle: {
      fr: 'Multirisque, RC et perte d’exploitation',
      en: 'Multi-risk, liability and business interruption',
      ar: 'متعدد المخاطر والمسؤولية وتوقف النشاط',
    },
    headline: {
      fr: 'Sécurisez l’activité, les locaux et la croissance de votre entreprise.',
      en: 'Protect your operations, premises and growth.',
      ar: 'أمّنوا نشاط شركتكم ومقراتها ونموها.',
    },
    tagline: {
      fr: 'Solutions AMEKRAN sur mesure pour PME, industriels et grands comptes à Tanger.',
      en: 'Tailored AMEKRAN solutions for SMEs, industry and large accounts in Tangier.',
      ar: 'حلول AMEKRAN مصممة للصغرى والمتوسطة والصناعيين والحسابات الكبرى بطنجة.',
    },
    summary: {
      fr: 'De l’atelier au siège social, AMEKRAN structure avec AMEKRAN une protection cohérente : dommages aux biens, responsabilité civile, pertes financières et flottes. Chaque contrat est bâti sur un audit réel de votre activité, de vos sites et de vos valeurs assurées.',
      en: 'From the workshop to head office, AMEKRAN builds a coherent AMEKRAN programme with you: property damage, liability, financial loss and fleets. Every policy starts from a real review of your activity, sites and insured values.',
      ar: 'من الورشة إلى المقر الرئيسي، تبني AMEKRAN مع AMEKRAN برنامج حماية متناسقاً: الأضرار بالممتلكات، المسؤولية المدنية، الخسائر المالية والأساطيل. كل عقد ينطلق من تدقيق فعلي لنشاطكم ومواقعكم وقيمكم المؤمنة.',
    },
    heroPoints: [
      {
        fr: 'Audit des risques et des valeurs assurées par notre agence',
        en: 'Risk and insured-value review by our agency',
        ar: 'تدقيق المخاطر والقيم المؤمنة من طرف وكالتنا',
      },
      {
        fr: 'Contrats AMEKRAN pour locaux, entrepôts, usines et chantiers',
        en: 'AMEKRAN policies for offices, warehouses, plants and sites',
        ar: 'عقود AMEKRAN للمكاتب والمستودعات والمصانع والورشات',
      },
      {
        fr: 'Interlocuteur unique à Tanger pour la vie du contrat',
        en: 'One dedicated contact in Tangier for the policy’s life',
        ar: 'مسؤول واحد بطنجة طوال مدة العقد',
      },
    ],
    stats: [
      {
        value: '360°',
        label: {
          fr: 'Biens, responsabilités et pertes d’exploitation',
          en: 'Property, liability and business interruption',
          ar: 'الممتلكات والمسؤوليات وخسائر النشاط',
        },
      },
      {
        value: '1',
        label: {
          fr: 'Agence AMEKRAN de proximité à Tanger',
          en: 'Local AMEKRAN agency in Tangier',
          ar: 'وكالة AMEKRAN قريبة بطنجة',
        },
      },
      {
        value: '24/7',
        label: {
          fr: 'Assistance AMEKRAN en cas d’urgence',
          en: 'AMEKRAN assistance in an emergency',
          ar: 'مساعدة AMEKRAN في الحالات المستعجلة',
        },
      },
    ],
    coverages: [
      {
        icon: 'building',
        title: {
          fr: 'Multirisque professionnelle',
          en: 'Commercial multi-risk',
          ar: 'التأمين المهني متعدد المخاطر',
        },
        body: {
          fr: 'Incendie, dégâts des eaux, vol, bris de glace et événements catastrophiques pour vos locaux, stocks, mobilier et matériel.',
          en: 'Fire, water damage, theft, glass breakage and catastrophic events for your premises, stock, furniture and equipment.',
          ar: 'الحريق وتسرب المياه والسرقة وكسر الزجاج والأحداث الكارثية لمقراتكم ومخزونكم وأثاثكم ومعداتكم.',
        },
      },
      {
        icon: 'scale',
        title: {
          fr: 'Responsabilité civile exploitation',
          en: 'General liability',
          ar: 'المسؤولية المدنية للنشاط',
        },
        body: {
          fr: 'Dommages corporels, matériels et immatériels causés à des tiers dans le cadre de votre activité, sur site ou lors de déplacements.',
          en: 'Bodily, material and consequential damage caused to third parties through your activity, on site or while travelling.',
          ar: 'الأضرار الجسدية والمادية وغير المادية اللاحقة بالغير بسبب نشاطكم، داخل الموقع أو خارجه.',
        },
      },
      {
        icon: 'shield',
        title: {
          fr: 'RC professionnelle',
          en: 'Professional indemnity',
          ar: 'المسؤولية المهنية',
        },
        body: {
          fr: 'Protection contre les erreurs, omissions et manquements professionnels susceptibles d’engager votre responsabilité.',
          en: 'Protection against professional errors, omissions and failures that could trigger your liability.',
          ar: 'حماية من الأخطاء والإغفالات والتقصيرات المهنية التي قد تُحمّلكم المسؤولية.',
        },
      },
      {
        icon: 'wrench',
        title: {
          fr: 'Bris de machine',
          en: 'Machinery breakdown',
          ar: 'انكسار الآلات',
        },
        body: {
          fr: 'Immobilisation ou détérioration accidentelle de vos équipements de production, avec option de frais de remise en état.',
          en: 'Accidental stoppage or damage to production equipment, with an optional repair-cost extension.',
          ar: 'توقف أو تلف عرضي لمعدات الإنتاج، مع خيار تغطية تكاليف الإصلاح.',
        },
      },
      {
        icon: 'trending',
        title: {
          fr: 'Perte d’exploitation',
          en: 'Business interruption',
          ar: 'خسارة النشاط',
        },
        body: {
          fr: 'Compensation du chiffre d’affaires perdu et des frais supplémentaires engagés après un sinistre couvert.',
          en: 'Compensation for lost turnover and extra costs incurred after a covered claim.',
          ar: 'تعويض رقم المعاملات المفقود والمصاريف الإضافية بعد حادث مشمول.',
        },
      },
      {
        icon: 'truck',
        title: {
          fr: 'Flottes & accidents du travail',
          en: 'Fleets & workplace accidents',
          ar: 'الأساطيل وحوادث الشغل',
        },
        body: {
          fr: 'Véhicules de service, utilitaires et protection des salariés, coordonnés avec les autres contrats AMEKRAN de l’entreprise.',
          en: 'Company cars, utility vehicles and employee protection, coordinated with the company’s other AMEKRAN policies.',
          ar: 'سيارات المصلحة والمركبات النفعية وحماية الأجراء، بتنسيق مع عقود AMEKRAN الأخرى للشركة.',
        },
      },
    ],
    steps: [
      {
        title: {
          fr: 'Audit de l’activité',
          en: 'Review of your activity',
          ar: 'تدقيق النشاط',
        },
        body: {
          fr: 'Visite des sites, recensement des biens, des valeurs et des risques propres à votre métier.',
          en: 'Site visits, inventory of property and values, and mapping of the risks specific to your trade.',
          ar: 'زيارة المواقع وجرد الممتلكات والقيم وتحديد المخاطر الخاصة بمهنتكم.',
        },
      },
      {
        title: {
          fr: 'Cotation AMEKRAN',
          en: 'AMEKRAN quotation',
          ar: 'تسعيرة AMEKRAN',
        },
        body: {
          fr: 'Construction d’un programme AMEKRAN lisible : garanties, plafonds, franchises et priorité des risques.',
          en: 'A clear AMEKRAN programme: cover, limits, deductibles and risk priorities.',
          ar: 'بناء برنامج AMEKRAN واضح: التغطيات والحدود والتحملات وأولويات المخاطر.',
        },
      },
      {
        title: {
          fr: 'Mise en place',
          en: 'Putting cover in place',
          ar: 'تفعيل التغطية',
        },
        body: {
          fr: 'Émission des certificats, attestations et conditions générales remis par l’agence AMEKRAN.',
          en: 'Issue of certificates, cover notes and general conditions by the AMEKRAN agency.',
          ar: 'إصدار الشهادات والوثائق المؤقتة والشروط العامة من وكالة AMEKRAN.',
        },
      },
      {
        title: {
          fr: 'Suivi annuel',
          en: 'Annual review',
          ar: 'متابعة سنوية',
        },
        body: {
          fr: 'Révision des valeurs assurées, des effectifs et des garanties avant chaque renouvellement.',
          en: 'Review of insured values, headcount and cover before every renewal.',
          ar: 'مراجعة القيم المؤمنة والعدد والأجور والتغطيات قبل كل تجديد.',
        },
      },
    ],
    faqs: [
      {
        question: {
          fr: 'Quelles valeurs dois-je déclarer ?',
          en: 'Which values must I declare?',
          ar: 'ما القيم التي يجب التصريح بها؟',
        },
        answer: {
          fr: 'La valeur de remplacement des bâtiments, du mobilier, du matériel et des stocks. Une sous-évaluation peut entraîner une règle proportionnelle en cas de sinistre.',
          en: 'The replacement value of buildings, furniture, equipment and stock. Under-insurance can trigger proportional settlement after a claim.',
          ar: 'قيمة إعادة شراء المباني والأثاث والمعدات والمخزون. التقييم المتدني قد يؤدي إلى تطبيق القاعدة النسبية عند الحادث.',
        },
      },
      {
        question: {
          fr: 'Le contrat couvre-t-il plusieurs sites ?',
          en: 'Does the policy cover several sites?',
          ar: 'هل يغطي العقد عدة مواقع؟',
        },
        answer: {
          fr: 'Oui, chaque site doit être déclaré avec son adresse et ses valeurs. Un site omis ne bénéficie pas automatiquement de la garantie.',
          en: 'Yes, but every site must be declared with its address and values. An omitted site is not automatically covered.',
          ar: 'نعم، لكن يجب التصريح بكل موقع مع عنوانه وقيمه. الموقع غير المصرح به لا يستفيد تلقائياً من التغطية.',
        },
      },
      {
        question: {
          fr: 'Que faire après un dégât des eaux ou un incendie ?',
          en: 'What should I do after water damage or a fire?',
          ar: 'ماذا أفعل بعد تسرب مياه أو حريق؟',
        },
        answer: {
          fr: 'Limitez l’aggravation, photographiez les dommages, conservez les biens endommagés et déclarez le sinistre à l’agence dans les 5 jours. Ne réparez pas avant l’accord de l’expert, sauf urgence.',
          en: 'Limit further damage, photograph the damage, keep damaged property and report the claim to the agency within 5 days. Do not repair before the expert agrees, except in an emergency.',
          ar: 'حدّوا من تفاقم الضرر، صوّروا الأضرار، احتفظوا بالممتلكات المتضررة وصرّحوا بالحادث لدى الوكالة خلال 5 أيام. لا تصلحوا قبل موافقة الخبير إلا في حالة استعجال.',
        },
      },
      {
        question: {
          fr: 'Puis-je assurer une activité nouvellement créée ?',
          en: 'Can I insure a newly created business?',
          ar: 'هل يمكن تأمين نشاط حديث الإنشاء؟',
        },
        answer: {
          fr: 'Oui. Un état prévisionnel, le statut de la société et la description précise de l’activité permettent à AMEKRAN d’étudier le risque et de proposer une couverture adaptée.',
          en: 'Yes. A projected statement, the company’s legal status and a precise description of the activity let AMEKRAN assess the risk and propose suitable cover.',
          ar: 'نعم. تسمح الميزانية التقديرية والنظام القانوني للشركة والوصف الدقيق للنشاط لـ AMEKRAN بدراسة الخطر واقتراح تغطية مناسبة.',
        },
      },
    ],
  },
  'accidents-travail': {
    id: 'accidents-travail',
    path: '/assurance-accidents-travail',
    image: 'workplace',
    nav: 'entreprises',
    badge: {
      fr: 'Accidents du Travail · Loi 18-12',
      en: 'Workplace Accidents · Law 18-12',
      ar: 'حوادث الشغل · القانون 18-12',
    },
    title: {
      fr: 'Assurance Accidents du Travail',
      en: 'Workplace Accident Insurance',
      ar: 'تأمين حوادث الشغل',
    },
    subtitle: {
      fr: 'Protection légale des salariés',
      en: 'Statutory employee protection',
      ar: 'الحماية القانونية للأجراء',
    },
    headline: {
      fr: 'Protégez chaque collaborateur, du chantier au bureau.',
      en: 'Protect every employee, from the site to the office.',
      ar: 'احموا كل موظف، من الورشة إلى المكتب.',
    },
    tagline: {
      fr: 'Conformité, prise en charge rapide et accompagnement RH avec AMEKRAN.',
      en: 'Compliance, fast care and HR support with AMEKRAN.',
      ar: 'امتثال وتكفل سريع ومواكبة للموارد البشرية مع AMEKRAN.',
    },
    summary: {
      fr: 'L’assurance accidents du travail est une obligation légale pour tout employeur. AMEKRAN met en place le contrat AMEKRAN, vérifie les effectifs et accompagne les déclarations, afin que chaque salarié blessé soit soigné et indemnisé dans les délais.',
      en: 'Workplace accident insurance is a legal duty for every employer. AMEKRAN arranges the AMEKRAN policy, checks headcounts and supports declarations so every injured employee is treated and compensated on time.',
      ar: 'تأمين حوادث الشغل التزام قانوني على كل رب عمل. تتولى AMEKRAN إعداد عقد AMEKRAN والتحقق من الأعداد ومواكبة التصريحات، ليُعالج كل أجير مصاب ويُعوّض في الآجال.',
    },
    heroPoints: [
      {
        fr: 'Conformité à la loi 18-12 et au Code des assurances',
        en: 'Compliant with Law 18-12 and the Insurance Code',
        ar: 'مطابق للقانون 18-12 ومدونة التأمينات',
      },
      {
        fr: 'Prise en charge médicale et hospitalière des victimes',
        en: 'Medical and hospital care for injured staff',
        ar: 'تكفل طبي واستشفائي بالمصابين',
      },
      {
        fr: 'Service AT AMEKRAN joignable au 05 22 26 26 36',
        en: 'AMEKRAN workplace accident service on 05 22 26 26 36',
        ar: 'خدمة حوادث الشغل AMEKRAN على 05 22 26 26 36',
      },
    ],
    stats: [
      {
        value: '48h',
        label: {
          fr: 'Délai légal de déclaration de l’accident',
          en: 'Statutory claim declaration window',
          ar: 'أجل التصريح القانوني بالحادث',
        },
      },
      {
        value: '100%',
        label: {
          fr: 'Des salariés déclarés couverts',
          en: 'Of declared employees covered',
          ar: 'من الأجراء المصرح بهم مغطون',
        },
      },
      {
        value: '1',
        label: {
          fr: 'Interlocuteur AMEKRAN dédié aux RH',
          en: 'Dedicated AMEKRAN contact for HR',
          ar: 'مسؤول AMEKRAN مخصص للموارد البشرية',
        },
      },
    ],
    coverages: [
      {
        icon: 'heart',
        title: {
          fr: 'Soins médicaux et hospitalisation',
          en: 'Medical care and hospitalisation',
          ar: 'العلاج الطبي والاستشفاء',
        },
        body: {
          fr: 'Prise en charge des soins, médicaments, analyses, chirurgie et frais d’hospitalisation consécutifs à l’accident.',
          en: 'Cover for care, medicines, tests, surgery and hospital costs resulting from the accident.',
          ar: 'تغطية العلاج والأدوية والتحاليل والجراحة ومصاريف الاستشفاء الناتجة عن الحادث.',
        },
      },
      {
        icon: 'wallet',
        title: {
          fr: 'Indemnités journalières',
          en: 'Daily allowances',
          ar: 'التعويضات اليومية',
        },
        body: {
          fr: 'Compensation du salaire pendant l’arrêt de travail prescrit, selon le salaire déclaré et les conditions légales.',
          en: 'Income compensation during the prescribed sick leave, based on the declared salary and statutory conditions.',
          ar: 'تعويض الأجر خلال فترة التوقف عن العمل الموصوفة، حسب الأجر المصرح به والشروط القانونية.',
        },
      },
      {
        icon: 'shield',
        title: {
          fr: 'Incapacité permanente',
          en: 'Permanent disability',
          ar: 'العجز الدائم',
        },
        body: {
          fr: 'Rente ou capital en cas d’incapacité permanente partielle ou totale, calculé sur le barème légal et le salaire de référence.',
          en: 'Annuity or lump sum for partial or total permanent disability, calculated on the statutory scale and reference salary.',
          ar: 'ريع أو رأس مال في حالة العجز الدائم الجزئي أو الكلي، حسب السلم القانوني والأجر المرجعي.',
        },
      },
      {
        icon: 'users',
        title: {
          fr: 'Capital décès',
          en: 'Death benefit',
          ar: 'رأس مال الوفاة',
        },
        body: {
          fr: 'Versement aux ayants droit selon les règles légales, avec accompagnement de l’employeur et de la famille.',
          en: 'Payment to beneficiaries under statutory rules, with support for the employer and the family.',
          ar: 'الدفع للمستحقين وفق القواعد القانونية، مع مواكبة رب العمل والأسرة.',
        },
      },
      {
        icon: 'file',
        title: {
          fr: 'Accompagnement des déclarations',
          en: 'Declaration support',
          ar: 'مواكبة التصريحات',
        },
        body: {
          fr: 'Aide au dossier : déclaration, certificat médical initial, bulletins de soins et échanges avec AMEKRAN.',
          en: 'File support: declaration, initial medical certificate, treatment records and exchanges with AMEKRAN.',
          ar: 'مساعدة في الملف: التصريح والشهادة الطبية الأولية ووصفات العلاج والمراسلات مع AMEKRAN.',
        },
      },
      {
        icon: 'hardhat',
        title: {
          fr: 'Prévention des risques',
          en: 'Risk prevention',
          ar: 'الوقاية من المخاطر',
        },
        body: {
          fr: 'Recommandations concrètes pour réduire les chutes, les accidents de manutention et les risques de chantier.',
          en: 'Practical recommendations to reduce falls, handling accidents and site risks.',
          ar: 'توصيات عملية للحد من السقوط وحوادث المناولة ومخاطر الورشات.',
        },
      },
    ],
    steps: [
      {
        title: {
          fr: 'Déclarez vos effectifs',
          en: 'Declare your headcount',
          ar: 'صرّحوا بأعدادكم',
        },
        body: {
          fr: 'Salariés, catégories professionnelles et salaires réels : la base du contrat et du calcul de la cotisation.',
          en: 'Employees, job categories and actual salaries: the basis of the policy and the contribution.',
          ar: 'الأجراء والفئات المهنية والأجور الحقيقية: أساس العقد وحساب المساهمة.',
        },
      },
      {
        title: {
          fr: 'Un accident survient',
          en: 'An accident happens',
          ar: 'وقوع حادث',
        },
        body: {
          fr: 'Faites prévenir immédiatement l’employeur et diriger la victime vers les soins. Conservez les témoignages et les constats.',
          en: 'Inform the employer immediately and get the victim to care. Keep witness statements and reports.',
          ar: 'أخبروا رب العمل فوراً ووجّهوا المصاب إلى العلاج. احتفظوا بالإفادات والمحاضر.',
        },
      },
      {
        title: {
          fr: 'Déclaration sous 48h',
          en: 'Declare within 48 hours',
          ar: 'التصريح خلال 48 ساعة',
        },
        body: {
          fr: 'L’employeur déclare à la CNSS et à AMEKRAN. Notre agence vérifie le dossier et transmet les pièces utiles.',
          en: 'The employer declares to the CNSS and AMEKRAN. Our agency checks the file and forwards the relevant documents.',
          ar: 'يصرّح رب العمل لدى CNSS وAMEKRAN. تتحقق وكالتنا من الملف وتحيل الوثائق اللازمة.',
        },
      },
      {
        title: {
          fr: 'Suivi jusqu’à la reprise',
          en: 'Support until return to work',
          ar: 'المتابعة إلى حين استئناف العمل',
        },
        body: {
          fr: 'Suivi médical, indemnisation et accompagnement de la reprise ou de la reconnaissance d’invalidité.',
          en: 'Medical follow-up, compensation and support for return to work or recognition of disability.',
          ar: 'متابعة طبية وتعويض ومواكبة استئناف العمل أو الاعتراف بالعجز.',
        },
      },
    ],
    faqs: [
      {
        question: {
          fr: 'L’assurance accidents du travail est-elle obligatoire ?',
          en: 'Is workplace accident insurance compulsory?',
          ar: 'هل تأمين حوادث الشغل إجباري؟',
        },
        answer: {
          fr: 'Oui. Tout employeur doit couvrir ses salariés contre les accidents du travail conformément à la loi 18-12. L’absence de couverture expose l’employeur à supporter directement les conséquences financières.',
          en: 'Yes. Every employer must cover employees against workplace accidents under Law 18-12. Without cover, the employer bears the financial consequences directly.',
          ar: 'نعم. على كل رب عمل تغطية أجرائه ضد حوادث الشغل وفق القانون 18-12. غياب التغطية يعرّض رب العمل لتحمل الآثار المالية مباشرة.',
        },
      },
      {
        question: {
          fr: 'Quel est le délai de déclaration ?',
          en: 'What is the declaration deadline?',
          ar: 'ما هو أجل التصريح؟',
        },
        answer: {
          fr: 'L’employeur dispose de 48 heures pour déclarer l’accident à la CNSS et à l’assureur. Plus la déclaration est rapide, plus la prise en charge est fluide.',
          en: 'The employer has 48 hours to declare the accident to the CNSS and the insurer. The faster the declaration, the smoother the care.',
          ar: 'لرب العمل 48 ساعة للتصريح بالحادث لدى CNSS والمؤمّن. كلما كان التصريح أسرع كان التكفل أيسر.',
        },
      },
      {
        question: {
          fr: 'Les intérimaires et sous-traitants sont-ils couverts ?',
          en: 'Are temporary and subcontracted staff covered?',
          ar: 'هل الأجراء المؤقتون والمتعاقدون من الباطن مغطون؟',
        },
        answer: {
          fr: 'Chaque employeur doit déclarer les personnes qu’il emploie. Les intérimaires relèvent en principe de l’entreprise de travail temporaire ; les sous-traitants doivent justifier de leur propre couverture.',
          en: 'Each employer must declare the people it employs. Temporary staff normally fall under the temp agency; subcontractors must evidence their own cover.',
          ar: 'على كل رب عمل التصريح بالأشخاص الذين يستخدمهم. الأجراء المؤقتون يخضعون مبدئياً لوكالة العمل المؤقت، وعلى المتعاقدين من الباطن إثبات تغطيتهم الخاصة.',
        },
      },
      {
        question: {
          fr: 'La cotisation dépend-elle du risque ?',
          en: 'Does the contribution depend on risk?',
          ar: 'هل تعتمد المساهمة على الخطر؟',
        },
        answer: {
          fr: 'Oui : effectif, métiers, salaires et historique d’accidents déterminent le taux appliqué. Un suivi de prévention peut améliorer la sinistralité dans la durée.',
          en: 'Yes: headcount, trades, salaries and claims history set the rate. Consistent prevention can improve claims experience over time.',
          ar: 'نعم: العدد والمهن والأجور وسجل الحوادث تحدد النسبة المطبقة. المتابعة الوقائية يمكن أن تحسّن نسبة الحوادث مع الوقت.',
        },
      },
    ],
  },
  'poids-lourds': {
    id: 'poids-lourds',
    path: '/assurance-poids-lourds',
    image: 'trucks',
    nav: 'poids-lourds',
    badge: {
      fr: 'Poids lourds & Flottes',
      en: 'Heavy Trucks & Fleets',
      ar: 'الشاحنات الثقيلة والأساطيل',
    },
    title: {
      fr: 'Assurance Poids Lourds & Flottes',
      en: 'Heavy Truck & Fleet Insurance',
      ar: 'تأمين الشاحنات الثقيلة والأساطيل',
    },
    subtitle: {
      fr: 'Transport routier & Tanger Med',
      en: 'Road transport & Tanger Med',
      ar: 'النقل الطرقي وطنجة المتوسط',
    },
    headline: {
      fr: 'La référence de l’assurance Poids Lourds & Flottes à Tanger.',
      en: 'The benchmark for heavy truck and fleet cover in Tangier.',
      ar: 'المرجع في تأمين الشاحنات الثقيلة والأساطيل بطنجة.',
    },
    tagline: {
      fr: 'Des solutions performantes pour les transporteurs et les grandes flottes.',
      en: 'High-performance solutions for hauliers and large fleets.',
      ar: 'حلول عالية الأداء لناقلي البضائع والأساطيل الكبرى.',
    },
    summary: {
      fr: 'Tracteurs, remorques, porteurs et flottes TIR : AMEKRAN construit avec AMEKRAN un contrat lisible pour votre exploitation, avec Carte Verte internationale, extensions géographiques et gestion prioritaire des sinistres au départ de Tanger Med.',
      en: 'Tractors, trailers, rigids and TIR fleets: AMEKRAN builds a clear AMEKRAN policy for your operation, with an international Green Card, territorial extensions and priority claims handling out of Tanger Med.',
      ar: 'الجرارات والمقطورات والشاحنات وأساطيل TIR: تبني AMEKRAN مع AMEKRAN عقداً واضحاً لاستغلالكم، مع البطاقة الخضراء الدولية والامتدادات الجغرافية ومعالجة أولوية للحوادث انطلاقاً من طنجة المتوسط.',
    },
    heroPoints: [
      {
        fr: 'Carte Verte et extensions Europe / Maghreb',
        en: 'Green Card and Europe / Maghreb extensions',
        ar: 'البطاقة الخضراء وامتدادات أوروبا / المغرب العربي',
      },
      {
        fr: 'Remise flotte multi-véhicules et suivi dédié',
        en: 'Multi-vehicle fleet discount and dedicated follow-up',
        ar: 'خصم الأساطيل متعددة المركبات ومتابعة مخصصة',
      },
      {
        fr: 'Couverture marchandises et immobilisation en option',
        en: 'Optional cargo and downtime cover',
        ar: 'تغطية البضائع وتوقف النشاط كخيار',
      },
    ],
    stats: [
      {
        value: 'TIR',
        label: {
          fr: 'Flottes internationales au départ de Tanger Med',
          en: 'International fleets out of Tanger Med',
          ar: 'أساطيل دولية انطلاقاً من طنجة المتوسط',
        },
      },
      {
        value: '24/7',
        label: {
          fr: 'Assistance AMEKRAN pour vos véhicules',
          en: 'AMEKRAN assistance for your vehicles',
          ar: 'مساعدة AMEKRAN لمركباتكم',
        },
      },
      {
        value: '1',
        label: {
          fr: 'Gestionnaire de flotte à l’agence',
          en: 'Fleet manager at the agency',
          ar: 'مسير أسطول بالوكالة',
        },
      },
    ],
    coverages: [
      {
        icon: 'truck',
        title: {
          fr: 'Responsabilité civile circulation',
          en: 'Motor third-party liability',
          ar: 'المسؤولية المدنية للسير',
        },
        body: {
          fr: 'Couverture obligatoire des dommages corporels et matériels causés aux tiers par chaque véhicule de la flotte.',
          en: 'Compulsory cover for bodily and material damage caused to third parties by each fleet vehicle.',
          ar: 'تغطية إجبارية للأضرار الجسدية والمادية اللاحقة بالغير من طرف كل مركبة في الأسطول.',
        },
      },
      {
        icon: 'shield',
        title: {
          fr: 'Dommages tous risques',
          en: 'All-risks own damage',
          ar: 'الأضرار الشاملة',
        },
        body: {
          fr: 'Collision, versement, incendie, vol et catastrophes naturelles pour le tracteur, le porteur ou la remorque.',
          en: 'Collision, overturning, fire, theft and natural disasters for the tractor, rigid truck or trailer.',
          ar: 'التصادم والانقلاب والحريق والسرقة والكوارث الطبيعية للجرار أو الشاحنة أو المقطورة.',
        },
      },
      {
        icon: 'package',
        title: {
          fr: 'Marchandises transportées',
          en: 'Transported cargo',
          ar: 'البضائع المنقولة',
        },
        body: {
          fr: 'Garantie des facultés pour les marchandises dont vous avez la garde, selon les clauses et plafonds du contrat.',
          en: 'Cargo cover for goods in your custody, subject to the clauses and limits of the policy.',
          ar: 'تغطية البضائع التي في حيازتكم، وفق بنود وحدود العقد.',
        },
      },
      {
        icon: 'globe',
        title: {
          fr: 'Carte Verte internationale',
          en: 'International Green Card',
          ar: 'البطاقة الخضراء الدولية',
        },
        body: {
          fr: 'Extension géographique pour circuler en Europe et au Maghreb, délivrée avant le départ et valable pour la durée déclarée.',
          en: 'Territorial extension to drive in Europe and the Maghreb, issued before departure for the declared period.',
          ar: 'امتداد جغرافي للتنقل في أوروبا والمغرب العربي، يُسلّم قبل الانطلاق ويصلح للمدة المصرح بها.',
        },
      },
      {
        icon: 'wrench',
        title: {
          fr: 'Immobilisation & remplacement',
          en: 'Downtime & replacement',
          ar: 'التوقف والاستبدال',
        },
        body: {
          fr: 'Options de frais d’immobilisation et de véhicule de remplacement pour maintenir votre exploitation.',
          en: 'Optional downtime costs and replacement vehicle to keep your operation running.',
          ar: 'خيارات مصاريف التوقف ومركبة بديلة للحفاظ على استغلالكم.',
        },
      },
      {
        icon: 'file',
        title: {
          fr: 'Gestion prioritaire des sinistres',
          en: 'Priority claims handling',
          ar: 'معالجة أولوية للحوادث',
        },
        body: {
          fr: 'Constat, expertise et suivi centralisés par l’agence, avec un interlocuteur unique pour toute la flotte.',
          en: 'Reports, expertise and follow-up centralised at the agency, with one contact for the whole fleet.',
          ar: 'المحاضر والخبرة والمتابعة مركزياً بالوكالة، مع مسؤول واحد لكل الأسطول.',
        },
      },
    ],
    steps: [
      {
        title: {
          fr: 'Liste de flotte',
          en: 'Fleet schedule',
          ar: 'لائحة الأسطول',
        },
        body: {
          fr: 'Immatriculations, genres, PTAC, tracteurs et remorques : chaque véhicule doit être identifié séparément.',
          en: 'Registrations, categories, GVW, tractors and trailers: each vehicle must be identified separately.',
          ar: 'الترقيم والأنواع والوزن الإجمالي والجرارات والمقطورات: يجب تحديد كل مركبة على حدة.',
        },
      },
      {
        title: {
          fr: 'Cotation & garanties',
          en: 'Quotation & cover',
          ar: 'التسعيرة والتغطيات',
        },
        body: {
          fr: 'Choix des garanties par véhicule ou par catégorie, franchises et extension géographique.',
          en: 'Cover selected per vehicle or category, with deductibles and territorial extension.',
          ar: 'اختيار التغطيات لكل مركبة أو فئة، مع التحملات والامتداد الجغرافي.',
        },
      },
      {
        title: {
          fr: 'Cartes & attestations',
          en: 'Cards & certificates',
          ar: 'البطاقات والشهادات',
        },
        body: {
          fr: 'Remise des attestations, vignettes et Cartes Vertes avant la mise en circulation.',
          en: 'Delivery of certificates, discs and Green Cards before the vehicles go on the road.',
          ar: 'تسليم الشهادات والملصقات والبطاقات الخضراء قبل بدء السير.',
        },
      },
      {
        title: {
          fr: 'Suivi de flotte',
          en: 'Fleet follow-up',
          ar: 'متابعة الأسطول',
        },
        body: {
          fr: 'Ajouts, retraits, renouvellements et sinistres traités en un point unique à Tanger.',
          en: 'Additions, removals, renewals and claims handled at a single point in Tangier.',
          ar: 'الإضافات والسحوبات والتجديدات والحوادث تُعالج في نقطة واحدة بطنجة.',
        },
      },
    ],
    faqs: [
      {
        question: {
          fr: 'Les remorques doivent-elles être assurées séparément ?',
          en: 'Do trailers need separate cover?',
          ar: 'هل تحتاج المقطورات إلى تأمين منفصل؟',
        },
        answer: {
          fr: 'Oui, chaque remorque doit figurer au contrat avec son immatriculation et sa valeur. Une remorque non déclarée peut ne pas être couverte.',
          en: 'Yes, every trailer must appear in the policy with its registration and value. An undeclared trailer may not be covered.',
          ar: 'نعم، يجب إدراج كل مقطورة في العقد مع ترقيمها وقيمتها. المقطورة غير المصرح بها قد لا تكون مغطاة.',
        },
      },
      {
        question: {
          fr: 'Puis-je ajouter un véhicule en cours d’année ?',
          en: 'Can I add a vehicle during the year?',
          ar: 'هل يمكن إضافة مركبة خلال السنة؟',
        },
        answer: {
          fr: 'Oui, l’ajout se fait par avenant avant la mise en circulation. Communiquez la carte grise, le genre et l’usage réel du véhicule.',
          en: 'Yes, via an endorsement before the vehicle is used. Provide the registration card, category and actual use.',
          ar: 'نعم، عبر ملحق قبل بدء الاستعمال. قدموا البطاقة الرمادية ونوع المركبة واستعمالها الفعلي.',
        },
      },
      {
        question: {
          fr: 'La Carte Verte est-elle incluse ?',
          en: 'Is the Green Card included?',
          ar: 'هل البطاقة الخضراء مشمولة؟',
        },
        answer: {
          fr: 'Elle est délivrée selon les conditions du contrat et la durée du déplacement hors Maroc. Vérifiez les pays couverts avant chaque départ.',
          en: 'It is issued under the policy terms and the duration of the trip outside Morocco. Check the covered countries before every departure.',
          ar: 'تُسلّم وفق شروط العقد ومدة السفر خارج المغرب. تحققوا من البلدان المغطاة قبل كل انطلاق.',
        },
      },
      {
        question: {
          fr: 'Comment déclarer un accident à Tanger Med ?',
          en: 'How do I report an accident at Tanger Med?',
          ar: 'كيف أصرح بحادث بطنجة المتوسط؟',
        },
        answer: {
          fr: 'Sécurisez la zone, remplissez un constat amiable, photographiez les véhicules et appelez l’agence dans les 5 jours. Pour un dommage aux marchandises, faites des réserves écrites auprès du transporteur.',
          en: 'Secure the area, complete an accident report, photograph the vehicles and call the agency within 5 days. For cargo damage, issue written reservations to the carrier.',
          ar: 'أمّنوا المنطقة، املأوا محضراً ودياً، صوّروا المركبات واتصلوا بالوكالة خلال 5 أيام. في أضرار البضائع، سجلوا تحفظات كتابية لدى الناقل.',
        },
      },
    ],
  },
  maritime: {
    id: 'maritime',
    path: '/assurance-maritime',
    image: 'marine',
    nav: 'entreprises',
    badge: {
      fr: 'Assurance Maritime',
      en: 'Marine Insurance',
      ar: 'التأمين البحري',
    },
    title: {
      fr: 'Assurance Maritime & Transport',
      en: 'Marine & Cargo Insurance',
      ar: 'التأمين البحري والنقل',
    },
    subtitle: {
      fr: 'Marchandises, corps et responsabilités',
      en: 'Cargo, hull and liabilities',
      ar: 'البضائع والهياكل والمسؤوليات',
    },
    headline: {
      fr: 'Sécurisez vos cargaisons et expéditions via Tanger Med.',
      en: 'Protect your cargo and shipments through Tanger Med.',
      ar: 'أمّنوا شحناتكم وبضائعكم عبر طنجة المتوسط.',
    },
    tagline: {
      fr: 'Import-export, transit et avaries : l’expertise AMEKRAN au service de vos flux.',
      en: 'Import-export, transit and cargo damage: AMEKRAN expertise for your flows.',
      ar: 'الاستيراد والتصدير والعبور وأضرار البضائع: خبرة AMEKRAN في خدمة تدفقاتكم.',
    },
    summary: {
      fr: 'Conteneurs, vrac, marchandises diverses et corps de navire : AMEKRAN structure avec AMEKRAN une couverture maritime adaptée à vos trajets, de l’embarquement à la livraison, avec un appui local pour les avaries à Tanger Med.',
      en: 'Containers, bulk, general cargo and hulls: AMEKRAN structures AMEKRAN marine cover around your routes, from loading to delivery, with local support for cargo damage at Tanger Med.',
      ar: 'الحاويات والبضائع السائبة والمتنوعة وهياكل السفن: تبني AMEKRAN مع AMEKRAN تغطية بحرية ملائمة لمساراتكم، من الشحن إلى التسليم، بدعم محلي لأضرار البضائع بطنجة المتوسط.',
    },
    heroPoints: [
      {
        fr: 'Garanties facultés tous risques (clauses A, B ou C)',
        en: 'All-risks cargo cover (A, B or C clauses)',
        ar: 'تغطية البضائع الشاملة (البنود A أو B أو C)',
      },
      {
        fr: 'Corps de navire, machines et responsabilités maritimes',
        en: 'Hull, machinery and maritime liabilities',
        ar: 'هياكل السفن والآلات والمسؤوليات البحرية',
      },
      {
        fr: 'Appui local pour constats et avaries à Tanger Med',
        en: 'Local support for surveys and damage at Tanger Med',
        ar: 'دعم محلي للمعاينة والأضرار بطنجة المتوسط',
      },
    ],
    stats: [
      {
        value: 'A/B/C',
        label: {
          fr: 'Clauses facultés selon le niveau de garantie',
          en: 'Cargo clauses matched to the cover level',
          ar: 'بنود البضائع حسب مستوى التغطية',
        },
      },
      {
        value: '24h',
        label: {
          fr: 'Pour signaler une avarie ou un vol',
          en: 'To report damage or theft',
          ar: 'للإبلاغ عن ضرر أو سرقة',
        },
      },
      {
        value: '1',
        label: {
          fr: 'Point de contact à Tanger pour vos dossiers',
          en: 'Tangier contact point for your files',
          ar: 'نقطة اتصال بطنجة لملفاتكم',
        },
      },
    ],
    coverages: [
      {
        icon: 'package',
        title: {
          fr: 'Facultés tous risques',
          en: 'All-risks cargo',
          ar: 'البضائع بجميع المخاطر',
        },
        body: {
          fr: 'Marchandises transportées par mer, air ou terre, avec choix de clauses A, B ou C selon la nature du fret et le trajet.',
          en: 'Goods carried by sea, air or land, with A, B or C clauses chosen according to the cargo and route.',
          ar: 'البضائع المنقولة بحراً أو جواً أو براً، مع اختيار البنود A أو B أو C حسب طبيعة الشحن والمسار.',
        },
      },
      {
        icon: 'ship',
        title: {
          fr: 'Corps de navire',
          en: 'Hull cover',
          ar: 'تغطية هيكل السفينة',
        },
        body: {
          fr: 'Dommages matériels au navire, à ses machines et à ses équipements, selon la valeur agréée au contrat.',
          en: 'Physical damage to the vessel, its machinery and equipment, based on the value agreed in the policy.',
          ar: 'الأضرار المادية بالسفينة وآلاتها ومعداتها، حسب القيمة المتفق عليها في العقد.',
        },
      },
      {
        icon: 'scale',
        title: {
          fr: 'Responsabilités maritimes',
          en: 'Maritime liabilities',
          ar: 'المسؤوليات البحرية',
        },
        body: {
          fr: 'Responsabilité civile de l’armateur ou du transporteur pour les dommages causés aux tiers et aux marchandises.',
          en: 'Shipowner or carrier liability for damage caused to third parties and to cargo.',
          ar: 'المسؤولية المدنية للمجهز أو الناقل عن الأضرار اللاحقة بالغير وبالبضائع.',
        },
      },
      {
        icon: 'anchor',
        title: {
          fr: 'Avaries communes & sauvetage',
          en: 'General average & salvage',
          ar: 'الخسائر المشتركة والإنقاذ',
        },
        body: {
          fr: 'Prise en charge de la contribution d’avarie commune et des frais de sauvetage lorsque les conditions du contrat sont réunies.',
          en: 'Cover for general average contribution and salvage costs where the policy conditions are met.',
          ar: 'تغطية مساهمة الخسائر المشتركة ومصاريف الإنقاذ عند تحقق شروط العقد.',
        },
      },
      {
        icon: 'container',
        title: {
          fr: 'Conteneurs & transit',
          en: 'Containers & transit',
          ar: 'الحاويات والعبور',
        },
        body: {
          fr: 'Couverture des marchandises conteneurisées et des opérations de transit, y compris les ruptures de charge portuaires.',
          en: 'Cover for containerised goods and transit operations, including port transhipment.',
          ar: 'تغطية البضائع في الحاويات وعمليات العبور، بما في ذلك إعادة الشحن بالموانئ.',
        },
      },
      {
        icon: 'file',
        title: {
          fr: 'Gestion des avaries',
          en: 'Cargo claims handling',
          ar: 'معالجة أضرار البضائع',
        },
        body: {
          fr: 'Assistance pour les réserves, constats, expertise et constitution du dossier de réclamation.',
          en: 'Support with reservations, surveys, expertise and building the claim file.',
          ar: 'مساعدة في التحفظات والمعاينات والخبرة وتكوين ملف المطالبة.',
        },
      },
    ],
    steps: [
      {
        title: {
          fr: 'Décrivez l’expédition',
          en: 'Describe the shipment',
          ar: 'وصفوا الشحنة',
        },
        body: {
          fr: 'Nature de la marchandise, emballage, valeur, itinéraire, moyen de transport et Incoterm.',
          en: 'Cargo nature, packaging, value, route, mode of transport and Incoterm.',
          ar: 'طبيعة البضاعة والتغليف والقيمة والمسار ووسيلة النقل وشرط التسليم Incoterm.',
        },
      },
      {
        title: {
          fr: 'Choisissez la garantie',
          en: 'Choose the cover',
          ar: 'اختاروا التغطية',
        },
        body: {
          fr: 'Clause A, B ou C, plafond par expédition ou contrat d’abonnement pour les flux récurrents.',
          en: 'Clause A, B or C, a limit per shipment or an open cover for recurring flows.',
          ar: 'البند A أو B أو C، وحد أقصى لكل شحنة أو عقد اشتراك للتدفقات المتكررة.',
        },
      },
      {
        title: {
          fr: 'Émettez les documents',
          en: 'Issue the documents',
          ar: 'أصدروا الوثائق',
        },
        body: {
          fr: 'Certificat d’assurance, connaissement, facture commerciale et liste de colisage.',
          en: 'Insurance certificate, bill of lading, commercial invoice and packing list.',
          ar: 'شهادة التأمين وسند الشحن والفاتورة التجارية وقائمة التعبئة.',
        },
      },
      {
        title: {
          fr: 'En cas d’avarie',
          en: 'If damage occurs',
          ar: 'في حالة الضرر',
        },
        body: {
          fr: 'Constat avant déchargement, réserves écrites au transporteur, photos et déclaration à l’agence.',
          en: 'Survey before unloading, written reservations to the carrier, photographs and declaration to the agency.',
          ar: 'معاينة قبل التفريغ، تحفظات كتابية للناقل، صور وتصريح للوكالة.',
        },
      },
    ],
    faqs: [
      {
        question: {
          fr: 'Quelle clause choisir : A, B ou C ?',
          en: 'Which clause should I choose: A, B or C?',
          ar: 'أي بند أختار: A أم B أم C؟',
        },
        answer: {
          fr: 'La clause A est la plus large (tous risques). Les clauses B et C couvrent un nombre limité de risques et sont moins coûteuses. Le choix dépend de la valeur, de l’emballage et du trajet.',
          en: 'Clause A is the widest (all risks). Clauses B and C cover a limited list of perils and cost less. The choice depends on value, packaging and route.',
          ar: 'البند A هو الأوسع (جميع المخاطر). البندان B وC يغطيان عدداً محدوداً من المخاطر وبكلفة أقل. الاختيار يعتمد على القيمة والتغليف والمسار.',
        },
      },
      {
        question: {
          fr: 'Que faire si la marchandise arrive endommagée ?',
          en: 'What if the cargo arrives damaged?',
          ar: 'ماذا أفعل إذا وصلت البضاعة متضررة؟',
        },
        answer: {
          fr: 'Ne déchargez pas sans constat, émettez des réserves écrites et précises sur le document de transport, photographiez l’état des colis et contactez l’agence dans les 24 heures.',
          en: 'Do not unload without a survey, issue precise written reservations on the transport document, photograph the parcels and contact the agency within 24 hours.',
          ar: 'لا تفرغوا دون معاينة، سجلوا تحفظات كتابية دقيقة على وثيقة النقل، صوّروا حالة الطرود واتصلوا بالوكالة خلال 24 ساعة.',
        },
      },
      {
        question: {
          fr: 'Couvrez-vous les expéditions via Tanger Med ?',
          en: 'Do you cover shipments through Tanger Med?',
          ar: 'هل تغطون الشحنات عبر طنجة المتوسط؟',
        },
        answer: {
          fr: 'Oui, les flux import-export et le transit par Tanger Med peuvent être assurés. Précisez le port de départ, de transbordement et de destination finale.',
          en: 'Yes, import-export flows and transit through Tanger Med can be insured. State the departure, transhipment and final destination ports.',
          ar: 'نعم، يمكن تأمين تدفقات الاستيراد والتصدير والعبور عبر طنجة المتوسط. حددوا ميناء الانطلاق وإعادة الشحن والوصول النهائي.',
        },
      },
      {
        question: {
          fr: 'Le contenu des conteneurs est-il couvert ?',
          en: 'Is the contents of containers covered?',
          ar: 'هل محتوى الحاويات مغطى؟',
        },
        answer: {
          fr: 'Oui si les marchandises sont déclarées et la valeur assurée. Les emballages inadaptés, le vice propre et les retards peuvent être exclus selon les conditions.',
          en: 'Yes, if the goods are declared and the value insured. Unsuitable packaging, inherent vice and delays may be excluded under the conditions.',
          ar: 'نعم إذا كانت البضائع مصرحاً بها وقيمتها مؤمنة. قد تُستثنى التغليفات غير الملائمة والعيب الذاتي والتأخير حسب الشروط.',
        },
      },
    ],
  },
};

export const ENTERPRISE_SERVICE_LIST = Object.values(ENTERPRISE_SERVICES);
