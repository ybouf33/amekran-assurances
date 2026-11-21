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
      title: 'تأمين الشركات والمهنيين بطنجة | وكيل عام RMA Assurance - AMEKRAN',
      description:
        'حلول تأمين الشركات والمصانع والمقرات في طنجة: متعدد المخاطر المهنية، المسؤولية المدنية، خسارة النشاط وتأمين المعدات عبر RMA.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Business & Commercial Insurance in Tangier | RMA Agent AMEKRAN',
      description:
        'Comprehensive business and commercial cover in Tangier: property, general liability, machinery breakdown and business interruption with RMA.',
    };
  }
  return {
    title: 'Assurance Entreprises & Professionnels à Tanger | Agent Général RMA AMEKRAN',
    description:
      'Protection sur mesure pour entreprises, PME et industriels à Tanger : multirisque professionnelle, RC exploitation, bris de machine et perte d’exploitation avec RMA.',
  };
}

export default async function AssuranceEntreprisesPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <EnterprisePageClient serviceId="entreprises" initialLang={locale as Language} />
    </>
  );
}
