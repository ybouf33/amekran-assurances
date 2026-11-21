import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/insurance';

/**
 * Every route lives under a locale prefix (/fr, /ar, /en).
 * Bare paths are redirected to the default locale (/fr).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and static files (anything with a dot).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
