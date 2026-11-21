'use client';

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Hydration-safe replacement for `useReducedMotion()`.
 *
 * Motion's hook reads the media query during the very first client render,
 * while the server always renders as if motion were allowed. Any markup that
 * depends on the result (an `initial` prop, a parallax style…) then differs
 * between the server HTML and the first client render, which React reports as
 * a hydration mismatch.
 *
 * Starting from `false` and syncing after mount keeps the first client render
 * identical to the server one, so the preference can safely drive markup.
 */
export function useHydratedReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const sync = () => setReduced(media.matches);

    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  return reduced;
}
