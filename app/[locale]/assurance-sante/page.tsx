import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SantePageClient from '@/components/SantePageClient';
import LocaleHtmlSync from '@/components/LocaleHtmlSync';
import { isLocale, localeDir, type Language } from '@/lib/insurance';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'ar') {
    return {
      title: 'تأمين الصحة والتأمين التكميلي CNSS | وكيل AMEKRAN العام بطنجة',
      description:
        'تغطية صحية تكميلية شاملة في طنجة: مكمل AMO/CNSS حتى 100%، استشفاء بالمصحات الخاصة بدون تسبيق مالي (الثالث المؤدي)، وباقات معززة للنظارات والأسنان.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Health & Supplementary AMO/CNSS Insurance | Amekran Assurances Tangier',
      description:
        'Top-up health insurance in Tangier: up to 100% AMO/CNSS reimbursement, direct clinic billing (Tiers Payant), and generous optical and dental coverage.',
    };
  }
  return {
    title: 'Assurance Santé & AMC CNSS Complémentaire | Amekran Assurances Tanger',
    description:
      'Complémentaire santé optimale à Tanger : complément AMO/CNSS jusqu’à 100%, tiers payant en clinique privée sans avance de frais, et forfaits optique/dentaire renforcés.',
  };
}

export default async function SantePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <SantePageClient initialLang={locale as Language} />
    </>
  );
}
