import { describe, expect, it } from 'vitest';

import { formatContributionDateLabel, formatContributionDayLabel } from './formatContributionDayLabel.js';

describe('formatContributionDayLabel', () => {
  it('formats zero contributions with ordinal date', () => {
    expect(formatContributionDayLabel({ date: '2026-02-18', count: 0 })).toBe(
      'No contributions on February 18th.'
    );
  });

  it('formats singular contribution', () => {
    expect(formatContributionDayLabel({ date: '2026-02-01', count: 1 })).toBe(
      '1 contribution on February 1st.'
    );
  });

  it('formats plural contributions', () => {
    expect(formatContributionDayLabel({ date: '2026-02-22', count: 94 })).toBe(
      '94 contributions on February 22nd.'
    );
  });

  it('handles 11th through 13th ordinals', () => {
    expect(formatContributionDateLabel('2026-03-11')).toBe('March 11th');
    expect(formatContributionDateLabel('2026-03-12')).toBe('March 12th');
    expect(formatContributionDateLabel('2026-03-13')).toBe('March 13th');
  });
});
