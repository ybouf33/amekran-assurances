export interface WaveAnchorSet {
  y0: number;
  y1: number;
  y2: number;
  y3: number;
  y4: number;
}

export const DESKTOP_RESTING_WAVES = {
  goldMain:
    'M 0 12 C 130 58, 250 66, 400 62 C 550 58, 635 49, 720 49 C 805 49, 890 58, 1040 62 C 1190 66, 1310 58, 1440 12 L 1440 124 L 0 124 Z',
  goldAccent:
    'M 0 24 C 135 64, 260 69, 410 64 C 555 60, 638 52, 720 52 C 802 52, 885 60, 1030 64 C 1180 69, 1305 64, 1440 24 L 1440 124 L 0 124 Z',
  navyFill:
    'M 0 32 C 135 67, 265 71, 415 65 C 560 60, 640 53, 720 53 C 800 53, 880 60, 1025 65 C 1175 71, 1305 67, 1440 32 L 1440 124 L 0 124 Z',
} as const;

export const MOBILE_RESTING_WAVES = {
  // Mobile stacks three footer-bar rows, so the resting crest stays shallow:
  // the navy body must cover the whole bar backdrop (crest dips to ~25/132
  // ≈ 24px, while the bar content starts ≈34px from the box top).
  goldMain:
    'M 0 3 C 75 17, 150 21, 220 18 C 265 16, 282 14, 300 14 C 318 14, 335 16, 380 18 C 450 21, 525 17, 600 3 L 600 132 L 0 132 Z',
  navyFill:
    'M 0 9 C 75 22, 150 25, 220 22 C 265 20, 282 18, 300 18 C 318 18, 335 20, 380 22 C 450 25, 525 22, 600 9 L 600 132 L 0 132 Z',
} as const;

export function buildDesktopSineWavePath(anchors: WaveAnchorSet): string {
  const { y0, y1, y2, y3, y4 } = anchors;
  return `M 0 ${y0} C 150 ${y0}, 250 ${y1}, 400 ${y1} C 530 ${y1}, 600 ${y2}, 720 ${y2} C 840 ${y2}, 910 ${y3}, 1040 ${y3} C 1190 ${y3}, 1290 ${y4}, 1440 ${y4} L 1440 124 L 0 124 Z`;
}

export function buildMobileSineWavePath(anchors: WaveAnchorSet): string {
  const { y0, y1, y2, y3, y4 } = anchors;
  return `M 0 ${y0} C 80 ${y0}, 140 ${y1}, 220 ${y1} C 255 ${y1}, 270 ${y2}, 300 ${y2} C 330 ${y2}, 345 ${y3}, 380 ${y3} C 460 ${y3}, 520 ${y4}, 600 ${y4} L 600 132 L 0 132 Z`;
}

export const DESKTOP_WAVE_KEYFRAMES = {
  times: [0, 0.22, 0.35, 0.48, 0.6, 0.72, 0.85, 1] as number[],
  goldMain: [
    buildDesktopSineWavePath({ y0: 14, y1: 48, y2: 34, y3: 48, y4: 14 }),
    buildDesktopSineWavePath({ y0: 8, y1: 66, y2: 20, y3: 70, y4: 14 }),
    buildDesktopSineWavePath({ y0: 62, y1: 10, y2: 68, y3: 16, y4: 58 }),
    buildDesktopSineWavePath({ y0: 12, y1: 68, y2: 14, y3: 66, y4: 10 }),
    buildDesktopSineWavePath({ y0: 6, y1: 72, y2: 62, y3: 72, y4: 6 }),
    buildDesktopSineWavePath({ y0: 24, y1: 46, y2: 30, y3: 46, y4: 24 }),
    buildDesktopSineWavePath({ y0: 10, y1: 62, y2: 52, y3: 60, y4: 14 }),
    DESKTOP_RESTING_WAVES.goldMain,
  ],
  goldAccent: [
    buildDesktopSineWavePath({ y0: 24, y1: 54, y2: 38, y3: 54, y4: 24 }),
    buildDesktopSineWavePath({ y0: 18, y1: 70, y2: 28, y3: 74, y4: 24 }),
    buildDesktopSineWavePath({ y0: 66, y1: 20, y2: 72, y3: 24, y4: 62 }),
    buildDesktopSineWavePath({ y0: 22, y1: 72, y2: 22, y3: 70, y4: 20 }),
    buildDesktopSineWavePath({ y0: 16, y1: 76, y2: 66, y3: 76, y4: 16 }),
    buildDesktopSineWavePath({ y0: 32, y1: 52, y2: 36, y3: 52, y4: 32 }),
    buildDesktopSineWavePath({ y0: 20, y1: 65, y2: 55, y3: 63, y4: 23 }),
    DESKTOP_RESTING_WAVES.goldAccent,
  ],
  navyFill: [
    buildDesktopSineWavePath({ y0: 32, y1: 58, y2: 40, y3: 58, y4: 32 }),
    buildDesktopSineWavePath({ y0: 26, y1: 74, y2: 34, y3: 78, y4: 32 }),
    buildDesktopSineWavePath({ y0: 70, y1: 28, y2: 76, y3: 32, y4: 66 }),
    buildDesktopSineWavePath({ y0: 30, y1: 76, y2: 30, y3: 74, y4: 28 }),
    buildDesktopSineWavePath({ y0: 24, y1: 78, y2: 69, y3: 78, y4: 24 }),
    buildDesktopSineWavePath({ y0: 38, y1: 56, y2: 40, y3: 56, y4: 38 }),
    buildDesktopSineWavePath({ y0: 28, y1: 67, y2: 57, y3: 65, y4: 30 }),
    DESKTOP_RESTING_WAVES.navyFill,
  ],
};

export const MOBILE_WAVE_KEYFRAMES = {
  times: [0, 0.2, 0.33, 0.45, 0.55, 0.68, 0.8, 1] as number[],
  goldMain: [
    buildMobileSineWavePath({ y0: 6, y1: 26, y2: 18, y3: 26, y4: 6 }),
    buildMobileSineWavePath({ y0: 4, y1: 38, y2: 10, y3: 40, y4: 8 }),
    buildMobileSineWavePath({ y0: 36, y1: 6, y2: 40, y3: 10, y4: 34 }),
    buildMobileSineWavePath({ y0: 6, y1: 38, y2: 8, y3: 36, y4: 6 }),
    buildMobileSineWavePath({ y0: 4, y1: 32, y2: 26, y3: 32, y4: 4 }),
    buildMobileSineWavePath({ y0: 10, y1: 22, y2: 14, y3: 22, y4: 10 }),
    buildMobileSineWavePath({ y0: 4, y1: 25, y2: 19, y3: 25, y4: 4 }),
    MOBILE_RESTING_WAVES.goldMain,
  ],
  navyFill: [
    buildMobileSineWavePath({ y0: 14, y1: 32, y2: 23, y3: 32, y4: 14 }),
    buildMobileSineWavePath({ y0: 12, y1: 43, y2: 17, y3: 45, y4: 16 }),
    buildMobileSineWavePath({ y0: 41, y1: 14, y2: 45, y3: 18, y4: 39 }),
    buildMobileSineWavePath({ y0: 14, y1: 43, y2: 16, y3: 41, y4: 14 }),
    buildMobileSineWavePath({ y0: 12, y1: 37, y2: 31, y3: 37, y4: 12 }),
    buildMobileSineWavePath({ y0: 18, y1: 27, y2: 19, y3: 27, y4: 18 }),
    buildMobileSineWavePath({ y0: 12, y1: 29, y2: 23, y3: 29, y4: 12 }),
    MOBILE_RESTING_WAVES.navyFill,
  ],
};
