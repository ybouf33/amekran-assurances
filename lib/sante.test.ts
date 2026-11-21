import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FAMILY_STATUS_OPTIONS,
  SANTE_COMPARISON_ROWS,
  SANTE_FAQS,
  SANTE_GUARANTEES,
  calculateSanteEstimate,
} from './sante.ts';

test('calculateSanteEstimate scales cleanly by family profile and tier', () => {
  const individualEssential = calculateSanteEstimate({
    status: 'individuel',
    childrenCount: 0,
    tier: 'essentiel',
  });
  const coupleConfort = calculateSanteEstimate({
    status: 'couple',
    childrenCount: 0,
    tier: 'confort',
  });
  const familyIntegrale = calculateSanteEstimate({
    status: 'famille',
    childrenCount: 3,
    tier: 'integrale',
  });

  assert.ok(individualEssential.annualMad >= 1800);
  assert.ok(coupleConfort.annualMad > individualEssential.annualMad);
  assert.ok(familyIntegrale.annualMad > coupleConfort.annualMad);
  assert.equal(individualEssential.consultationRatePercent, 80);
  assert.equal(coupleConfort.consultationRatePercent, 90);
  assert.equal(familyIntegrale.consultationRatePercent, 100);
  assert.ok(familyIntegrale.opticsCeilingMad >= 5000);
  assert.ok(familyIntegrale.dentalCeilingMad >= 8000);
});

test('calculateSanteEstimate handles bounds and children count gracefully', () => {
  const familyZero = calculateSanteEstimate({
    status: 'famille',
    childrenCount: 0,
    tier: 'essentiel',
  });
  const familyTen = calculateSanteEstimate({
    status: 'famille',
    childrenCount: 15,
    tier: 'essentiel',
  });

  assert.ok(Number.isFinite(familyZero.annualMad));
  assert.ok(Number.isFinite(familyTen.annualMad));
  assert.ok(familyTen.annualMad >= familyZero.annualMad);
});

test('sante collections contain complete multilingual entries', () => {
  assert.equal(FAMILY_STATUS_OPTIONS.length, 4);
  assert.equal(SANTE_GUARANTEES.length, 6);
  assert.ok(SANTE_COMPARISON_ROWS.length >= 6);
  assert.ok(SANTE_FAQS.length >= 4);

  for (const g of SANTE_GUARANTEES) {
    assert.ok(g.title.fr.length > 0 && g.title.en.length > 0 && g.title.ar.length > 0);
    assert.ok(g.description.fr.length > 0 && g.description.en.length > 0 && g.description.ar.length > 0);
  }
});
