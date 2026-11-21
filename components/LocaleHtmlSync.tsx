'use client';

import { useEffect } from 'react';

/** Keeps <html lang> and <html dir> in sync with the active locale. */
export default function LocaleHtmlSync({
  locale,
  dir,
}: {
  locale: string;
  dir: 'ltr' | 'rtl';
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);
  return null;
}
