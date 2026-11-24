/**
 * AMEKRAN Assurances — insurer in Tangier.
 *
 * The offers below mirror the product families published by AMEKRAN Assurances
 * (Automobile, Moto, Habitation, Santé & Prévoyance, Épargne, Loisirs) and
 * the claim/underwriting rules that apply to them. Wording is our own; the
 * contractual reference remains AMEKRAN's conditions générales.
 */

export const AMEKRAN_PHONE = '0661508925';

export interface AmekranLocalized {
  fr: string;
  en: string;
  ar: string;
}

export type AmekranOfferIcon =
  | 'car'
  | 'bike'
  | 'home'
  | 'heart'
  | 'savings'
  | 'leisure';

export interface AmekranOffer {
  id: string;
  icon: AmekranOfferIcon;
  title: AmekranLocalized;
  tagline: AmekranLocalized;
  highlights: AmekranLocalized[];
  /** Matching page inside this app (without the locale prefix), when one exists. */
  internalPath?: string;
}

export const AMEKRAN_OFFERS: AmekranOffer[] = [
  {
    id: 'automobile',
    icon: 'car',
    title: { fr: 'Automobile', en: 'Motor', ar: 'السيارات' },
    tagline: {
      fr: 'Roulez l’esprit tranquille avec les formules auto AMEKRAN.',
      en: 'Drive with peace of mind with AMEKRAN motor cover.',
      ar: 'قودوا سياراتكم بكل اطمئنان مع صيغ AMEKRAN للسيارات.',
    },
    highlights: [
      {
        fr: 'Basic’OTO, Auto IKTISSADIA, Offre WW, Tous Risques HANI et Offre Expérimentés.',
        en: 'Basic’OTO, Auto IKTISSADIA, WW, Tous Risques HANI and Experienced Driver offers.',
        ar: 'عروض Basic’OTO وAuto IKTISSADIA وWW وTous Risques HANI وعرض السائقين ذوي الخبرة.',
      },
      {
        fr: 'Responsabilité civile, événement catastrophique et assistance 24h/7j.',
        en: 'Third-party liability, catastrophe cover and 24/7 assistance.',
        ar: 'المسؤولية المدنية، الحوادث الكارثية والمساعدة على مدار الساعة.',
      },
      {
        fr: 'AMEKRAN Services, garages agréés, Hifad Express et expertise à distance.',
        en: 'AMEKRAN Services, approved garages, Hifad Express and remote expertise.',
        ar: 'خدمات AMEKRAN، الورشات المعتمدة، Hifad Express والخبرة عن بعد.',
      },
    ],
    internalPath: '/assurance-automobile',
  },
  {
    id: 'moto',
    icon: 'bike',
    title: { fr: 'Moto', en: 'Motorcycle', ar: 'الدراجات النارية' },
    tagline: {
      fr: 'Prenez la route l’esprit léger avec l’offre moto AMEKRAN.',
      en: 'Take the road with the AMEKRAN motorcycle offer.',
      ar: 'انطلقوا في الطريق بكل خفة مع عرض AMEKRAN للدراجات النارية.',
    },
    highlights: [
      {
        fr: 'Responsabilité civile obligatoire pour les dommages causés aux tiers.',
        en: 'Compulsory third-party liability for damage caused to others.',
        ar: 'المسؤولية المدنية الإجبارية عن الأضرار اللاحقة بالغير.',
      },
      {
        fr: 'AMEKRAN Assist’Moto Zen : remorquage illimité et véhicule de remplacement.',
        en: 'AMEKRAN Assist’Moto Zen: unlimited towing and a replacement vehicle.',
        ar: 'AMEKRAN Assist’Moto Zen: سحب غير محدود وسيارة بديلة.',
      },
      {
        fr: 'Centre de relation client joignable 24h/7j au 0661508925.',
        en: 'Customer relations centre available 24/7 on 0661508925.',
        ar: 'مركز علاقات العملاء متاح على مدار الساعة عبر 0661508925.',
      },
    ],
  },
  {
    id: 'habitation',
    icon: 'home',
    title: { fr: 'Habitation', en: 'Home', ar: 'السكن' },
    tagline: {
      fr: 'Une multirisque habitation complète pour votre chez-vous.',
      en: 'Complete home insurance for everything you own.',
      ar: 'تأمين شامل للسكن يحمي منزلكم وممتلكاتكم.',
    },
    highlights: [
      {
        fr: 'Incendie, vol, dégâts des eaux, événements catastrophiques et RC du chef de famille.',
        en: 'Fire, theft, water damage, catastrophic events and household liability.',
        ar: 'الحريق، السرقة، تسرب المياه، الأحداث الكارثية والمسؤولية المدنية لرب الأسرة.',
      },
      {
        fr: 'Options bris de glace et accidents du travail du personnel domestique.',
        en: 'Optional glass breakage and domestic staff cover.',
        ar: 'خيارات كسر الزجاج وتأمين العاملين المنزليين.',
      },
      {
        fr: 'Assistance : hébergement d’urgence, serrurier, plombier et sauvegarde du logement.',
        en: 'Assistance: emergency accommodation, locksmith, plumber and home protection.',
        ar: 'المساعدة: إقامة طارئة، صانع أقفال، سباك وحماية المسكن.',
      },
    ],
    internalPath: '/assurance-habitation',
  },
  {
    id: 'sante',
    icon: 'heart',
    title: {
      fr: 'Santé & Prévoyance',
      en: 'Health & Protection',
      ar: 'الصحة والوقاية',
    },
    tagline: {
      fr: 'Protégez votre santé et celle de votre famille.',
      en: 'Protect your health and that of your family.',
      ar: 'احموا صحتكم وصحة عائلتكم.',
    },
    highlights: [
      {
        fr: 'Pack Santé Monde : hospitalisation, soins intensifs, chirurgie et médicaments.',
        en: 'Pack Santé Monde: hospitalisation, intensive care, surgery and medicines.',
        ar: 'Pack Santé Monde: الاستشفاء، العناية المركزة، الجراحة والأدوية.',
      },
      {
        fr: 'Temporaire Décès pour sécuriser l’avenir des proches.',
        en: 'Temporary death cover to secure your family’s future.',
        ar: 'تأمين الوفاة المؤقت لتأمين مستقبل الأقارب.',
      },
      {
        fr: 'Individuel Accident SABIL et contrats personnalisables.',
        en: 'Individuel Accident SABIL and tailor-made contracts.',
        ar: 'Individuel Accident SABIL وعقود قابلة للتخصيص.',
      },
    ],
    internalPath: '/assurance-sante',
  },
  {
    id: 'epargne',
    icon: 'savings',
    title: { fr: 'Épargne', en: 'Savings', ar: 'الادخار' },
    tagline: {
      fr: 'Préparez l’avenir en toute sérénité.',
      en: 'Prepare for the future with confidence.',
      ar: 'استعدوا للمستقبل بكل اطمئنان.',
    },
    highlights: [
      {
        fr: 'Éducation Active : financez les études de vos enfants.',
        en: 'Éducation Active: fund your children’s studies.',
        ar: 'Éducation Active: تمويل دراسة أبنائكم.',
      },
      {
        fr: 'Retraite Active : construisez une retraite confortable.',
        en: 'Retraite Active: build a comfortable retirement.',
        ar: 'Retraite Active: بناء تقاعد مريح.',
      },
      {
        fr: 'Avantages fiscaux et rendements attractifs selon les conditions du contrat.',
        en: 'Tax advantages and attractive returns under the contract terms.',
        ar: 'مزايا جبائية وعوائد جذابة وفق شروط العقد.',
      },
    ],
  },
  {
    id: 'loisirs',
    icon: 'leisure',
    title: { fr: 'Loisirs', en: 'Leisure', ar: 'الترفيه' },
    tagline: {
      fr: 'Profitez de vos activités et voyages en toute sérénité.',
      en: 'Enjoy your activities and trips with complete peace of mind.',
      ar: 'استمتعوا بأنشطتكم وأسفاركم بكل اطمئنان.',
    },
    highlights: [
      {
        fr: 'Couvertures pour les activités de loisirs et les déplacements.',
        en: 'Cover for leisure activities and travel.',
        ar: 'تغطية لأنشطة الترفيه والتنقلات.',
      },
      {
        fr: 'Garanties modulables selon le niveau de risque.',
        en: 'Flexible cover adapted to the level of risk.',
        ar: 'تغطيات قابلة للتعديل حسب مستوى الخطر.',
      },
      {
        fr: 'Conseil personnalisé par votre agence AMEKRAN à Tanger.',
        en: 'Personal advice from your AMEKRAN agency in Tangier.',
        ar: 'استشارة شخصية من وكالة AMEKRAN بطنجة.',
      },
    ],
  },
];

export interface AmekranRule {
  id: string;
  title: AmekranLocalized;
  detail: AmekranLocalized;
}

export const AMEKRAN_RULES: AmekranRule[] = [
  {
    id: 'rc-obligatoire',
    title: {
      fr: 'Responsabilité civile obligatoire',
      en: 'Compulsory third-party liability',
      ar: 'المسؤولية المدنية الإجبارية',
    },
    detail: {
      fr: 'Au Maroc, tout véhicule en circulation doit être couvert au minimum en responsabilité civile, conformément à la loi n° 17-99 portant Code des assurances. Les garanties dommages (vol, incendie, tous risques) restent facultatives.',
      en: 'In Morocco every vehicle on the road must carry at least third-party liability cover, as required by Law No. 17-99 (Insurance Code). Own-damage cover (theft, fire, all risks) remains optional.',
      ar: 'بالمغرب، يجب أن يكون كل مركبة في حركة السير مغطاة على الأقل بالمسؤولية المدنية وفقاً للقانون رقم 17-99 المتعلق بمدونة التأمينات. أما تغطيات الأضرار الذاتية (السرقة، الحريق، جميع المخاطر) فتبقى اختيارية.',
    },
  },
  {
    id: 'declaration',
    title: {
      fr: 'Délais de déclaration de sinistre',
      en: 'Claim notification deadlines',
      ar: 'آجال التصريح بالحوادث',
    },
    detail: {
      fr: 'Un sinistre automobile ou habitation doit être déclaré à votre agence dans un délai maximum de 5 jours. En cas de vol, la déclaration doit être faite dans les 24 heures, accompagnée du procès-verbal des autorités compétentes.',
      en: 'A motor or home claim must be reported to your agency within a maximum of 5 days. In case of theft, notification must be made within 24 hours, together with the official police report.',
      ar: 'يجب التصريح بحادث السيارة أو السكن لدى وكالتكم في أجل أقصاه 5 أيام. وفي حالة السرقة، يجب التصريح خلال 24 ساعة مرفقاً بمحضر السلطات المختصة.',
    },
  },
  {
    id: 'dossier',
    title: {
      fr: 'Constat et pièces justificatives',
      en: 'Accident report and supporting documents',
      ar: 'المحضر والوثائق الثبوتية',
    },
    detail: {
      fr: 'Joignez un constat amiable dûment rempli, des photos des dommages et une déclaration écrite décrivant les circonstances. Les factures, expertises et attestations peuvent être demandées pour instruire le dossier.',
      en: 'Attach a completed accident report, photographs of the damage and a written statement of the circumstances. Invoices, expert assessments and certificates may be requested to process the file.',
      ar: 'أرفقوا محضراً ودياً مملوءاً، صوراً للأضرار وتصريحاً كتابياً يصف الظروف. قد تُطلب الفواتير والخبرات والشهادات لدراسة الملف.',
    },
  },
  {
    id: 'conditions',
    title: {
      fr: 'Garanties, franchises et conditions générales',
      en: 'Cover, deductibles and general conditions',
      ar: 'التغطيات والتحملات والشروط العامة',
    },
    detail: {
      fr: 'Les garanties, plafonds, franchises et tarifs présentés sont ceux des conditions générales AMEKRAN en vigueur et peuvent évoluer. Seuls le certificat d’assurance, l’attestation et les conditions générales remis par votre agence font foi.',
      en: 'The cover, limits, deductibles and prices shown follow AMEKRAN’s current general conditions and may change. Only the insurance certificate, cover note and general conditions issued by your agency are binding.',
      ar: 'التغطيات والحدود والتحملات والأسعار المعروضة تخضع للشروط العامة السارية لـ AMEKRAN وقد تتغير. المرجع الوحيد الملزم هو شهادة التأمين والشهادة المؤقتة والشروط العامة المسلمة من وكالتكم.',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Advice & prevention — mirrors AMEKRAN's "Conseils et prévention" hub    */
/* ------------------------------------------------------------------ */

export interface AmekranAdviceItem {
  title: AmekranLocalized;
  body: AmekranLocalized;
}

export interface AmekranAdviceCategory {
  id: string;
  title: AmekranLocalized;
  intro: AmekranLocalized;
  items: AmekranAdviceItem[];
}

export const AMEKRAN_ADVICE: AmekranAdviceCategory[] = [
  {
    id: 'auto',
    title: { fr: 'Auto', en: 'Motor', ar: 'السيارات' },
    intro: {
      fr: 'Les bons réflexes AMEKRAN pour rouler couvert et éviter les mauvaises surprises au moment du sinistre.',
      en: 'AMEKRAN’s practical habits for driving covered and avoiding surprises when a claim happens.',
      ar: 'العادات العملية من AMEKRAN للقيادة بتغطية جيدة وتجنب المفاجآت عند وقوع الحادث.',
    },
    items: [
      {
        title: {
          fr: 'Adaptez votre assurance à vos besoins',
          en: 'Match your cover to how you drive',
          ar: 'كيّفوا تأمينكم مع استعمالكم للسيارة',
        },
        body: {
          fr: 'Si vous utilisez votre véhicule occasionnellement, une couverture de base peut suffire. Pour une voiture neuve ou de grande valeur, optez pour une assurance tous risques.',
          en: 'If you use your car only occasionally, basic cover may be enough. For a new or high-value vehicle, choose all-risks cover.',
          ar: 'إذا كنتم تستعملون سيارتكم بشكل عرضي، فقد تكفي التغطية الأساسية. أما السيارة الجديدة أو ذات القيمة العالية فتستدعي تأميناً شاملاً.',
        },
      },
      {
        title: {
          fr: 'Signalez immédiatement tout changement',
          en: 'Report every change immediately',
          ar: 'صرّحوا فوراً بكل تغيير',
        },
        body: {
          fr: 'Changement d’adresse, de véhicule ou de fréquence d’utilisation : informez votre assureur pour éviter des difficultés en cas de sinistre.',
          en: 'A new address, vehicle or usage pattern must be reported to your insurer to avoid problems in the event of a claim.',
          ar: 'تغيير العنوان أو السيارة أو وتيرة الاستعمال: أخبروا مؤمّنكم لتجنب مشاكل عند وقوع الحادث.',
        },
      },
      {
        title: {
          fr: 'Gardez vos documents à jour',
          en: 'Keep your documents up to date',
          ar: 'حافظوا على وثائقكم محدّثة',
        },
        body: {
          fr: 'Ayez toujours dans le véhicule une copie de l’attestation d’assurance, de la carte grise et du permis de conduire, pour être prêt lors d’un contrôle ou d’un incident.',
          en: 'Always carry a copy of your insurance certificate, registration card and driving licence in the vehicle, ready for a check or an incident.',
          ar: 'احملوا دائماً نسخة من شهادة التأمين والبطاقة الرمادية ورخصة السياقة داخل السيارة، استعداداً لأي مراقبة أو حادث.',
        },
      },
    ],
  },
  {
    id: 'habitation',
    title: { fr: 'Habitation', en: 'Home', ar: 'السكن' },
    intro: {
      fr: 'Prévenir avant d’indemniser : les gestes simples recommandés par AMEKRAN pour protéger votre logement.',
      en: 'Prevention first: simple steps recommended by AMEKRAN to protect your home.',
      ar: 'الوقاية قبل التعويض: خطوات بسيطة توصي بها AMEKRAN لحماية منزلكم.',
    },
    items: [
      {
        title: {
          fr: 'Prévention des incendies domestiques',
          en: 'Preventing domestic fires',
          ar: 'الوقاية من الحرائق المنزلية',
        },
        body: {
          fr: 'Installez des détecteurs de fumée, évitez de surcharger les prises électriques et ne laissez jamais un appareil électroménager en marche sans surveillance. Gardez un extincteur à portée de main.',
          en: 'Fit smoke detectors, avoid overloading sockets and never leave an appliance running unattended. Keep a fire extinguisher within reach.',
          ar: 'ثبّتوا كواشف الدخان، تجنبوا تحميل المقابس فوق طاقتها ولا تتركوا الأجهزة الكهربائية تعمل دون مراقبة. احتفظوا بمطفأة حريق في متناول اليد.',
        },
      },
      {
        title: {
          fr: 'L’importance d’un système d’alarme',
          en: 'Why an alarm system matters',
          ar: 'أهمية نظام الإنذار',
        },
        body: {
          fr: 'Une alarme efficace dissuade les cambriolages et peut aussi détecter incendies et fuites de gaz, pour une protection complète du domicile.',
          en: 'An effective alarm deters burglary and can also detect fire and gas leaks, giving complete protection to the home.',
          ar: 'نظام إنذار فعّال يردع السرقة ويمكنه أيضاً كشف الحرائق وتسربات الغاز، لحماية شاملة للمنزل.',
        },
      },
      {
        title: {
          fr: 'L’intérêt des caméras de surveillance',
          en: 'The value of security cameras',
          ar: 'فائدة كاميرات المراقبة',
        },
        body: {
          fr: 'En cas de problème, les caméras peuvent fournir des preuves vidéo utilisables par les forces de l’ordre et pour la réclamation d’assurance.',
          en: 'If something happens, cameras can provide video evidence for the authorities and for the insurance claim.',
          ar: 'عند وقوع مشكل، يمكن للكاميرات توفير أدلة مصوّرة تفيد السلطات وفي ملف التعويض.',
        },
      },
      {
        title: {
          fr: 'Protégez baies et fenêtres vitrées',
          en: 'Secure windows and glazed doors',
          ar: 'احموا النوافذ والأبواب الزجاجية',
        },
        body: {
          fr: 'Les intrusions passent aussi par les fenêtres et baies vitrées. Barreaux ou volets anti-effraction renforcent réellement la sécurité du logement.',
          en: 'Intruders also enter through windows and glazed doors. Bars or anti-burglary shutters genuinely strengthen home security.',
          ar: 'قد تتم عمليات التسلل عبر النوافذ والأبواب الزجاجية. القضبان أو الستائر المضادة للاقتحام تعزز فعلاً أمن المسكن.',
        },
      },
    ],
  },
  {
    id: 'sante',
    title: { fr: 'Santé & Prévoyance', en: 'Health & Protection', ar: 'الصحة والوقاية' },
    intro: {
      fr: 'Plafonds, délais de carence et justificatifs : les points à vérifier avant de souscrire un contrat santé AMEKRAN.',
      en: 'Limits, waiting periods and documents to check before taking out AMEKRAN health cover.',
      ar: 'الحدود وآجال الانتظار والوثائق التي يجب التحقق منها قبل الاكتتاب في تأمين صحي AMEKRAN.',
    },
    items: [
      {
        title: {
          fr: 'Vérifiez les plafonds d’hospitalisation',
          en: 'Check your hospitalisation limits',
          ar: 'تحققوا من حدود الاستشفاء',
        },
        body: {
          fr: 'Assurez-vous que les plafonds de prise en charge correspondent à vos besoins réels et conservez tous les documents médicaux : ils sont indispensables à un remboursement rapide.',
          en: 'Make sure the cover limits match your real needs and keep every medical document: they are essential for a fast reimbursement.',
          ar: 'تأكدوا من أن حدود التغطية تلبي احتياجاتكم الفعلية واحتفظوا بجميع الوثائق الطبية: فهي ضرورية لتعويض سريع.',
        },
      },
      {
        title: {
          fr: 'Anticipez les délais de carence',
          en: 'Plan for waiting periods',
          ar: 'استبقوا آجال الانتظار',
        },
        body: {
          fr: 'Le délai général est de 4 semaines. La grossesse et la maternité sont couvertes après 10 mois, les affections psychiatriques après 24 mois, et le nouveau-né à partir de son 28e jour.',
          en: 'The general waiting period is 4 weeks. Pregnancy and maternity are covered after 10 months, psychiatric conditions after 24 months, and a newborn from its 28th day.',
          ar: 'مدة الانتظار العامة 4 أسابيع. تُغطى الحمل والولادة بعد 10 أشهر، والاضطرابات النفسية بعد 24 شهراً، والمولود الجديد ابتداءً من يومه الثامن والعشرين.',
        },
      },
      {
        title: {
          fr: 'Voyagez en connaissance de cause',
          en: 'Travel with the right cover',
          ar: 'سافروا بتغطية مناسبة',
        },
        body: {
          fr: 'Certains pays sont exclus : vérifiez que vos destinations habituelles sont couvertes et repérez les établissements conventionnés à l’étranger. La maternité à l’étranger est prise en charge jusqu’à 55 000 DH.',
          en: 'Some countries are excluded: check that your usual destinations are covered and identify contracted hospitals abroad. Maternity abroad is covered up to MAD 55,000.',
          ar: 'بعض البلدان مستثناة: تحققوا من تغطية وجهاتكم المعتادة وحددوا المؤسسات المتعاقدة بالخارج. تُغطى الولادة بالخارج حتى 55.000 درهم.',
        },
      },
      {
        title: {
          fr: 'Déclarez correctement votre situation',
          en: 'Declare your situation accurately',
          ar: 'صرّحوا بوضعكم بدقة',
        },
        body: {
          fr: 'Pour SABIL, le capital décès minimum est de 60 000 DH et l’invalidité peut atteindre 2 fois ce capital. Déclarez vos professions ou sports à risque : une surprime peut s’appliquer, mais une omission peut limiter la couverture.',
          en: 'For SABIL, the minimum death benefit is MAD 60,000 and permanent disability can reach twice that amount. Declare risky professions or sports: a premium loading may apply, but an omission can restrict cover.',
          ar: 'في SABIL، الحد الأدنى لرأس مال الوفاة 60.000 درهم وقد يصل العجز الدائم إلى ضعفه. صرّحوا بالمهن أو الرياضات الخطرة: قد تُطبق زيادة في القسط، لكن الإغفال قد يحدّ من التغطية.',
        },
      },
    ],
  },
  {
    id: 'epargne',
    title: { fr: 'Épargne', en: 'Savings', ar: 'الادخار' },
    intro: {
      fr: 'Éducation Active et Retraite Active : les conseils AMEKRAN pour faire travailler votre épargne dans la durée.',
      en: 'Éducation Active and Retraite Active: AMEKRAN’s advice for growing savings over time.',
      ar: 'Éducation Active وRetraite Active: نصائح AMEKRAN لتنمية ادخاركم على المدى الطويل.',
    },
    items: [
      {
        title: {
          fr: 'Commencez tôt et restez régulier',
          en: 'Start early and stay regular',
          ar: 'ابدأوا مبكراً وحافظوا على الانتظام',
        },
        body: {
          fr: 'Plus vous épargnez tôt pour les études de votre enfant, plus les primes mensuelles sont abordables et plus le capital progresse. Le versement minimum est de 100 DH par mois.',
          en: 'The earlier you save for your child’s studies, the more affordable the monthly premiums and the more the capital grows. The minimum contribution is MAD 100 per month.',
          ar: 'كلما بدأتم الادخار مبكراً لدراسة أبنائكم، كانت الأقساط الشهرية أيسر ورأس المال أكبر. الحد الأدنى للدفع 100 درهم شهرياً.',
        },
      },
      {
        title: {
          fr: 'Utilisez les versements exceptionnels',
          en: 'Use exceptional contributions',
          ar: 'استعملوا الدفعات الاستثنائية',
        },
        body: {
          fr: 'Lorsque votre situation le permet, un versement exceptionnel (minimum 1 000 DH) accélère nettement la constitution du capital Éducation Active. Les rachats partiels restent limités à 2 pendant le contrat.',
          en: 'When you can, an exceptional contribution (minimum MAD 1,000) significantly accelerates the Éducation Active capital. Partial withdrawals remain limited to 2 over the contract.',
          ar: 'عندما تسمح وضعيتكم، تسرّع الدفعة الاستثنائية (بحد أدنى 1.000 درهم) تكوين رأس مال Éducation Active. ويبقى الاسترداد الجزئي محدوداً بمرتين خلال العقد.',
        },
      },
      {
        title: {
          fr: 'Préparez votre retraite avec la fiscalité en tête',
          en: 'Prepare retirement with tax in mind',
          ar: 'استعدوا للتقاعد مع مراعاة الجانب الجبائي',
        },
        body: {
          fr: 'Les cotisations Retraite Active sont déductibles du revenu imposable. À l’échéance, choisissez entre capital, rente viagère — éventuellement réversible au conjoint — ou une combinaison des deux.',
          en: 'Retraite Active contributions are deductible from taxable income. At maturity, choose a lump sum, a lifetime annuity — possibly reversible to your spouse — or a combination of both.',
          ar: 'مساهمات Retraite Active قابلة للخصم من الدخل الخاضع للضريبة. عند الأجل، اختاروا بين رأس المال أو ريع مدى الحياة — قد يكون قابلاً للتحويل إلى الزوج — أو مزيج منهما.',
        },
      },
    ],
  },
  {
    id: 'moto',
    title: { fr: 'Moto', en: 'Motorcycle', ar: 'الدراجات النارية' },
    intro: {
      fr: 'RC obligatoire, tous risques et calcul de prime : l’essentiel pour assurer votre deux-roues selon AMEKRAN.',
      en: 'Compulsory liability, all-risks and premium calculation: the essentials for insuring your motorcycle with AMEKRAN.',
      ar: 'المسؤولية الإجبارية والتأمين الشامل وحساب القسط: أساسيات تأمين دراجتكم مع AMEKRAN.',
    },
    items: [
      {
        title: {
          fr: 'La responsabilité civile est obligatoire',
          en: 'Third-party liability is compulsory',
          ar: 'المسؤولية المدنية إجبارية',
        },
        body: {
          fr: 'Au Maroc, tous les conducteurs de moto doivent être couverts au minimum en responsabilité civile. Le vol, l’incendie et les dommages à votre propre machine restent facultatifs mais vivement recommandés.',
          en: 'In Morocco every motorcyclist must carry at least third-party liability. Theft, fire and damage to your own machine remain optional but strongly recommended.',
          ar: 'بالمغرب، يجب أن يكون كل سائق دراجة مغطى على الأقل بالمسؤولية المدنية. أما السرقة والحريق وأضرار الدراجة نفسها فتبقى اختيارية لكنها موصى بها بشدة.',
        },
      },
      {
        title: {
          fr: 'RC ou tous risques : quelle différence ?',
          en: 'Liability or all-risks?',
          ar: 'المسؤولية أم الشامل؟',
        },
        body: {
          fr: 'La RC couvre uniquement les dommages causés aux tiers. Le tous risques couvre aussi votre moto même si vous êtes responsable, et peut inclure vol, incendie et événements naturels.',
          en: 'Liability covers only damage caused to others. All-risks also covers your own motorcycle even when you are at fault, and may include theft, fire and natural events.',
          ar: 'المسؤولية تغطي فقط الأضرار اللاحقة بالغير. أما الشامل فيغطي دراجتكم أيضاً حتى عند تحملكم المسؤولية، وقد يشمل السرقة والحريق والأحداث الطبيعية.',
        },
      },
      {
        title: {
          fr: 'Ce qui fait varier la prime',
          en: 'What moves the premium',
          ar: 'ما يؤثر على القسط',
        },
        body: {
          fr: 'La cylindrée, l’âge et l’expérience du conducteur ainsi que l’historique de sinistralité pèsent sur la prime. Les grosses cylindrées peuvent coûter plus cher en raison du risque accru.',
          en: 'Engine size, the rider’s age and experience and the claims history all affect the premium. Large-capacity bikes can cost more because of the higher risk.',
          ar: 'سعة المحرك وعمر السائق وخبرته وسجل الحوادث تؤثر على القسط. الدراجات ذات المحركات الكبيرة قد تكون أغلى بسبب ارتفاع الخطر.',
        },
      },
    ],
  },
  {
    id: 'loisirs',
    title: { fr: 'Loisirs', en: 'Leisure', ar: 'الترفيه' },
    intro: {
      fr: 'Chasse, plaisance et voyages : les règles AMEKRAN à connaître avant de pratiquer vos activités favorites.',
      en: 'Hunting, boating and travel: the AMEKRAN rules to know before enjoying your favourite activities.',
      ar: 'الصيد والملاحة البحرية والأسفار: قواعد AMEKRAN التي يجب معرفتها قبل ممارسة أنشطتكم المفضلة.',
    },
    items: [
      {
        title: {
          fr: 'La RC chasse est obligatoire',
          en: 'Hunting liability is compulsory',
          ar: 'مسؤولية الصيد إجبارية',
        },
        body: {
          fr: 'Tout chasseur titulaire d’un permis de chasse doit être assuré. Le contrat couvre les dommages corporels et matériels causés à des tiers lors de l’acte de chasse, du transport pour la chasse ou du nettoyage d’une arme non prohibée, jusqu’à 500 000 DH pour les dommages matériels.',
          en: 'Every hunter with a hunting licence must be insured. The policy covers bodily and material damage caused to others during hunting, transport for hunting or cleaning a legal firearm, up to MAD 500,000 for material damage.',
          ar: 'كل صياد حاصل على رخصة الصيد ملزم بالتأمين. يغطي العقد الأضرار الجسدية والمادية اللاحقة بالغير أثناء الصيد أو نقله أو تنظيف سلاح غير محظور، حتى 500.000 درهم للأضرار المادية.',
        },
      },
      {
        title: {
          fr: 'Plaisance : vérifiez les conditions du bateau',
          en: 'Boating: check your vessel’s eligibility',
          ar: 'الملاحة: تحققوا من شروط القارب',
        },
        body: {
          fr: 'Pour la multirisque plaisance, l’embarcation doit avoir moins de 10 ans, mesurer au maximum 20 m et ne pas dépasser 500 chevaux. Au-delà, AMEKRAN étudie une cotation spécifique.',
          en: 'For the pleasure-craft multi-risk policy, the vessel must be under 10 years old, no longer than 20 m and no more than 500 hp. Beyond that, AMEKRAN reviews specific pricing.',
          ar: 'في التأمين الشامل لقوارب الترفيه، يجب أن يكون عمر القارب أقل من 10 سنوات وطوله لا يتجاوز 20 متراً وقوته لا تتجاوز 500 حصان. وإلا تدرس AMEKRAN تسعيرة خاصة.',
        },
      },
      {
        title: {
          fr: 'En cas de vol, agissez vite',
          en: 'In case of theft, act quickly',
          ar: 'في حالة السرقة، تحركوا بسرعة',
        },
        body: {
          fr: 'Toute déclaration de vol doit être accompagnée d’une plainte déposée au commissariat ou à la gendarmerie dans les 24 heures suivant la découverte du vol, en veillant à ne pas retirer la plaque d’immatriculation.',
          en: 'Every theft claim must include a complaint filed with the police or gendarmerie within 24 hours of discovering the theft, and the registration plate must not be removed.',
          ar: 'كل تصريح بالسرقة يجب أن يرفق بشكاية لدى الشرطة أو الدرك خلال 24 ساعة من اكتشاف السرقة، مع الحرص على عدم إزالة لوحة الترقيم.',
        },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* FAQ — sourced from AMEKRAN's public FAQ                                 */
/* ------------------------------------------------------------------ */

export interface AmekranFaq {
  id: string;
  topic: 'auto' | 'moto' | 'habitation' | 'sante' | 'epargne' | 'loisirs';
  question: AmekranLocalized;
  answer: AmekranLocalized;
}

export const AMEKRAN_FAQS: AmekranFaq[] = [
  {
    id: 'auto-rc',
    topic: 'auto',
    question: {
      fr: 'Quelles assurances automobiles sont obligatoires au Maroc ?',
      en: 'Which motor insurance is compulsory in Morocco?',
      ar: 'ما هي التأمينات الإجبارية على السيارات بالمغرب؟',
    },
    answer: {
      fr: 'La responsabilité civile est obligatoire pour tous les conducteurs : elle couvre les dommages corporels et matériels causés aux tiers. Les garanties tous risques restent facultatives mais recommandées.',
      en: 'Third-party liability is compulsory for every driver: it covers bodily and material damage caused to others. All-risks cover remains optional but recommended.',
      ar: 'المسؤولية المدنية إجبارية على كل سائق: تغطي الأضرار الجسدية والمادية اللاحقة بالغير. أما التغطية الشاملة فتبقى اختيارية لكنها موصى بها.',
    },
  },
  {
    id: 'auto-prime',
    topic: 'auto',
    question: {
      fr: 'Comment est calculée la prime d’assurance automobile ?',
      en: 'How is a motor premium calculated?',
      ar: 'كيف يُحسب قسط تأمين السيارة؟',
    },
    answer: {
      fr: 'La prime dépend du type de véhicule, de l’âge du conducteur, de l’usage et des antécédents de sinistres. Chaque compagnie applique ensuite ses propres critères et barèmes.',
      en: 'The premium depends on the vehicle type, the driver’s age, usage and claims history. Each insurer then applies its own criteria and rating scales.',
      ar: 'يعتمد القسط على نوع المركبة وعمر السائق واستعمالها وسجل الحوادث. ثم تطبق كل شركة معاييرها وسلالمها الخاصة.',
    },
  },
  {
    id: 'auto-vol',
    topic: 'auto',
    question: {
      fr: 'Le vol de mon véhicule est-il couvert ?',
      en: 'Is my vehicle covered against theft?',
      ar: 'هل سيارتي مغطاة ضد السرقة؟',
    },
    answer: {
      fr: 'Cela dépend du contrat. Une formule tous risques ou incluant la garantie vol couvre le véhicule ; une responsabilité civile de base ne couvre pas le vol.',
      en: 'It depends on the policy. An all-risks formula or one including theft cover protects the vehicle; basic third-party liability does not.',
      ar: 'يعتمد ذلك على العقد. الصيغة الشاملة أو التي تشمل ضمان السرقة تغطي السيارة، أما المسؤولية المدنية الأساسية فلا تغطي السرقة.',
    },
  },
  {
    id: 'moto-rc',
    topic: 'moto',
    question: {
      fr: 'L’assurance moto est-elle obligatoire au Maroc ?',
      en: 'Is motorcycle insurance compulsory in Morocco?',
      ar: 'هل تأمين الدراجات النارية إجباري بالمغرب؟',
    },
    answer: {
      fr: 'Oui, la responsabilité civile est obligatoire pour tous les conducteurs de moto. Le tous risques et le vol sont facultatifs mais recommandés.',
      en: 'Yes, third-party liability is compulsory for all motorcyclists. All-risks and theft cover are optional but recommended.',
      ar: 'نعم، المسؤولية المدنية إجبارية على جميع سائقي الدراجات النارية. التأمين الشامل والسرقة اختياريان لكنهما موصى بهما.',
    },
  },
  {
    id: 'habitation-obligatoire',
    topic: 'habitation',
    question: {
      fr: 'L’assurance habitation est-elle obligatoire ?',
      en: 'Is home insurance compulsory?',
      ar: 'هل تأمين السكن إجباري؟',
    },
    answer: {
      fr: 'L’assurance habitation n’est pas obligatoire au Maroc, mais elle est fortement recommandée pour protéger votre logement contre l’incendie, le vol, les dégâts des eaux et les événements catastrophiques.',
      en: 'Home insurance is not compulsory in Morocco, but it is strongly recommended to protect your home against fire, theft, water damage and catastrophic events.',
      ar: 'تأمين السكن غير إجباري بالمغرب، لكنه موصى به بشدة لحماية منزلكم من الحريق والسرقة وتسرب المياه والأحداث الكارثية.',
    },
  },
  {
    id: 'habitation-rc',
    topic: 'habitation',
    question: {
      fr: 'Que couvre la responsabilité civile habitation ?',
      en: 'What does household liability cover?',
      ar: 'ماذا تغطي المسؤولية المدنية للسكن؟',
    },
    answer: {
      fr: 'Elle prend en charge les conséquences pécuniaires des dommages causés à des tiers dans votre vie privée, par vous, votre conjoint, vos enfants, votre personnel de maison ou vos animaux.',
      en: 'It covers the financial consequences of damage caused to others in your private life by you, your spouse, your children, domestic staff or your pets.',
      ar: 'تتكفل بالآثار المالية للأضرار اللاحقة بالغير في حياتكم الخاصة، منكم أو من زوجكم أو أبنائكم أو العاملين المنزليين أو حيواناتكم.',
    },
  },
  {
    id: 'sante-plafond',
    topic: 'sante',
    question: {
      fr: 'Quelles prestations couvre le Pack Santé Monde ?',
      en: 'What does Pack Santé Monde cover?',
      ar: 'ما هي الخدمات التي يغطيها Pack Santé Monde؟',
    },
    answer: {
      fr: 'Hospitalisation, soins intensifs, médicaments, chirurgie et soins ambulatoires, avec une couverture pouvant atteindre 6 500 000 DH par an et par personne.',
      en: 'Hospitalisation, intensive care, medicines, surgery and outpatient care, with cover up to MAD 6,500,000 per person per year.',
      ar: 'الاستشفاء والعناية المركزة والأدوية والجراحة والعلاج الخارجي، بتغطية تصل إلى 6.500.000 درهم سنوياً لكل شخص.',
    },
  },
  {
    id: 'sante-carence',
    topic: 'sante',
    question: {
      fr: 'Existe-t-il des délais de carence ?',
      en: 'Are there waiting periods?',
      ar: 'هل توجد آجال انتظار؟',
    },
    answer: {
      fr: 'Oui : 4 semaines en général, 10 mois pour la grossesse et la maternité, 24 mois pour les affections psychiatriques, et le nouveau-né est couvert à partir de son 28e jour. Les maladies aiguës graves ne sont pas soumises au délai.',
      en: 'Yes: 4 weeks in general, 10 months for pregnancy and maternity, 24 months for psychiatric conditions, and a newborn is covered from its 28th day. Severe acute illnesses are exempt.',
      ar: 'نعم: 4 أسابيع عموماً، 10 أشهر للحمل والولادة، 24 شهراً للاضطرابات النفسية، ويُغطى المولود من يومه 28. الأمراض الحادة الخطيرة معفاة.',
    },
  },
  {
    id: 'sante-sabil',
    topic: 'sante',
    question: {
      fr: 'Qu’est-ce que l’assurance Individuel Accident SABIL ?',
      en: 'What is Individuel Accident SABIL?',
      ar: 'ما هو تأمين Individuel Accident SABIL؟',
    },
    answer: {
      fr: 'Elle couvre les conséquences financières des accidents corporels : invalidité permanente, frais médicaux et capital décès. Les personnes de 16 à 65 ans peuvent souscrire, avec des garanties facultatives d’arrêt de travail et de soins.',
      en: 'It covers the financial consequences of bodily accidents: permanent disability, medical costs and a death benefit. People aged 16 to 65 can subscribe, with optional disability leave and care cover.',
      ar: 'تغطي الآثار المالية للحوادث الجسدية: العجز الدائم والمصاريف الطبية ورأس مال الوفاة. يمكن للأشخاص من 16 إلى 65 سنة الاكتتاب، مع ضمانات اختيارية لتوقف العمل والعلاج.',
    },
  },
  {
    id: 'epargne-education',
    topic: 'epargne',
    question: {
      fr: 'Quel est l’objectif d’Éducation Active ?',
      en: 'What is Éducation Active for?',
      ar: 'ما هدف Éducation Active؟',
    },
    answer: {
      fr: 'Constituer une épargne pour financer les études d’un enfant ou son entrée dans la vie active, avec une option Épargne et une option Prévoyance (rente éducation en cas de décès ou d’invalidité de l’assuré).',
      en: 'To build savings for a child’s studies or entry into working life, with a Savings option and a Protection option (education annuity if the policyholder dies or becomes disabled).',
      ar: 'تكوين ادخار لتمويل دراسة الطفل أو دخوله الحياة العملية، بخيار الادخار وخيار الوقاية (ريع تعليمي في حالة وفاة المؤمَّن أو عجزه).',
    },
  },
  {
    id: 'epargne-retraite',
    topic: 'epargne',
    question: {
      fr: 'Quelles sont les cotisations minimales de Retraite Active ?',
      en: 'What are the minimum Retraite Active contributions?',
      ar: 'ما هي الحد الأدنى لمساهمات Retraite Active؟',
    },
    answer: {
      fr: '200 DH par mois, 600 DH par trimestre, 1 200 DH par semestre ou 2 400 DH par an. Le contrat est ouvert aux personnes de plus de 18 ans et de moins de 60 ans.',
      en: 'MAD 200 per month, MAD 600 per quarter, MAD 1,200 per half-year or MAD 2,400 per year. The contract is open to people over 18 and under 60.',
      ar: '200 درهم شهرياً، 600 درهم ربع سنوياً، 1.200 درهم نصف سنوياً أو 2.400 درهم سنوياً. العقد متاح لمن تجاوز 18 سنة ولم يبلغ 60.',
    },
  },
  {
    id: 'loisirs-chasse',
    topic: 'loisirs',
    question: {
      fr: 'L’assurance responsabilité civile chasse est-elle obligatoire ?',
      en: 'Is hunting liability insurance compulsory?',
      ar: 'هل تأمين المسؤولية المدنية للصيد إجباري؟',
    },
    answer: {
      fr: 'Oui, elle est obligatoire pour tout chasseur titulaire d’un permis de chasse. Elle couvre les conséquences financières des accidents causés lors de la pratique de la chasse.',
      en: 'Yes, it is compulsory for every hunter holding a hunting licence. It covers the financial consequences of accidents caused while hunting.',
      ar: 'نعم، إجباري على كل صياد حاصل على رخصة الصيد. يغطي الآثار المالية للحوادث التي تقع أثناء ممارسة الصيد.',
    },
  },
];

/* ------------------------------------------------------------------ */
/* Enterprise / professional rules                                     */
/* ------------------------------------------------------------------ */

export const AMEKRAN_ENTERPRISE_RULES: AmekranRule[] = [
  {
    id: 'obligations',
    title: {
      fr: 'Obligations légales de l’employeur',
      en: 'The employer’s legal obligations',
      ar: 'الالتزامات القانونية لرب العمل',
    },
    detail: {
      fr: 'L’assurance des accidents du travail est régie par la loi n° 18-12 relative à l’indemnisation des accidents du travail, en complément du Code des assurances (loi n° 17-99). Tout employeur doit affilier ses salariés et déclarer son effectif réel avant la mise en place du contrat AMEKRAN.',
      en: 'Workplace accident cover is governed by Law No. 18-12 on compensation for work accidents, alongside the Insurance Code (Law No. 17-99). Every employer must affiliate its employees and declare the real headcount before the AMEKRAN policy starts.',
      ar: 'يخضع تأمين حوادث الشغل للقانون رقم 18-12 المتعلق بالتعويض عن حوادث الشغل، إلى جانب مدونة التأمينات (القانون 17-99). على كل رب عمل تسجيل أجره والتصريح بالعدد الحقيقي قبل تفعيل عقد AMEKRAN.',
    },
  },
  {
    id: 'declaration-at',
    title: {
      fr: 'Déclaration d’un accident du travail',
      en: 'Reporting a workplace accident',
      ar: 'التصريح بحادث الشغل',
    },
    detail: {
      fr: 'Un accident du travail doit être déclaré sans délai à l’employeur, qui dispose d’un délai de 48 heures pour le déclarer à la CNSS et à l’assureur. Le service accidents du travail de AMEKRAN est joignable au 05 22 26 26 36. Conservez la déclaration, le certificat médical initial et les bulletins de soins.',
      en: 'A workplace accident must be reported to the employer without delay; the employer then has 48 hours to declare it to the CNSS and the insurer. AMEKRAN’s workplace accident service can be reached on 05 22 26 26 36. Keep the declaration, the initial medical certificate and treatment records.',
      ar: 'يجب التصريح بحادث الشغل لرب العمل دون تأخير، وله أجل 48 ساعة للتصريح به لدى CNSS والمؤمّن. يمكن الاتصال بخدمة حوادث الشغل لدى AMEKRAN على 05 22 26 26 36. احتفظوا بالتصريح والشهادة الطبية الأولية ووصفات العلاج.',
    },
  },
  {
    id: 'flottes-transport',
    title: {
      fr: 'Flottes, transport et Carte Verte',
      en: 'Fleets, transport and Green Card',
      ar: 'الأساطيل والنقل والبطاقة الخضراء',
    },
    detail: {
      fr: 'Pour une flotte, communiquez la liste exacte des véhicules, immatriculations, genres et conducteurs. Les tracteurs et remorques doivent être déclarés séparément. Pour un déplacement hors Maroc, la Carte Verte internationale et l’extension géographique doivent être valides avant le départ.',
      en: 'For a fleet, provide the exact list of vehicles, registrations, categories and drivers. Tractors and trailers must be declared separately. For travel outside Morocco, the international Green Card and territorial extension must be valid before departure.',
      ar: 'بالنسبة للأساطيل، قدموا اللائحة الدقيقة للمركبات وترقيمها وأنواعها وسائقيها. يجب التصريح بالجرارات والمقطورات بشكل منفصل. للسفر خارج المغرب، يجب أن تكون البطاقة الخضراء الدولية والامتداد الجغرافي ساريين قبل الانطلاق.',
    },
  },
  {
    id: 'sinistres-pro',
    title: {
      fr: 'Sinistres professionnels et avaries',
      en: 'Business claims and cargo damage',
      ar: 'حوادث الشركات وأضرار البضائع',
    },
    detail: {
      fr: 'Déclarez tout sinistre dès que vous en avez connaissance et avant toute réparation, sauf urgence pour limiter l’aggravation. Pour une avarie de transport, faites constater les dommages avant déchargement, émettez des réserves écrites auprès du transporteur et conservez photos, connaissement et factures. Seules les conditions générales AMEKRAN et le certificat remis par l’agence font foi.',
      en: 'Report any claim as soon as you become aware of it and before repairs, except emergency measures to limit worsening. For cargo damage, have the damage inspected before unloading, issue written reservations to the carrier and keep photos, the bill of lading and invoices. Only AMEKRAN’s general conditions and the certificate issued by the agency are binding.',
      ar: 'صرّحوا بكل حادث بمجرد علمكم به وقبل أي إصلاح، باستثناء التدابير المستعجلة للحد من تفاقمه. في أضرار النقل، اطلبوا معاينة الأضرار قبل التفريغ، وسجلوا تحفظات كتابية لدى الناقل واحتفظوا بالصور وسند الشحن والفواتير. المرجع الملزم هو الشروط العامة لـ AMEKRAN والشهادة المسلمة من الوكالة.',
    },
  },
];

export const AMEKRAN_DISCLAIMER: AmekranLocalized = {
  fr: 'AMEKRAN Assurances est votre assureur à Tanger. Les offres et règles ci-dessus reflètent les conditions générales AMEKRAN ; elles ne remplacent pas les documents contractuels remis lors de la souscription.',
  en: 'AMEKRAN Assurances is your insurer in Tangier. The offers and rules above reflect AMEKRAN’s general conditions; they do not replace the contractual documents handed over at subscription.',
  ar: 'AMEKRAN للتأمين هي شركة تأمينكم بطنجة. تعكس العروض والقواعد أعلاه الشروط العامة لـ AMEKRAN ولا تحل محل الوثائق التعاقدية المسلمة عند الاكتتاب.',
};
