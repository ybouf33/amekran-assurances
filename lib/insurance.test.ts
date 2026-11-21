import test from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateAnnualPremium,
  generateQuoteReference,
  lookupClientPolicy,
  validateQuoteInput,
} from './insurance.ts';

import {
  DESKTOP_RESTING_WAVES,
  DESKTOP_WAVE_KEYFRAMES,
  MOBILE_RESTING_WAVES,
  MOBILE_WAVE_KEYFRAMES,
} from './waves.ts';

test('validateQuoteInput accepts valid Moroccan phone and optional empty email', () => {
  const res = validateQuoteInput({
    solutionId: 'poids-lourds',
    tier: 'confort',
    fullName: 'Youssef Benali',
    phone: '0661 50 89 25',
    email: '',
  });
  assert.equal(res.valid, true);
  assert.deepEqual(res.errors, {});
});

test('validateQuoteInput rejects invalid phone and short name', () => {
  const res = validateQuoteInput({
    solutionId: 'automobile',
    tier: 'essentiel',
    fullName: 'A',
    phone: '1234',
    email: 'bad-email',
  });
  assert.equal(res.valid, false);
  assert.ok(res.errors.fullName);
  assert.ok(res.errors.phone);
  assert.ok(res.errors.email);
});

test('estimateAnnualPremium scales cleanly by coverage tier', () => {
  const base = estimateAnnualPremium('poids-lourds', 'essentiel');
  const confort = estimateAnnualPremium('poids-lourds', 'confort');
  const integrale = estimateAnnualPremium('poids-lourds', 'integrale');
  assert.equal(base, 7800);
  assert.ok(confort > base);
  assert.ok(integrale > confort);
});

test('generateQuoteReference formats deterministic solution prefix', () => {
  const ref = generateQuoteReference('maritime', 123456);
  assert.equal(ref, 'AMK-MAR-3456');
});

test('lookupClientPolicy matches case-insensitively and returns null for unknown IDs', () => {
  const found = lookupClientPolicy('rma-tng-2026-4812');
  assert.ok(found);
  assert.equal(found?.holderName, 'Karim El Amrani');
  assert.equal(lookupClientPolicy('UNKNOWN-000'), null);
});

function extractSvgSignature(d: string): string {
  return d.replace(/-?\d+(\.\d+)?/g, '#');
}

test('desktop and mobile wave keyframes preserve identical SVG command signatures and end on resting footer waves', () => {
  const expectedSig = extractSvgSignature(DESKTOP_RESTING_WAVES.goldMain);
  for (const series of [
    DESKTOP_WAVE_KEYFRAMES.goldMain,
    DESKTOP_WAVE_KEYFRAMES.goldAccent,
    DESKTOP_WAVE_KEYFRAMES.navyFill,
  ]) {
    assert.equal(series.length, DESKTOP_WAVE_KEYFRAMES.times.length);
    for (const path of series) {
      assert.equal(extractSvgSignature(path), expectedSig);
    }
  }
  assert.equal(
    DESKTOP_WAVE_KEYFRAMES.goldMain.at(-1),
    DESKTOP_RESTING_WAVES.goldMain
  );
  assert.equal(
    DESKTOP_WAVE_KEYFRAMES.goldAccent.at(-1),
    DESKTOP_RESTING_WAVES.goldAccent
  );
  assert.equal(
    DESKTOP_WAVE_KEYFRAMES.navyFill.at(-1),
    DESKTOP_RESTING_WAVES.navyFill
  );

  const mobileSig = extractSvgSignature(MOBILE_RESTING_WAVES.goldMain);
  for (const series of [
    MOBILE_WAVE_KEYFRAMES.goldMain,
    MOBILE_WAVE_KEYFRAMES.navyFill,
  ]) {
    assert.equal(series.length, MOBILE_WAVE_KEYFRAMES.times.length);
    for (const path of series) {
      assert.equal(extractSvgSignature(path), mobileSig);
    }
  }
  assert.equal(
    MOBILE_WAVE_KEYFRAMES.goldMain.at(-1),
    MOBILE_RESTING_WAVES.goldMain
  );
  assert.equal(
    MOBILE_WAVE_KEYFRAMES.navyFill.at(-1),
    MOBILE_RESTING_WAVES.navyFill
  );
});
