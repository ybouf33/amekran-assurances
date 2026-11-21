import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_TIMELINE_COUNT,
  TIMELINE_MILESTONES,
  calculateBarHeightPercent,
  clampTeamStartIndex,
  getTeamMaxStartIndex,
  getVisibleTimelineMilestones,
} from './about.ts';

test('getVisibleTimelineMilestones respects collapsed and expanded states', () => {
  const collapsed = getVisibleTimelineMilestones(false);
  assert.equal(collapsed.length, INITIAL_TIMELINE_COUNT);
  assert.equal(collapsed[0].year, '2025');

  const expanded = getVisibleTimelineMilestones(true);
  assert.equal(expanded.length, TIMELINE_MILESTONES.length);
  assert.equal(expanded[expanded.length - 1].year, '2004');
});

test('team carousel clamping stays within desktop and mobile bounds', () => {
  assert.equal(getTeamMaxStartIndex(4, 3), 1);
  assert.equal(getTeamMaxStartIndex(4, 1), 3);
  assert.equal(getTeamMaxStartIndex(2, 3), 0);

  assert.equal(clampTeamStartIndex(-2, 4, 3), 0);
  assert.equal(clampTeamStartIndex(5, 4, 3), 1);
  assert.equal(clampTeamStartIndex(2, 4, 1), 2);
});

test('calculateBarHeightPercent normalizes values safely between 0 and 100', () => {
  assert.equal(calculateBarHeightPercent(78, 100), 78);
  assert.equal(calculateBarHeightPercent(-10, 100), 0);
  assert.equal(calculateBarHeightPercent(140, 100), 100);
  assert.equal(calculateBarHeightPercent(50, 0), 0);
});
