import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HABITATION_COMPARISON_ROWS,
  HABITATION_FAQS,
  HABITATION_GUARANTEES,
  calculateHabitationEstimate,
} from './habitation.ts';

test('calculateHabitationEstimate scales cleanly by property type, occupancy, and tier', () => {
  const tenantEssential = calculateHabitationEstimate({
    propertyType: 'appartement',
    occupancy: 'locataire',
    surfaceSqm: 85,
    tier: 'essentiel',
  });
  const ownerConfort = calculateHabitationEstimate({
    propertyType: 'appartement',
    occupancy: 'proprietaire',
    surfaceSqm: 85,
    tier: 'confort',
  });
  const villaIntegrale = calculateHabitationEstimate({
    propertyType: 'villa',
    occupancy: 'proprietaire',
    surfaceSqm: 320,
    tier: 'integrale',
  });

  assert.ok(tenantEssential.annualMad >= 650);
  assert.ok(ownerConfort.annualMad > tenantEssential.annualMad);
  assert.ok(villaIntegrale.annualMad > ownerConfort.annualMad);
  assert.equal(tenantEssential.deductibleMad, 1000);
  assert.equal(ownerConfort.deductibleMad, 500);
  assert.equal(villaIntegrale.deductibleMad, 0);
});

test('calculateHabitationEstimate clamps extreme surface bounds safely', () => {
  const minBound = calculateHabitationEstimate({
    propertyType: 'appartement',
    occupancy: 'proprietaire',
    surfaceSqm: 5,
    tier: 'essentiel',
  });
  const maxBound = calculateHabitationEstimate({
    propertyType: 'villa',
    occupancy: 'proprietaire',
    surfaceSqm: 9999,
    tier: 'integrale',
  });

  assert.equal(minBound.clampedSurface, 30);
  assert.equal(maxBound.clampedSurface, 1200);
  assert.ok(Number.isFinite(minBound.monthlyMad));
  assert.ok(Number.isFinite(maxBound.capitalCoveredMad));
});

test('habitation content collections contain complete bilingual records', () => {
  assert.equal(HABITATION_GUARANTEES.length, 6);
  assert.ok(HABITATION_COMPARISON_ROWS.length >= 6);
  assert.ok(HABITATION_FAQS.length >= 4);
  for (const g of HABITATION_GUARANTEES) {
    assert.ok(g.title.fr.length > 0 && g.title.en.length > 0);
    assert.ok(g.description.fr.length > 0 && g.description.en.length > 0);
  }
});
