import { describe, expect, it } from 'vitest';

import { resolveMonthLabels } from './resolveMonthLabels.js';

describe('resolveMonthLabels', () => {
  it('drops month labels that would overlap in the heatmap header', () => {
    const resolved = resolveMonthLabels(
      [
        { weekIndex: 0, label: 'May' },
        { weekIndex: 1, label: 'Jun' },
        { weekIndex: 6, label: 'Jul' },
      ],
      53
    );

    expect(resolved).toEqual([
      { weekIndex: 0, label: 'May' },
      { weekIndex: 6, label: 'Jul' },
    ]);
  });
});
