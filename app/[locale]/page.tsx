import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AmekranLanding from '@/components/AmekranLanding';
import LocaleHtmlSync from '@/components/LocaleHtmlSync';
import { isLocale, localeDir, type Language } from '@/lib/insurance';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'ar') {
    return {
      title: 'AMEKRAN للتأمين | وكالة RMA للتأمين بطنجة',
      description:
        'الوكيل العام لـ RMA للتأمين بطنجة — حماية شاملة: السيارات، الدراجات النارية، السكن، الصحة، الادخار والترفيه.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Amekran Assurances | RMA Assurance Agency in Tangier',
      description:
        'RMA Assurance agency in Tangier — motor, motorcycle, home, health, savings and leisure cover with AMEKRAN Assurances.',
    };
  }
  return {
    title: 'Amekran Assurances | Agence RMA Assurance à Tanger',
    description:
      'Agence RMA Assurance à Tanger — automobile, moto, habitation, santé, épargne et loisirs avec AMEKRAN Assurances.',
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <AmekranLanding initialLang={locale as Language} />
    </>
  );
}
