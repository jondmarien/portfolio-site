import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { ContributionsPanel } from './ContributionsPanel.jsx';

const samplePayload = {
  username: 'jondmarien',
  totalContributions: 42,
  monthLabels: [{ weekIndex: 0, label: 'May' }],
  weeks: [
    [
      { date: '2025-05-25', level: 0, count: 0 },
      { date: '2025-05-26', level: 2, count: 3 },
    ],
  ],
};

describe('ContributionsPanel', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url) => {
        if (typeof url === 'string' && url.includes('snake')) {
          return {
            ok: true,
            blob: async () => new Blob(['<svg></svg>'], { type: 'image/svg+xml' }),
          };
        }

        return {
          ok: true,
          json: async () => samplePayload,
        };
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders contribution summary and heatmap by default', async () => {
    render(<ContributionsPanel />);

    expect(await screen.findByText('42 GitHub contributions in the last year')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'GitHub contribution activity heatmap' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '@jondmarien' })).toHaveAttribute('href', 'https://github.com/jondmarien');
  });

  it('shows snake animation after konami code unlock', async () => {
    render(<ContributionsPanel />);

    await screen.findByText('42 GitHub contributions in the last year');

    const sequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'KeyB',
      'KeyA',
    ];

    sequence.forEach((code) => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true }));
    });

    await waitFor(() => {
      expect(screen.getByLabelText('GitHub contribution snake animation')).toBeInTheDocument();
    });
  });

  it('resets snake mode after remount', async () => {
    const { unmount } = render(<ContributionsPanel />);

    await screen.findByText('42 GitHub contributions in the last year');

    const sequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'KeyB',
      'KeyA',
    ];

    sequence.forEach((code) => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code, bubbles: true }));
    });

    await waitFor(() => {
      expect(screen.getByLabelText('GitHub contribution snake animation')).toBeInTheDocument();
    });

    unmount();
    render(<ContributionsPanel />);

    expect(await screen.findByText('42 GitHub contributions in the last year')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'GitHub contribution activity heatmap' })).toBeInTheDocument();
    expect(screen.queryByLabelText('GitHub contribution snake animation')).not.toBeInTheDocument();
  });
});
