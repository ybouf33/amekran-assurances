import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cinzel, Cairo } from 'next/font/google';
import MotionProvider from '@/components/MotionProvider';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display-serif',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amekran Assurances | Agence RMA Assurance à Tanger',
  description:
    'Agence RMA Assurance à Tanger — AMEKRAN Assurances, Agent Général : automobile, moto, habitation, santé, épargne et loisirs.',
  openGraph: {
    title: 'Amekran Assurances | Agence RMA Assurance à Tanger',
    description:
      'Agence RMA Assurance à Tanger — 20 ans d’expertise en assurance particuliers, flottes, santé et entreprises.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amekran Assurances | Agence RMA Assurance à Tanger',
    description:
      'Agence RMA Assurance à Tanger — automobile, moto, habitation, santé, épargne et loisirs.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      dir="ltr"
      className={`${plusJakarta.variable} ${cinzel.variable} ${cairo.variable}`}
    >
      <body
        className="font-sans antialiased bg-white text-[#0B1E40] selection:bg-[#E7B94B]/30 selection:text-[#0B1E40]"
        suppressHydrationWarning
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
