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
      title: 'تأمين النقل البحري والبضائع بطنجة المتوسط | وكيل عام RMA - AMEKRAN',
      description:
        'تأمين شحنات الاستيراد والتصدير، البضائع المنقولة بحراً وحاويات الشحن عبر ميناء طنجة المتوسط طبقاً للاتفاقيات الدولية مع RMA.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Marine Cargo & Freight Insurance in Tangier Med | RMA Agent AMEKRAN',
      description:
        'Import-export cargo insurance, containerised freight and transit cover through Tanger Med port under international maritime clauses with RMA.',
    };
  }
  return {
    title: 'Assurance Transport Maritime & Marchandises Tanger Med | Agent Général RMA AMEKRAN',
    description:
      'Couverture complète pour l’import-export, le transit et le fret conteneurisé via le Port Tanger Med selon les conventions maritimes internationales avec RMA.',
  };
}

export default async function AssuranceMaritimePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <EnterprisePageClient serviceId="maritime" initialLang={locale as Language} />
    </>
  );
}
