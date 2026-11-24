import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EnterprisePageClient from '@/components/EnterprisePageClient';
import LocaleHtmlSync from '@/components/LocaleHtmlSync';
import { isLocale, localeDir, type Language } from '@/lib/insurance';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'ar') {
    return {
      title: 'تأمين الشاحنات الثقيلة والأساطيل بطنجة | وكيل عام AMEKRAN - AMEKRAN',
      description:
        'حلول تأمين الشاحنات، الجرارات، المقطورات وأساطيل النقل الدولي TIR انطلاقاً من ميناء طنجة المتوسط مع البطاقة الخضراء الدولية عبر AMEKRAN.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Heavy Truck & Fleet Insurance in Tangier | AMEKRAN Agent AMEKRAN',
      description:
        'Benchmark heavy commercial vehicle and fleet cover out of Tanger Med: tractors, trailers, rigids and international TIR Green Card with AMEKRAN.',
    };
  }
  return {
    title: 'Assurance Poids Lourds & Flottes à Tanger | AMEKRAN Assurances AMEKRAN',
    description:
      'La référence pour l’assurance des transporteurs routiers, tracteurs, semi-remorques et flottes TIR au départ de Tanger Med avec Carte Verte AMEKRAN.',
  };
}

export default async function AssurancePoidsLourdsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <EnterprisePageClient serviceId="poids-lourds" initialLang={locale as Language} />
    </>
  );
}
