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
      title: 'تأمين حوادث الشغل بطنجة (القانون 18-12) | وكيل عام RMA - AMEKRAN',
      description:
        'التأمين القانوني الإلزامي لحوادث الشغل والأمراض المهنية لأرباب العمل والشركات في طنجة طبقاً للقانون 18-12 عبر RMA Assurance.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Workplace Accident Insurance in Tangier (Law 18-12) | RMA Agent AMEKRAN',
      description:
        'Statutory employer liability and employee protection under Moroccan Law 18-12: medical care, sick leave allowances and disability pensions with RMA.',
    };
  }
  return {
    title: 'Assurance Accidents du Travail à Tanger (Loi 18-12) | Agent Général RMA AMEKRAN',
    description:
      'Couverture obligatoire des salariés selon la loi 18-12 et le Code du Travail : frais médicaux, indemnités journalières et rentes légales avec RMA Assurance.',
  };
}

export default async function AssuranceAccidentsTravailPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <EnterprisePageClient serviceId="accidents-travail" initialLang={locale as Language} />
    </>
  );
}
