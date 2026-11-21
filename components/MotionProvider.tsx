'use client';

import { MotionConfig } from 'motion/react';

/**
 * Global motion policy.
 *
 * `reducedMotion="user"` disables transform/layout animations for visitors who
 * asked their OS for less motion (opacity transitions still play). Keeping this
 * in one place means components can use constant `initial` values — branching
 * those on the media query is what caused the server/client hydration mismatch.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
