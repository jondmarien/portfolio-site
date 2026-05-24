import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

import { ContributionsPanel } from './ContributionsPanel.jsx';
import { CONTRIBUTIONS_DAY_POPOVER_ID } from '../hooks/useContributionDayPopover.js';
import * as supportsInterestInvokersModule from '../lib/supportsInterestInvokers.js';

vi.mock('../lib/supportsInterestInvokers.js', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    supportsInterestInvokers: vi.fn(() => false),
  };
});

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

function installPopoverPolyfill() {
  if (!HTMLElement.prototype.showPopover) {
    HTMLElement.prototype.showPopover = vi.fn(function showPopover() {
      this.setAttribute('data-popover-open', 'true');
    });
  }

  if (!HTMLElement.prototype.hidePopover) {
    HTMLElement.prototype.hidePopover = vi.fn(function hidePopover() {
      this.removeAttribute('data-popover-open');
    });
  }

  const originalMatches = HTMLElement.prototype.matches;
  HTMLElement.prototype.matches = function matches(selector) {
    if (selector === ':popover-open') {
      return this.hasAttribute('data-popover-open');
    }

    return originalMatches.call(this, selector);
  };

  return () => {
    HTMLElement.prototype.matches = originalMatches;
  };
}

describe('ContributionsPanel', () => {
  let restoreMatches;

  beforeEach(() => {
    restoreMatches = installPopoverPolyfill();
    supportsInterestInvokersModule.supportsInterestInvokers.mockReturnValue(false);
    supportsInterestInvokersModule.resetSupportsInterestInvokersCacheForTests();

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
    restoreMatches?.();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    supportsInterestInvokersModule.resetSupportsInterestInvokersCacheForTests();
  });

  it('renders contribution summary and heatmap by default', async () => {
    render(<ContributionsPanel />);

    expect(await screen.findByText('42 GitHub contributions in the last year')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'GitHub contribution activity heatmap' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '@jondmarien' })).toHaveAttribute('href', 'https://github.com/jondmarien');
  });

  it('uses button cells without native title tooltips', async () => {
    render(<ContributionsPanel />);

    await screen.findByText('42 GitHub contributions in the last year');

    const cells = screen.getAllByRole('button', { name: /contributions on May/i });
    expect(cells.length).toBeGreaterThan(0);
    cells.forEach((cell) => {
      expect(cell).not.toHaveAttribute('title');
    });
  });

  it('shows popover label on hover when interest invokers are unavailable', async () => {
    render(<ContributionsPanel />);

    await screen.findByText('42 GitHub contributions in the last year');

    const activeCell = screen.getByRole('button', { name: '3 contributions on May 26th.' });
    const popover = document.getElementById(CONTRIBUTIONS_DAY_POPOVER_ID);

    expect(popover).toBeTruthy();
    expect(activeCell).not.toHaveAttribute('interestfor');

    fireEvent.mouseEnter(activeCell);

    expect(popover).toHaveTextContent('3 contributions on May 26th.');
    expect(popover).toHaveAttribute('data-popover-open', 'true');
    expect(activeCell).toHaveClass('contributions-cell-anchor');
  });

  it('uses interest invokers when supported', async () => {
    supportsInterestInvokersModule.supportsInterestInvokers.mockReturnValue(true);
    supportsInterestInvokersModule.resetSupportsInterestInvokersCacheForTests();

    render(<ContributionsPanel />);

    await screen.findByText('42 GitHub contributions in the last year');

    const activeCell = screen.getByRole('button', { name: '3 contributions on May 26th.' });
    const popover = document.getElementById(CONTRIBUTIONS_DAY_POPOVER_ID);

    expect(activeCell).toHaveAttribute('interestfor', CONTRIBUTIONS_DAY_POPOVER_ID);

    popover.dispatchEvent(
      Object.assign(new Event('interest', { bubbles: true }), { source: activeCell })
    );

    expect(popover).toHaveTextContent('3 contributions on May 26th.');
  });

  it('keeps legend squares non-interactive', async () => {
    render(<ContributionsPanel />);

    await screen.findByText('42 GitHub contributions in the last year');

    const legend = document.querySelector('.contributions-legend');
    expect(legend?.querySelectorAll('button')).toHaveLength(0);
    expect(legend?.querySelectorAll('span.contributions-cell').length).toBeGreaterThan(0);
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
    expect(screen.getByRole('group', { name: 'GitHub contribution activity heatmap' })).toBeInTheDocument();
    expect(screen.queryByLabelText('GitHub contribution snake animation')).not.toBeInTheDocument();
  });
});
