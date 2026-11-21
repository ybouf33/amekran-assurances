import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HabitationPageClient from '@/components/HabitationPageClient';
import LocaleHtmlSync from '@/components/LocaleHtmlSync';
import { isLocale, localeDir, type Language } from '@/lib/insurance';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'ar') {
    return {
      title: 'تأمين السكن والمسكن المتعدد المخاطر | وكيل AMEKRAN العام بطنجة',
      description:
        'حماية شاملة لمسكنكم في طنجة: الحريق، أضرار المياه، السرقة والمسؤولية المدنية. محاكي الأسعار المباشر وشهادة فورية للقروض البنكية.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Home & Comprehensive Property Insurance | Amekran Assurances Tangier',
      description:
        'Comprehensive home protection in Tangier: fire, water damage, burglary, and family liability. Interactive quote simulator and immediate bank certificates.',
    };
  }
  return {
    title: 'Assurance Habitation & Multirisque Logement | Amekran Assurances Tanger',
    description:
      'Protection complète de votre logement à Tanger : incendie, dégâts des eaux, vol et responsabilité civile. Devis personnalisé et attestation immédiate pour crédit immobilier.',
  };
}

export default async function HabitationPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <HabitationPageClient initialLang={locale as Language} />
    </>
  );
}
