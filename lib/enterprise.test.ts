import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ENTERPRISE_SERVICES,
  ENTERPRISE_SERVICE_LIST,
  type EnterpriseServiceId,
} from './enterprise.ts';

test('ENTERPRISE_SERVICES covers all four enterprise domains with complete metadata', () => {
  const ids: EnterpriseServiceId[] = [
    'entreprises',
    'accidents-travail',
    'poids-lourds',
    'maritime',
  ];

  assert.equal(ENTERPRISE_SERVICE_LIST.length, 4);

  for (const id of ids) {
    const s = ENTERPRISE_SERVICES[id];
    assert.ok(s, `Missing service ${id}`);
    assert.equal(s.id, id);
    assert.ok(s.path.startsWith('/assurance-'));

    // Check multilingual strings
    for (const lang of ['fr', 'en', 'ar'] as const) {
      assert.ok(s.title[lang], `Missing title for ${id} in ${lang}`);
      assert.ok(s.subtitle[lang], `Missing subtitle for ${id} in ${lang}`);
      assert.ok(s.headline[lang], `Missing headline for ${id} in ${lang}`);
      assert.ok(s.tagline[lang], `Missing tagline for ${id} in ${lang}`);
      assert.ok(s.summary[lang], `Missing summary for ${id} in ${lang}`);
    }

    // Check coverages
    assert.ok(s.coverages.length >= 6, `Expected at least 6 coverages for ${id}`);
    for (const cov of s.coverages) {
      assert.ok(cov.title.fr && cov.title.ar && cov.title.en);
      assert.ok(cov.body.fr && cov.body.ar && cov.body.en);
    }

    // Check steps and FAQs
    assert.ok(s.steps.length >= 4, `Expected at least 4 steps for ${id}`);
    assert.ok(s.faqs.length >= 4, `Expected at least 4 FAQs for ${id}`);
    assert.ok(s.rmaHref.includes('rmaassurance.com'));
  }
});
