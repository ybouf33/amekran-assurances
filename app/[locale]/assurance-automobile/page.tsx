import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AutomobileOffersPage from '@/components/AutomobileOffersPage';
import LocaleHtmlSync from '@/components/LocaleHtmlSync';
import { isLocale, localeDir, type Language } from '@/lib/insurance';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale === 'ar') {
    return {
      title: 'تأمين السيارات — العروض والتخفيضات | وكيل AMEKRAN العام بطنجة',
      description:
        'عروض وتخفيضات حصرية على تأمين السيارات في طنجة: شركاء البنوك (Bank of Africa، Attijariwafa…)، خصم الوفاء، تخفيضات الأساطيل والدفع نقداً.',
    };
  }
  if (locale === 'en') {
    return {
      title: 'Motor Insurance — Offers & Discounts | Amekran Assurances',
      description:
        'Exclusive offers and discounts on motor insurance in Tangier: bank partners (Bank of Africa, Attijariwafa…), loyalty bonus, fleet and upfront-payment discounts.',
    };
  }
  return {
    title: 'Assurance Automobile — Offres & Réductions | Amekran Assurances',
    description:
      'Offres et réductions exclusives sur votre assurance automobile à Tanger : partenaires bancaires (Bank of Africa, Attijariwafa…), bonus fidélité, remises flottes et paiement comptant.',
  };
}

export default async function AutomobileOffers({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlSync locale={locale} dir={localeDir(locale)} />
      <AutomobileOffersPage initialLang={locale as Language} />
    </>
  );
}
