import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AboutPageClient from '@/components/AboutPageClient';
import LocaleHtmlSync from '@/components/LocaleHtmlSync';
import { isLocale, localeDir, type Language } from '@/lib/insurance';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'ar') {
    return {
      title: 'من نحن | AMEKRAN للتأمين — وكالة RMA بطنجة',
      description:
        'تعرف على AMEKRAN للتأمين: وكالة RMA للتأمين بطنجة، أكثر من 20 عاماً من الخبرة، فريق متخصص وحلول تأمينية شاملة.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'About Us | Amekran Assurances — RMA Agency in Tangier',
      description:
        'Discover Amekran Assurances: your RMA Assurance agency in Tangier with 20+ years of expertise, a dedicated team and comprehensive cover.',
    };
  }
  return {
    title: 'À propos | Amekran Assurances — Agence RMA à Tanger',
    description:
      "Découvrez Amekran Assurances : votre agence RMA Assurance à Tanger, plus de 20 ans d'expertise et des solutions complètes pour particuliers et entreprises.",
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <AboutPageClient initialLang={locale as Language} />
    </>
  );
}
