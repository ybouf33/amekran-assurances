'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  Car,
  Check,
  ChevronRight,
  ExternalLink,
  Heart,
  Home,
  Minus,
  Phone,
  Plus,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Truck,
} from 'lucide-react';
import TopHeader from '@/components/TopHeader';
import Navbar from '@/components/Navbar';
import SecondFooter from '@/components/SecondFooter';
import TrustAndFooter from '@/components/TrustAndFooter';
import InteractiveModals, {
  type ActiveModalType,
} from '@/components/InteractiveModals';
import {
  type Language,
  type SolutionId,
  solutionPath,
  swapLocale,
  t3,
} from '@/lib/insurance';
import {
  RMA_ADVICE,
  RMA_FAQS,
  RMA_PHONE,
  RMA_URL,
} from '@/lib/rma';
import heroAdviceImg from '@/src/assets/images/about_metier_assistance_1794761079945.jpg';

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  auto: Car,
  habitation: Home,
  sante: Heart,
  epargne: TrendingUp,
  entreprise: Truck,
  sinistre: ShieldAlert,
};

interface AdvicePageClientProps {
  initialLang?: Language;
}

export default function AdvicePageClient({
  initialLang = 'fr',
}: AdvicePageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<Language>(initialLang);
  const [modal, setModal] = useState<ActiveModalType>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string>('');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => (prev ? y > 8 : y > 40));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleChangeLang(next: Language) {
    setLang(next);
    router.push(swapLocale(pathname, next));
  }

  function handleSelectSolution(id: SolutionId) {
    router.push(solutionPath(id, lang));
  }

  const filteredCategories =
    activeTab === 'all'
      ? RMA_ADVICE
      : RMA_ADVICE.filter((cat) => cat.id === activeTab);

  return (
    <div
      id="top"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-dvh flex flex-col bg-white overflow-x-clip"
    >
      <header className="sticky top-0 z-40 shrink-0 bg-white">
        <div
          className={
            isScrolled
              ? 'overflow-hidden pointer-events-none'
              : 'overflow-visible relative z-[60]'
          }
        >
          <TopHeader
            lang={lang}
            onChangeLang={handleChangeLang}
            onOpenContact={() => setModal({ type: 'contact' })}
            logoHref={`/${lang}`}
          />
        </div>
        <Navbar
          lang={lang}
          activeNav="conseils"
          onSelectHome={() => router.push(`/${lang}`)}
          onSelectSolution={handleSelectSolution}
          onOpenAdvice={() => {}}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
          onOpenClientPortal={() => router.push(`/${lang}/#espace-client`)}
        />
      </header>

      <main className="flex-1 flex flex-col">
        {/* Hero Card */}
        <section
          aria-label={t3(lang, 'Conseils RMA Tanger', 'RMA Advice Tangier', 'إرشادات ونصائح RMA طنجة')}
          className="bg-white pt-4 pb-6 sm:pt-6 sm:pb-8 border-b border-[#E5ECF6]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#06132E] min-h-[300px] sm:min-h-[340px] flex items-center shadow-[0_18px_40px_-14px_rgba(7,22,54,0.34)]">
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none select-none overflow-hidden"
              >
                <div
                  className={`absolute inset-y-0 ${
                    lang === 'ar' ? 'left-0' : 'right-0'
                  } w-full md:w-[70%]`}
                >
                  <Image
                    src={heroAdviceImg}
                    alt="Conseils & assistance Amekran Assurances Tanger"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className={`object-cover ${
                      lang === 'ar' ? 'object-[26%_50%]' : 'object-[74%_50%]'
                    }`}
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      lang === 'ar'
                        ? 'linear-gradient(270deg, #06132E 0%, #071636 34%, rgba(7,22,54,0.88) 49%, rgba(7,22,54,0.38) 68%, rgba(7,22,54,0.06) 100%)'
                        : 'linear-gradient(90deg, #06132E 0%, #071636 34%, rgba(7,22,54,0.88) 49%, rgba(7,22,54,0.38) 68%, rgba(7,22,54,0.06) 100%)',
                  }}
                />
              </div>

              <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-8 sm:py-12">
                <div className="max-w-[540px] space-y-4">
                  <nav
                    aria-label={t3(lang, 'Fil d’Ariane', 'Breadcrumb', 'مسار التنقل')}
                    className="flex items-center gap-1.5 text-[13px] font-medium text-slate-300"
                  >
                    <Link href={`/${lang}`} className="hover:text-white transition-colors">
                      {t3(lang, 'Accueil', 'Home', 'الرئيسية')}
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0 rtl:rotate-180" />
                    <span className="font-semibold text-[#F4CB64]">
                      {t3(lang, 'Nos conseils d’assurance', 'Insurance Advice', 'نصائح وإرشادات التأمين')}
                    </span>
                  </nav>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D99E26]/40 text-[11.5px] font-bold text-[#F4CB64]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F4CB64]" />
                    <span>
                      {t3(
                        lang,
                        'Guides officiels RMA Assurance · Agent Général Tanger',
                        'Official RMA Guides · Tangier General Agent',
                        'أدلة وإرشادات RMA الرسمية · الوكيل العام بطنجة'
                      )}
                    </span>
                  </div>

                  <h1 className="text-[32px] sm:text-[42px] font-extrabold text-white leading-tight">
                    {t3(
                      lang,
                      'Les bons réflexes pour être bien assuré et indemnisé sans surprise.',
                      'Practical rules to stay covered and claim without surprises.',
                      'القواعد والخطوات السليمة للتأمين الصحيح والتعويض دون مفاجآت.'
                    )}
                  </h1>

                  <p className="text-[14.5px] sm:text-[16px] text-slate-200 leading-relaxed">
                    {t3(
                      lang,
                      'Découvrez les recommandations RMA pour votre véhicule, votre logement, votre santé et vos activités professionnelles à Tanger.',
                      'Explore RMA advice for your vehicle, home, health and commercial activity in Tangier.',
                      'اكتشفوا توصيات وقواعد RMA لسيارتكم وسكنكم وصحتكم وأنشطتكم المهنية بطنجة.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Tabs Filter */}
        <section className="bg-[#FAFBFD] py-6 border-b border-[#E5ECF6] sticky top-12 lg:top-[46px] z-30 shadow-xs">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-[#0B1E40] text-white shadow-xs'
                  : 'bg-white border border-[#DCE5F2] text-[#455A7D] hover:border-[#D99E26]'
              }`}
            >
              {t3(lang, 'Tous les conseils', 'All Advice', 'جميع النصائح')}
            </button>
            {RMA_ADVICE.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] ?? BookOpen;
              const selected = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selected
                      ? 'bg-gold-pill text-[#0B1E40] shadow-xs'
                      : 'bg-white border border-[#DCE5F2] text-[#455A7D] hover:border-[#D99E26]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.title[lang]}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Advice Content Sections */}
        <section className="bg-white py-12 lg:py-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {filteredCategories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] ?? BookOpen;
              return (
                <div
                  key={cat.id}
                  id={`advice-${cat.id}`}
                  className="rounded-[24px] border border-[#DCE5F2] bg-[#FAFBFD] p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5ECF6] pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#0B1E40] text-[#F4CB64] flex items-center justify-center border border-[#D99E26]/30 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#0B1E40]">
                          {cat.title[lang]}
                        </h2>
                        <p className="text-[13.5px] text-[#455A7D] mt-0.5">
                          {cat.intro[lang]}
                        </p>
                      </div>
                    </div>

                    <a
                      href={cat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DCE5F2] hover:border-[#D99E26] text-[#0B1E40] text-[12.5px] font-bold bg-white transition-colors shrink-0"
                    >
                      <span>{t3(lang, 'Guide officiel RMA', 'Official RMA guide', 'الدليل الرسمي لـ RMA')}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#D99E26]" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cat.items.map((item, idx) => (
                      <div
                        key={item.title.fr}
                        className="bg-white rounded-2xl p-5 border border-[#E6EDF5] shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[12px] font-extrabold text-[#B57D14]">
                              0{idx + 1}
                            </span>
                            <div className="w-6 h-6 rounded-full bg-[#FFF7E2] flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-[#B57D14]" />
                            </div>
                          </div>
                          <h3 className="text-[15.5px] font-extrabold text-[#0B1E40] mb-2 leading-snug">
                            {item.title[lang]}
                          </h3>
                          <p className="text-[13px] text-[#4A5E7F] leading-relaxed">
                            {item.body[lang]}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Emergency Assistance Callout Banner */}
        <section className="bg-[#06132E] py-12 text-white border-t border-[#D99E26]/40">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left rtl:md:text-right">
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#F4CB64]">
                {t3(lang, 'Urgence Sinistre & Assistance 24/7', '24/7 Claims & Emergency Support', 'طوارئ الحوادث والمساعدة 24/7')}
              </p>
              <h2 className="text-[22px] sm:text-[28px] font-extrabold">
                {t3(
                  lang,
                  'Un sinistre automobile, habitation ou professionnel ?',
                  'A motor, home or commercial claim?',
                  'حادث سيارة أو سكن أو نشاط مهني؟'
                )}
              </h2>
              <p className="text-[13.5px] text-slate-300 max-w-xl">
                {t3(
                  lang,
                  `Appelez immédiatement le centre RMA au ${RMA_PHONE} ou notre agence AMEKRAN au 0661 50 89 25 avant toute réparation.`,
                  `Call RMA center at ${RMA_PHONE} or our AMEKRAN agency on 0661 50 89 25 immediately before repairs.`,
                  `اتصلوا فوراً بمركز RMA على ${RMA_PHONE} أو بوكالتنا أمكران على 0661 50 89 25 قبل أي إصلاح.`
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${RMA_PHONE}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-[14px] font-extrabold shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>{RMA_PHONE} (RMA 24/7)</span>
              </a>
              <a
                href="tel:0661508925"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 hover:border-white text-white text-[14px] font-bold"
              >
                <span>0661 50 89 25 (Tanger)</span>
              </a>
            </div>
          </div>
        </section>

        {/* Global RMA FAQs */}
        <section className="bg-[#F6F9FC] py-14 sm:py-16">
          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-[26px] sm:text-[34px] font-extrabold text-[#0B1E40]">
                {t3(lang, 'Questions fréquentes sur vos contrats RMA', 'Frequently Asked Questions on RMA policies', 'الأسئلة الشائعة حول عقود RMA')}
              </h2>
              <p className="text-[14.5px] text-[#4A5E7F] mt-1">
                {t3(
                  lang,
                  'Toutes les réponses pour déclarer vos sinistres et faire valoir vos garanties.',
                  'Everything you need to know about claims and coverages.',
                  'كل الأجوبة للتصريح بالحوادث والاستفادة من الضمانات.'
                )}
              </p>
            </div>

            <div className="space-y-4">
              {RMA_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-[#E6EDF5] overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      className="w-full px-6 py-4 text-left rtl:text-right flex items-center justify-between gap-4 min-h-[64px] cursor-pointer"
                    >
                      <span className="text-[15px] font-bold text-[#0B1E40]">
                        {faq.question[lang]}
                      </span>
                      <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 pt-1 text-[14px] text-[#455A7D] leading-relaxed border-t border-[#EFF4FA]">
                        {faq.answer[lang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <SecondFooter
          lang={lang}
          onSelectSolution={handleSelectSolution}
          onOpenAdvice={() => {}}
          onOpenContact={() => router.push(`/${lang}/#contact-form`)}
        />
      </main>

      <TrustAndFooter lang={lang} />

      <InteractiveModals
        lang={lang}
        modal={modal}
        onClose={() => setModal(null)}
        onSwitchToQuote={(id) => setModal({ type: 'quote', solutionId: id })}
      />
    </div>
  );
}
