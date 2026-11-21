'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

gsap.defaults({ ease: 'power3.out', duration: 0.8 });

/**
 * The footer splash curtain (see `globals.css`) stays full-screen for 0.9s,
 * then slides down over 1.15s, uncovering the page from the top.
 *
 * Hero entrances start as the curtain begins to lift, so the hero blooms into
 * the space being revealed. Section welcomes start a little later, when the
 * curtain is mostly down, so they animate as they come into view and their
 * tail is visible right after it lands.
 */
export const SPLASH_LIFT_MS = 900;
export const SPLASH_SETTLE_MS = 1550;

export { gsap, ScrollTrigger, useGSAP };
