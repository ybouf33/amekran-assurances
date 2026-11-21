'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileCheck2,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Shield,
  X,
} from 'lucide-react';
import {
  CoverageTier,
  DEMO_CLIENT_POLICIES,
  INSURANCE_SOLUTIONS,
  Language,
  SolutionId,
  estimateAnnualPremium,
  generateQuoteReference,
  lookupClientPolicy,
  t3,
  validateQuoteInput,
  type ClientPolicyRecord,
} from '@/lib/insurance';

export type ActiveModalType =
  | null
  | { type: 'quote'; solutionId: SolutionId }
  | { type: 'contact' }
  | { type: 'client' }
  | { type: 'advice' };

interface InteractiveModalsProps {
  lang: Language;
  modal: ActiveModalType;
  onClose: () => void;
  onSwitchToQuote: (solutionId: SolutionId) => void;
}

export default function InteractiveModals({
  lang,
  modal,
  onClose,
  onSwitchToQuote,
}: InteractiveModalsProps) {
  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modal, onClose]);

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 bg-[#061430]/60 backdrop-blur-[2px] flex items-center justify-center p-3 sm:p-5"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col"
          >
            {modal.type === 'quote' && (
              <QuoteModalContent
                lang={lang}
                initialSolutionId={modal.solutionId}
                onClose={onClose}
              />
            )}
            {modal.type === 'contact' && (
              <ContactModalContent lang={lang} onClose={onClose} />
            )}
            {modal.type === 'client' && (
              <ClientPortalContent
                lang={lang}
                onClose={onClose}
                onRequestRenewal={() => onSwitchToQuote('automobile')}
              />
            )}
            {modal.type === 'advice' && (
              <AdviceModalContent
                lang={lang}
                onClose={onClose}
                onSelectQuote={onSwitchToQuote}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QuoteModalContent({
  lang,
  initialSolutionId,
  onClose,
}: {
  lang: Language;
  initialSolutionId: SolutionId;
  onClose: () => void;
}) {
  const [solutionId, setSolutionId] = useState<SolutionId>(initialSolutionId);
  const [tier, setTier] = useState<CoverageTier>('confort');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const activeSolution =
    INSURANCE_SOLUTIONS.find((s) => s.id === solutionId) ??
    INSURANCE_SOLUTIONS[0];
  const estimatedMad = estimateAnnualPremium(solutionId, tier);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateQuoteInput(
      { solutionId, tier, fullName, phone, email, notes },
      lang
    );
    if (!validation.valid) {
      setErrors(validation.errors as Record<string, string>);
      return;
    }
    setErrors({});
    setSubmittedRef(generateQuoteReference(solutionId, Date.now()));
  }

  return (
    <>
      <div className="bg-navy-header px-5 py-4 flex items-center justify-between text-white shrink-0">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#F4CB64] font-semibold">
            {t3(
              lang,
              'Amekran Assurances · Tanger',
              'Amekran Assurances · Tangier',
              'AMEKRAN للتأمين · طنجة'
            )}
          </p>
          <h2 className="text-lg font-extrabold tracking-tight">
            {t3(lang, 'Demander un devis personnalisé', 'Request a Custom Quote', 'اطلب عرض سعر مخصص')}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t3(lang, 'Fermer', 'Close', 'إغلاق')}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 overflow-y-auto space-y-4">
        {submittedRef ? (
          <div className="py-4 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#0B1E40]">
              {t3(
                lang,
                'Demande enregistrée avec succès',
                'Quote Request Confirmed',
                'تم تسجيل طلبك بنجاح'
              )}
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {t3(
                lang,
                `Votre conseiller Amekran Assurances à Tanger vous contactera sous 2h ouvrées pour votre dossier ${activeSolution.title.fr}.`,
                `Your Amekran Assurances advisor in Tangier will reach out within 2 business hours regarding ${activeSolution.title.en}.`,
                `سيتواصل معك مستشار AMEKRAN للتأمين بطنجة خلال ساعتين عمل بخصوص ملفك ${activeSolution.title.ar}.`
              )}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF8E5] border border-[#D99E26]/40 text-sm font-bold text-[#0B1E40] tabular-nums">
              <span>{t3(lang, 'Référence :', 'Reference:', 'المرجع:')}</span>
              <span>{submittedRef}</span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#0B1E40] text-white text-sm font-bold hover:bg-[#132E5C] transition-colors cursor-pointer min-h-[44px]"
              >
                {t3(lang, 'Retour à la page', 'Return to page', 'العودة إلى الصفحة')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Solution Select & Live Summary */}
            <div>
              <label
                htmlFor="quote-solution"
                className="block text-xs font-bold text-[#0B1E40] mb-1"
              >
                {t3(lang, 'Solution souhaitée', 'Insurance Solution', 'الحل المرغوب')}
              </label>
              <select
                id="quote-solution"
                value={solutionId}
                onChange={(e) => setSolutionId(e.target.value as SolutionId)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-semibold text-[#0B1E40] focus:outline-none focus:ring-2 focus:ring-[#D99E26]"
              >
                {INSURANCE_SOLUTIONS.map((sol) => (
                  <option key={sol.id} value={sol.id}>
                    {sol.title[lang]} — {sol.subtitle[lang]}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-600">
                {activeSolution.summary[lang]}
              </p>
            </div>

            {/* Coverage Tier Selector */}
            <div>
              <span className="block text-xs font-bold text-[#0B1E40] mb-1.5">
                {t3(lang, 'Niveau de couverture', 'Coverage Tier', 'مستوى التغطية')}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'essentiel', fr: 'Essentiel', en: 'Essential', ar: 'الأساسية' },
                    { id: 'confort', fr: 'Confort', en: 'Comfort', ar: 'المرتاحة' },
                    { id: 'integrale', fr: 'Intégrale', en: 'Comprehensive', ar: 'كل المخاطر' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTier(opt.id)}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer min-h-[40px] ${
                      tier === opt.id
                        ? 'border-[#D99E26] bg-[#FFF7E2] text-[#0B1E40]'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {opt[lang]}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <span className="text-slate-600 font-medium">
                  {t3(
                    lang,
                    'Tarification officielle RMA :',
                    'Official RMA pricing:',
                    'التسعيرة الرسمية لـ RMA:'
                  )}
                </span>
                <span className="font-bold text-[#0B1E40]">
                  {t3(
                    lang,
                    'Étude personnalisée sans engagement',
                    'Custom quote without commitment',
                    'دراسة مخصصة بدون التزام'
                  )}
                </span>
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="quote-fullname"
                  className="block text-xs font-bold text-[#0B1E40] mb-1"
                >
                  {t3(lang, 'Nom complet *', 'Full Name *', 'الاسم الكامل *')}
                </label>
                <input
                  id="quote-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t3(
                    lang,
                    'Ex. Karim El Amrani',
                    'e.g. Karim El Amrani',
                    'مثال: كريم العمراني'
                  )}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-[#0B1E40] focus:outline-none focus:ring-2 focus:ring-[#D99E26]"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="quote-phone"
                  className="block text-xs font-bold text-[#0B1E40] mb-1"
                >
                  {t3(lang, 'Téléphone *', 'Phone Number *', 'الهاتف *')}
                </label>
                <input
                  id="quote-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0661 50 89 25"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-[#0B1E40] tabular-nums focus:outline-none focus:ring-2 focus:ring-[#D99E26]"
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="quote-email"
                className="block text-xs font-bold text-[#0B1E40] mb-1"
              >
                {t3(lang, 'E-mail (optionnel)', 'Email (optional)', 'البريد الإلكتروني (اختياري)')}
              </label>
              <input
                id="quote-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@exemple.ma"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-[#0B1E40] focus:outline-none focus:ring-2 focus:ring-[#D99E26]"
              />
              {errors.email && (
                <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 min-h-[44px] cursor-pointer"
              >
                {t3(lang, 'Annuler', 'Cancel', 'إلغاء')}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-sm font-bold shadow-sm min-h-[44px] cursor-pointer"
              >
                {t3(lang, 'Valider ma demande', 'Submit Request', 'أرسل طلبي')}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

function ContactModalContent({
  lang,
  onClose,
}: {
  lang: Language;
  onClose: () => void;
}) {
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  function handleCallback(e: React.FormEvent) {
    e.preventDefault();
    const cleaned = callbackPhone.replace(/[\s.-]/g, '');
    if (cleaned.length < 9) {
      setPhoneError(
        t3(
          lang,
          'Veuillez entrer un numéro valide.',
          'Please enter a valid phone number.',
          'يرجى إدخال رقم صحيح.'
        )
      );
      return;
    }
    setPhoneError('');
    setCallbackSent(true);
  }

  return (
    <>
      <div className="bg-navy-header px-5 py-4 flex items-center justify-between text-white shrink-0">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#F4CB64] font-semibold">
            {t3(lang, 'Agence Générale Tanger', 'Tangier General Agency', 'الوكالة العامة طنجة')}
          </p>
          <h2 className="text-lg font-extrabold tracking-tight">
            {t3(
              lang,
              'Contacter Amekran Assurances',
              'Contact Amekran Assurances',
              'اتصل بAMEKRAN للتأمين'
            )}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t3(lang, 'Fermer', 'Close', 'إغلاق')}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-4 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="tel:0661508925"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-[#D99E26] bg-slate-50/70 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#0B1E40] text-[#F4CB64] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-semibold">
                {t3(lang, 'Ligne directe', 'Direct Line', 'الخط المباشر')}
              </p>
              <p dir="ltr" className="text-sm font-extrabold text-[#0B1E40] tabular-nums">
                0661 50 89 25
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/212661508925"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-500 bg-emerald-50/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-[#0F8A4B] text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-semibold">WhatsApp</p>
              <p className="text-sm font-extrabold text-[#0B1E40]">
                {t3(lang, 'Écrire sur WhatsApp', 'Chat on WhatsApp', 'راسلنا على واتساب')}
              </p>
            </div>
          </a>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#D99E26] shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#0B1E40]">Tanger :</strong> Avenue Mohammed V,
              Immeuble Al Amal, Tanger 90000, Maroc
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#D99E26] shrink-0 mt-0.5" />
            <span>
              {t3(
                lang,
                'Lundi – Vendredi : 08h30 – 18h30 · Samedi : 09h00 – 13h00',
                'Mon – Fri: 08:30 – 18:30 · Saturday: 09:00 – 13:00',
                'الاثنين – الجمعة: 08:30 – 18:30 · السبت: 09:00 – 13:00'
              )}
            </span>
          </div>
        </div>

        {callbackSent ? (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {t3(
                lang,
                'Demande de rappel envoyée. Un conseiller vous rappelle immédiatement.',
                'Callback request sent. An advisor will call you shortly.',
                'تم إرسال طلب الاتصال. سيتصل بك أحد المستشارين في الحال.'
              )}
            </span>
          </div>
        ) : (
          <form onSubmit={handleCallback} className="space-y-2">
            <label
              htmlFor="callback-phone"
              className="block text-xs font-bold text-[#0B1E40]"
            >
              {t3(lang, 'Être rappelé gratuitement', 'Request a Free Callback', 'اطلب اتصالاً مجانياً')}
            </label>
            <div className="flex gap-2">
              <input
                id="callback-phone"
                type="tel"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="0661 50 89 25"
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-[#D99E26]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-xs font-bold cursor-pointer min-h-[40px] whitespace-nowrap"
              >
                {t3(lang, 'Rappelez-moi', 'Call me back', 'اتصل بي')}
              </button>
            </div>
            {phoneError && (
              <p className="text-[11px] text-red-600">{phoneError}</p>
            )}
          </form>
        )}
      </div>
    </>
  );
}

function ClientPortalContent({
  lang,
  onClose,
  onRequestRenewal,
}: {
  lang: Language;
  onClose: () => void;
  onRequestRenewal: () => void;
}) {
  const [policyInput, setPolicyInput] = useState('RMA-TNG-2026-4812');
  const [foundPolicy, setFoundPolicy] = useState<ClientPolicyRecord | null>(() =>
    lookupClientPolicy('RMA-TNG-2026-4812')
  );
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
    setFoundPolicy(lookupClientPolicy(policyInput));
  }

  return (
    <>
      <div className="bg-navy-header px-5 py-4 flex items-center justify-between text-white shrink-0">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-[#F4CB64] font-semibold">
            {t3(lang, 'Portail Assuré Amekran', 'Amekran Policyholder Portal', 'بوابة زبائن AMEKRAN')}
          </p>
          <h2 className="text-lg font-extrabold tracking-tight">
            {t3(lang, 'Espace client', 'Client Portal', 'فضاء الزبون')}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t3(lang, 'Fermer', 'Close', 'إغلاق')}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-4 overflow-y-auto">
        <form onSubmit={handleSearch} className="space-y-2">
          <label
            htmlFor="policy-lookup"
            className="block text-xs font-bold text-[#0B1E40]"
          >
            {t3(
              lang,
              'Consulter un contrat par N° de police',
              'Look up policy by number',
              'بحث عن وثيقة برقمها'
            )}
          </label>
          <div className="flex gap-2">
            <input
              id="policy-lookup"
              type="text"
              value={policyInput}
              onChange={(e) => setPolicyInput(e.target.value)}
              placeholder="RMA-TNG-2026-4812"
              className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-[#0B1E40] uppercase tabular-nums focus:outline-none focus:ring-2 focus:ring-[#D99E26]"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1E40] text-white text-xs font-bold hover:bg-[#132E5C] cursor-pointer min-h-[42px]"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t3(lang, 'Vérifier', 'Check', 'تحقق')}</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
            <span>{t3(lang, 'Exemples :', 'Samples:', 'أمثلة:')}</span>
            {DEMO_CLIENT_POLICIES.map((p) => (
              <button
                key={p.policyNumber}
                type="button"
                onClick={() => {
                  setPolicyInput(p.policyNumber);
                  setFoundPolicy(p);
                  setSearched(true);
                }}
                className="underline hover:text-[#0B1E40] tabular-nums cursor-pointer"
              >
                {p.policyNumber}
              </button>
            ))}
          </div>
        </form>

        {foundPolicy ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs text-slate-500 font-semibold tabular-nums">
                  {foundPolicy.policyNumber}
                </p>
                <h3 className="text-base font-extrabold text-[#0B1E40]">
                  {foundPolicy.holderName}
                </h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  foundPolicy.status === 'active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {foundPolicy.status === 'active'
                  ? t3(lang, 'Contrat actif', 'Active Policy', 'وثيقة نشطة')
                  : t3(lang, 'Renouvellement proche', 'Renewal Due', 'تجديد قريب')}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 pt-1 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#D99E26]" />
                <span>{foundPolicy.solutionTitle[lang]}</span>
              </div>
              <div className="flex items-center gap-1.5 tabular-nums">
                <FileCheck2 className="w-3.5 h-3.5 text-[#D99E26]" />
                <span>
                  {t3(lang, 'Échéance :', 'Valid until:', 'تاريخ الانتهاء:')}{' '}
                  {foundPolicy.validUntil}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600">{foundPolicy.assetLabel[lang]}</p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onRequestRenewal}
                className="px-4 py-2 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-xs font-bold cursor-pointer min-h-[38px]"
              >
                {t3(
                  lang,
                  'Demander un avenant / renouvellement',
                  'Request Renewal / Update',
                  'طلب تجديد / تعديل'
                )}
              </button>
            </div>
          </div>
        ) : (
          searched && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              {t3(
                lang,
                'Aucun contrat trouvé pour ce numéro. Vérifiez votre référence ou appelez le 0661 50 89 25.',
                'No policy found for that number. Please check your reference or call 0661 50 89 25.',
                'لم يتم العثور على أي وثيقة لهذا الرقم. تحقق من مرجعك أو اتصل بالرقم 0661 50 89 25.'
              )}
            </div>
          )
        )}
      </div>
    </>
  );
}

function AdviceModalContent({
  lang,
  onClose,
  onSelectQuote,
}: {
  lang: Language;
  onClose: () => void;
  onSelectQuote: (id: SolutionId) => void;
}) {
  const guides: Array<{
    title: string;
    detail: string;
    solutionId: SolutionId;
  }> = [
    {
      title: t3(
        lang,
        'Flottes Poids Lourds & Export Tanger Med',
        'Heavy Truck Fleets & Tanger Med Export',
        'أساطيل الشاحنات الثقيلة وتصدير طنجة المتوسط'
      ),
      detail: t3(
        lang,
        'Anticipez la Carte Verte internationale et l’extension marchandise transportée pour éviter toute immobilisation aux frontières.',
        'Combine International Green Card and cargo transit coverage to prevent border delays for cross-Mediterranean haulage.',
        'استبق البطاقة الخضراء الدولية وتمديد تغطية البضائع المنقولة لتجنب أي توقيف على الحدود.'
      ),
      solutionId: 'poids-lourds',
    },
    {
      title: t3(
        lang,
        'Optimiser votre Santé & AMC CNSS',
        'Optimizing Health & AMC CNSS Coverage',
        'تحسين تغطيتك الصحية والتأمين التكميلي CNSS'
      ),
      detail: t3(
        lang,
        'Complétez le remboursement de base AMO/CNSS avec une mutuelle familiale adaptée aux soins dentaires, optiques et hospitalisation.',
        'Bridge basic AMO/CNSS reimbursements with family or corporate supplementary health coverage for dental, optical, and hospital care.',
        'أكمل تعويضات AMO/CNSS الأساسية بتأمين تكميلي عائلي يغطي العلاجات السنية والبصرية والاستشفاء.'
      ),
      solutionId: 'sante-cnss',
    },
    {
      title: t3(
        lang,
        'Obligations Employeur : Accidents du Travail',
        'Employer Obligations: Workplace Accidents',
        'التزامات صاحب العمل: حوادث الشغل'
      ),
      detail: t3(
        lang,
        'Protégez vos salariés dès le premier jour d’embauche sur chantier ou en entreprise et sécurisez votre responsabilité employeur.',
        'Protect every employee from day one on job sites or offices while safeguarding employer statutory compliance.',
        'احمِ موظفيك من اليوم الأول للتوظيف في الورش أو المؤسسة واضمن مسؤوليتك كصاحب عمل.'
      ),
      solutionId: 'accidents-travail',
    },
  ];

  return (
    <>
      <div className="bg-navy-header px-5 py-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-[#F4CB64]" />
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#F4CB64] font-semibold">
              {t3(lang, 'Expertise 20+ ans', '20+ Years Advisory', 'خبرة تفوق 20 عاماً')}
            </p>
            <h2 className="text-lg font-extrabold tracking-tight">
              {t3(lang, 'Nos conseils assurance', 'Insurance Advisory', 'نصائحنا في التأمين')}
            </h2>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t3(lang, 'Fermer', 'Close', 'إغلاق')}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-3 overflow-y-auto">
        {guides.map((g) => (
          <div
            key={g.solutionId}
            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <h3 className="text-sm font-extrabold text-[#0B1E40]">{g.title}</h3>
              <p className="text-xs text-slate-600 mt-1">{g.detail}</p>
            </div>
            <button
              type="button"
              onClick={() => onSelectQuote(g.solutionId)}
              className="px-3.5 py-2 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer min-h-[38px]"
            >
              {t3(lang, 'Voir tarif', 'Get Quote', 'اعرض السعر')}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
