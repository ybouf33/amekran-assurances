'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, PhoneCall } from 'lucide-react';
import { t3, type Language } from '@/lib/insurance';

/** WhatsApp business line (same as the agency mobile, Morocco +212). */
const WHATSAPP_URL = 'https://wa.me/212661508925';
const LANDLINE_TEL = 'tel:0531400500';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.03-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.53 3.68-8.22 8.21-8.22 2.19 0 4.25.86 5.8 2.41a8.16 8.16 0 0 1 2.4 5.81c0 4.53-3.68 8.22-8.2 8.22Zm4.5-6.15c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2.01-1.24-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.87.85-.87 2.07 0 1.22.9 2.4 1.02 2.56.13.17 1.76 2.69 4.27 3.77.6.26 1.06.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

interface FloatingContactWidgetProps {
  lang: Language;
}

/**
 * Fixed, hover-expanding contact buttons (WhatsApp + landline call), styled
 * after the reference design: gold square icon that widens into a pill with a
 * label on hover / keyboard focus. Positioned above the fixed wave footer.
 */
export default function FloatingContactWidget({
  lang,
}: FloatingContactWidgetProps) {
  const [showGoTop, setShowGoTop] = useState(false);
  const [contactExpanded, setContactExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowGoTop(window.scrollY > 320);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      {/* Contact buttons — both expand together on hover or keyboard focus */}
      <div
        className="fixed right-0 top-1/2 z-[46] flex -translate-y-1/2 flex-col items-end gap-2"
        dir="rtl"
        onMouseEnter={() => setContactExpanded(true)}
        onMouseLeave={() => setContactExpanded(false)}
        onFocusCapture={() => setContactExpanded(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setContactExpanded(false);
          }
        }}
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t3(lang, 'Nous contacter sur WhatsApp', 'Contact us on WhatsApp', 'اتصل بنا عبر واتساب')}
          className={`floating-contact-btn inline-flex h-[52px] items-center overflow-hidden rounded-l-[18px] rounded-r-none bg-[#E5A94E] text-[#0B1E40] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1E40] ${contactExpanded ? 'w-[236px]' : 'w-[52px]'}`}
        >
          <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
          <span
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className={`block w-[184px] shrink-0 whitespace-nowrap ps-1 text-start text-[13px] font-extrabold transition-opacity duration-300 ease-out ${contactExpanded ? 'opacity-100 delay-100' : 'opacity-0'}`}
          >
            {t3(lang, 'Nous contacter', 'Contact us', 'اتصل بنا')}
          </span>
        </a>

        <a
          href={LANDLINE_TEL}
          aria-label={t3(lang, 'Appeler le 0531 400 500', 'Call 0531 400 500', 'اتصل بالرقم 0531 400 500')}
          className={`floating-contact-btn inline-flex h-[52px] items-center overflow-hidden rounded-l-[18px] rounded-r-none bg-[#E5A94E] text-[#0B1E40] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1E40] ${contactExpanded ? 'w-[236px]' : 'w-[52px]'}`}
        >
          <span className="inline-flex h-[48px] w-[48px] shrink-0 items-center justify-center">
            <PhoneCall className="h-6 w-6" strokeWidth={2} />
          </span>
          <span
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className={`block w-[184px] shrink-0 whitespace-nowrap ps-1 text-start text-[13px] font-extrabold transition-opacity duration-300 ease-out ${contactExpanded ? 'opacity-100 delay-100' : 'opacity-0'}`}
          >
            {t3(lang, 'Appeler le 0531 400 500', 'Call 0531 400 500', 'اتصل بـ 0531 400 500')}
          </span>
        </a>
      </div>

      {/* Go-to-top — pinned directly above the fixed wave footer */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={t3(lang, 'Retour en haut', 'Back to top', 'العودة إلى الأعلى')}
        aria-hidden={!showGoTop}
        tabIndex={showGoTop ? 0 : -1}
        className={`fixed bottom-[118px] right-2 z-[46] inline-flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-[#3F51B5] bg-white text-[#3F51B5] shadow-[0_6px_18px_-6px_rgba(11,30,64,0.4)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#F4F6FF] hover:shadow-[0_10px_22px_-6px_rgba(63,81,181,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F51B5] sm:bottom-[132px] sm:right-4 lg:bottom-[150px] lg:right-5 ${
          showGoTop
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-2 opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
      </button>
    </>
  );
}
