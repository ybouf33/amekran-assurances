'use client';

import { useRef, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  User,
} from 'lucide-react';
import { INSURANCE_SOLUTIONS, t3, type Language } from '@/lib/insurance';
import { gsap, useGSAP } from '@/lib/gsap';

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

const COPY = {
  eyebrow: {
    fr: 'Agence Générale Tanger',
    en: 'Tangier General Agency',
    ar: 'الوكالة العامة طنجة',
  },
  title: {
    fr: 'Une question ? Écrivez-nous',
    en: 'A question? Write to us',
    ar: 'لديك سؤال؟ راسلنا',
  },
  subtitle: {
    fr: 'Remplissez le formulaire ci-dessous et un conseiller Amekran vous répond sous 24h ouvrées.',
    en: 'Fill in the form below and an Amekran advisor will reply within 24 working hours.',
    ar: 'املأ النموذج أدناه وسيرد عليك أحد مستشاري AMEKRAN خلال 24 ساعة عمل.',
  },
  formTitle: {
    fr: 'Formulaire de contact',
    en: 'Contact form',
    ar: 'نموذج الاتصال',
  },
  fullName: { fr: 'Nom complet', en: 'Full name', ar: 'الاسم الكامل' },
  fullNamePlaceholder: {
    fr: 'Votre nom et prénom',
    en: 'Your first and last name',
    ar: 'اسمك و لقبك',
  },
  phone: { fr: 'Téléphone', en: 'Phone', ar: 'الهاتف' },
  phonePlaceholder: { fr: '06 12 34 56 78', en: '06 12 34 56 78', ar: '06 12 34 56 78' },
  email: { fr: 'E-mail (facultatif)', en: 'Email (optional)', ar: 'البريد الإلكتروني (اختياري)' },
  emailPlaceholder: { fr: 'vous@exemple.ma', en: 'you@example.ma', ar: 'you@example.ma' },
  subject: { fr: 'Sujet', en: 'Subject', ar: 'الموضوع' },
  message: { fr: 'Votre message', en: 'Your message', ar: 'رسالتك' },
  messagePlaceholder: {
    fr: 'Décrivez votre besoin en quelques mots…',
    en: 'Describe your needs in a few words…',
    ar: 'اشرح احتياجك في بضع كلمات…',
  },
  submit: { fr: 'Envoyer le message', en: 'Send message', ar: 'إرسال الرسالة' },
  sending: { fr: 'Envoi…', en: 'Sending…', ar: 'جارٍ الإرسال…' },
  directLine: { fr: 'Ligne directe', en: 'Direct line', ar: 'الخط المباشر' },
  whatsapp: { fr: 'WhatsApp', en: 'WhatsApp', ar: 'WhatsApp' },
  whatsappCta: { fr: 'Écrire sur WhatsApp', en: 'Chat on WhatsApp', ar: 'راسلنا على واتساب' },
  address: { fr: 'Adresse', en: 'Address', ar: 'العنوان' },
  hours: { fr: 'Horaires', en: 'Opening hours', ar: 'أوقات العمل' },
  hoursValue: {
    fr: 'Lundi – Vendredi : 08h30 – 18h30 · Samedi : 09h00 – 13h00',
    en: 'Mon – Fri: 08:30 – 18:30 · Sat: 09:00 – 13:00',
    ar: 'الاثنين – الجمعة: 08:30 – 18:30 · السبت: 09:00 – 13:00',
  },
  successTitle: { fr: 'Message envoyé !', en: 'Message sent!', ar: 'تم إرسال الرسالة!' },
  successBody: {
    fr: 'Merci de nous avoir contactés. Un conseiller Amekran vous répond sous 24h ouvrées.',
    en: 'Thank you for reaching out. An Amekran advisor will reply within 24 working hours.',
    ar: 'شكراً لتواصلكم معنا. سيرد عليك أحد مستشاري AMEKRAN خلال 24 ساعة عمل.',
  },
  again: {
    fr: 'Envoyer un autre message',
    en: 'Send another message',
    ar: 'إرسال رسالة أخرى',
  },
} as const;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface ContactSectionProps {
  lang: Language;
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState<string>('general');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<'fullName' | 'phone' | 'email' | 'message', string>>
  >({});
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  // Footer-style wave intro for the card corner: on first scroll into view
  // the ribbon starts as a flat strip spanning the whole card, then rises and
  // contracts right→left into its resting gull-wing in the corner.
  useGSAP(
    () => {
      const wave = waveRef.current;
      const card = formCardRef.current;
      if (!wave || !card) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rtl = lang === 'ar';
      const origin = rtl ? 'left bottom' : 'right bottom';

      gsap.fromTo(
        wave,
        {
          transformOrigin: origin,
          scaleX: 1,
          scaleY: 0.055,
          autoAlpha: 0.85,
        },
        {
          scaleX: 0.68,
          scaleY: 1,
          autoAlpha: 1,
          duration: 1.15,
          ease: 'power2.inOut',
          delay: 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none play reset',
          },
        }
      );
    },
    { scope: formCardRef }
  );

  // Success panel blooms in when the form is submitted.
  useGSAP(
    () => {
      if (!sent || !successRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const badge = successRef.current.querySelector('[data-success-badge]');
      gsap.fromTo(
        successRef.current,
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
      if (badge) {
        gsap.fromTo(
          badge,
          { scale: 0.6, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.55,
            ease: 'back.out(2.2)',
            delay: 0.1,
          }
        );
      }
    },
    { dependencies: [sent] }
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};

    if (fullName.trim().length < 2) {
      nextErrors.fullName = t3(
        lang,
        'Veuillez saisir votre nom complet.',
        'Please enter your full name.',
        'يرجى إدخال اسمك الكامل.'
      );
    }

    const cleaned = (phone || '').replace(/[\s.-]/g, '');
    const moroccanPhoneRegex = /^(\+212|00212|0)(5|6|7)\d{8}$/;
    const intlPhoneRegex = /^\+?\d{9,15}$/;
    if (!cleaned || (!moroccanPhoneRegex.test(cleaned) && !intlPhoneRegex.test(cleaned))) {
      nextErrors.phone = t3(
        lang,
        'Veuillez entrer un numéro de téléphone valide.',
        'Please enter a valid phone number.',
        'يرجى إدخال رقم هاتف صحيح.'
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t3(
        lang,
        'Adresse e-mail invalide.',
        'Invalid email address.',
        'عنوان البريد الإلكتروني غير صحيح.'
      );
    }

    if (message.trim().length < 10) {
      nextErrors.message = t3(
        lang,
        'Votre message doit contenir au moins 10 caractères.',
        'Your message must be at least 10 characters long.',
        'يجب أن تحتوي رسالتك على 10 أحرف على الأقل.'
      );
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      // No backend yet — the demo success state confirms the submission.
      setSent(true);
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0B1E40] placeholder:text-slate-400 outline-none transition-colors focus:border-[#D99E26] focus:ring-2 focus:ring-[#E7B94B]/25 ${
      hasError ? 'border-red-400' : 'border-slate-200'
    }`;

  return (
    <section
      id="contact-form"
      className="py-14 lg:py-20 bg-slate-50 scroll-mt-[125px] lg:scroll-mt-[129px]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading — same gold-bars style as the other sections */}
        <div data-gsap-reveal className="text-center">
          <div
            data-gsap-item
            className="flex items-center justify-center gap-4 sm:gap-6"
          >
            <span
              aria-hidden="true"
              data-gsap-line
              data-line-origin={lang === 'ar' ? 'left center' : 'right center'}
              className="hidden sm:block h-[3px] w-24 lg:w-40 bg-gold-divider rounded-full"
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E40] text-center">
              {COPY.title[lang]}
            </h2>
            <span
              aria-hidden="true"
              data-gsap-line
              data-line-origin={lang === 'ar' ? 'right center' : 'left center'}
              className="hidden sm:block h-[3px] w-24 lg:w-40 bg-gold-divider rounded-full"
            />
          </div>
          <p
            data-gsap-item
            className="mt-4 max-w-2xl mx-auto text-center text-sm sm:text-base text-slate-600 leading-relaxed"
          >
            {COPY.subtitle[lang]}
          </p>
        </div>

        <div
          data-gsap-reveal
          className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6"
        >
          {/* ---------------- Info panel ---------------- */}
          <aside
            data-gsap-item
            className="relative overflow-hidden rounded-[24px] bg-navy-header text-white p-7 lg:p-9"
          >
            {/* Soft gold glow, purely decorative */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#D99E26]/15 blur-3xl"
            />
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F4CB64]">
              {COPY.eyebrow[lang]}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight">
              {t3(
                lang,
                'Parlons de votre assurance',
                'Let’s talk about your insurance',
                'لنتحدث عن تأمينك'
              )}
            </h3>

            <div className="mt-8 space-y-3">
              <a
                href="tel:0661508925"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold-pill text-[#0B1E40] shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <span>
                  <span className="block text-[11px] text-white/60 font-semibold">
                    {COPY.directLine[lang]}
                  </span>
                  <span dir="ltr" className="block text-sm font-extrabold tabular-nums text-white">
                    0661 50 89 25
                  </span>
                </span>
              </a>

              <a
                href="https://wa.me/212661508925"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gold-pill text-[#0B1E40] shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <span>
                  <span className="block text-[11px] text-white/60 font-semibold">
                    WhatsApp
                  </span>
                  <span className="block text-sm font-extrabold text-white">
                    {COPY.whatsappCta[lang]}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-[#F4CB64] shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <span>
                  <span className="block text-[11px] text-white/60 font-semibold">
                    {COPY.address[lang]}
                  </span>
                  <span className="block text-[13px] font-semibold text-white/90">
                    Avenue Mohammed V, Immeuble Al Amal, Tanger 90000, Maroc
                  </span>
                </span>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-[#F4CB64] shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                <span>
                  <span className="block text-[11px] text-white/60 font-semibold">
                    {COPY.hours[lang]}
                  </span>
                  <span className="block text-[13px] font-semibold text-white/90">
                    {COPY.hoursValue[lang]}
                  </span>
                </span>
              </div>
            </div>
          </aside>

          {/* ---------------- Form card ---------------- */}
          <div
            ref={formCardRef}
            data-gsap-item
            className="relative overflow-hidden rounded-[24px] bg-white border border-slate-200/85 shadow-card-soft p-6 sm:p-8"
          >
            {/* Decorative gold-ribbon navy wave in the bottom corner,
                echoing the footer wave. Purely ornamental. */}
            <div
              ref={waveRef}
              aria-hidden="true"
              className="contact-corner-wave pointer-events-none select-none absolute inset-x-0 bottom-0 h-[104px] sm:h-[120px] will-change-transform"
            >
              <svg
                viewBox="0 0 470 120"
                preserveAspectRatio="none"
                className="w-full h-full rtl:-scale-x-100"
              >
                <defs>
                  <linearGradient
                    id="contactCornerGold"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#D39623" />
                    <stop offset="35%" stopColor="#FCE491" />
                    <stop offset="62%" stopColor="#D9A02B" />
                    <stop offset="100%" stopColor="#F5CE67" />
                  </linearGradient>
                  <linearGradient
                    id="contactCornerNavy"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#0B224D" />
                    <stop offset="100%" stopColor="#061430" />
                  </linearGradient>
                  {/* Fades the flourish in from the left so it dissolves into
                      the white card instead of ending on a hard vertical edge. */}
                  <linearGradient
                    id="contactCornerFade"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0.45" />
                    <stop offset="46%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>
                  <mask id="contactCornerMask" maskUnits="userSpaceOnUse">
                    <rect
                      x="0"
                      y="0"
                      width="470"
                      height="120"
                      fill="url(#contactCornerFade)"
                    />
                  </mask>
                </defs>

                <g mask="url(#contactCornerMask)">
                  {/* Deep navy body rising from the bottom edge */}
                  <path
                    d="M 0 120 C 96 116 150 100 214 74 C 300 40 370 18 470 8 L 470 120 Z"
                    fill="url(#contactCornerNavy)"
                  />

                  {/* Metallic gold ribbon tracing the crest */}
                  <path
                    d="M 0 112 C 96 108 150 92 214 66 C 300 32 370 10 470 0"
                    fill="none"
                    stroke="url(#contactCornerGold)"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />

                  {/* Pale specular sheen above the ribbon */}
                  <path
                    d="M 0 104 C 96 100 150 84 214 58 C 300 25 370 4 470 -6"
                    fill="none"
                    stroke="#FFF3C9"
                    strokeOpacity="0.55"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>

            {sent ? (
              <div
                ref={successRef}
                className="h-full flex flex-col items-center justify-center text-center py-10"
              >
                <span
                  data-success-badge
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FDF1D4] border border-[#E7B94B]/50"
                >
                  <CheckCircle2 className="w-8 h-8 text-[#D99E26]" />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-[#0B1E40]">
                  {COPY.successTitle[lang]}
                </h3>
                <p className="mt-2 max-w-md text-sm text-slate-600 leading-relaxed">
                  {COPY.successBody[lang]}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setFullName('');
                    setPhone('');
                    setEmail('');
                    setSubject('general');
                    setMessage('');
                  }}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D99E26]/60 text-[#0B1E40] text-[13px] font-bold hover:bg-[#FDF1D4]/60 transition-colors cursor-pointer"
                >
                  {COPY.again[lang]}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <h3 className="text-base font-extrabold text-[#0B1E40]">
                  {COPY.formTitle[lang]}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="flex items-center gap-1.5 text-xs font-bold text-[#0B1E40] mb-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#D99E26]" />
                      {COPY.fullName[lang]} <span className="text-[#D99E26]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={COPY.fullNamePlaceholder[lang]}
                      className={inputClass(!!errors.fullName)}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11.5px] font-semibold text-red-600">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="flex items-center gap-1.5 text-xs font-bold text-[#0B1E40] mb-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D99E26]" />
                      {COPY.phone[lang]} <span className="text-[#D99E26]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={COPY.phonePlaceholder[lang]}
                      className={inputClass(!!errors.phone)}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11.5px] font-semibold text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="flex items-center gap-1.5 text-xs font-bold text-[#0B1E40] mb-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D99E26]" />
                      {COPY.email[lang]}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={COPY.emailPlaceholder[lang]}
                      className={inputClass(!!errors.email)}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11.5px] font-semibold text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="flex items-center gap-1.5 text-xs font-bold text-[#0B1E40] mb-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#D99E26]" />
                      {COPY.subject[lang]}
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={inputClass(false)}
                    >
                      <option value="general">
                        {t3(lang, 'Question générale', 'General question', 'سؤال عام')}
                      </option>
                      {INSURANCE_SOLUTIONS.map((solution) => (
                        <option key={solution.id} value={solution.id}>
                          {solution.title[lang]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="flex items-center gap-1.5 text-xs font-bold text-[#0B1E40] mb-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-[#D99E26]" />
                    {COPY.message[lang]} <span className="text-[#D99E26]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={COPY.messagePlaceholder[lang]}
                    className={`${inputClass(!!errors.message)} resize-y min-h-[96px]`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11.5px] font-semibold text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  data-magnetic
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold-pill hover:bg-gold-pill-hover text-[#0B1E40] text-sm font-bold shadow-[0_6px_18px_rgba(217,158,38,0.45)] transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {COPY.submit[lang]}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
