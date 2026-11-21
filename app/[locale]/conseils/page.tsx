import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdvicePageClient from '@/components/AdvicePageClient';
import LocaleHtmlSync from '@/components/LocaleHtmlSync';
import { isLocale, localeDir, type Language } from '@/lib/insurance';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'ar') {
    return {
      title: 'نصائح وإرشادات التأمين | وكيل عام RMA Assurance - AMEKRAN طنجة',
      description:
        'أهم القواعد والإرشادات للتأمين السليم والتصريح بالحوادث للسيارات، السكن، الصحة والشركات من RMA Assurance وأمكران للتأمينات.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Insurance Advice & Guides | RMA General Agent AMEKRAN Tangier',
      description:
        'Practical habits, claims rules and insurance guidance for motor, home, health and commercial policies with RMA Assurance.',
    };
  }
  return {
    title: 'Nos Conseils d’Assurance & Guides RMA | Agent Général AMEKRAN Tanger',
    description:
      'Les bons réflexes pour être bien assuré et indemnisé sans surprise : guides auto, habitation, santé, épargne et entreprises avec RMA Assurance.',
  };
}

export default async function ConseilsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <AdvicePageClient initialLang={locale as Language} />
    </>
  );
}
