import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';

import { ContextMenuLeading, ContextMenuIcon } from './ContextMenuIcons.jsx';
import { buildContextMenuGroups, flattenContextMenuItems } from '../data/contextMenu.js';
import { clampPosition, getPointerPosition, shouldUseNativeMenu } from '../hooks/useContextMenu.js';

describe('context menu data', () => {
  it('builds navigation shortcuts from profile navigation', () => {
    const groups = buildContextMenuGroups({
      navigation: [
        { id: 'about', label: 'about', icon: '~' },
        { id: 'projects', label: 'projects', icon: '⌥' },
      ],
    });

    const navItems = groups.find((group) => group.id === 'navigation')?.items ?? [];
    expect(navItems).toHaveLength(2);
    expect(navItems[0]).toMatchObject({
      label: 'about',
      glyph: '~',
      shortcut: '1',
      action: { type: 'navigate', targetId: 'about' },
    });
    expect(flattenContextMenuItems(groups).length).toBeGreaterThan(4);
  });

  it('adds utility icons for clipboard and history actions', () => {
    const groups = buildContextMenuGroups({
      navigation: [{ id: 'about', label: 'about', icon: '~' }],
    });

    const clipboardItems = groups.find((group) => group.id === 'clipboard')?.items ?? [];
    const historyItems = groups.find((group) => group.id === 'history')?.items ?? [];

    expect(clipboardItems[0]).toMatchObject({ id: 'copy', icon: 'copy' });
    expect(clipboardItems[1]).toMatchObject({ id: 'select-all', icon: 'select-all' });
    expect(historyItems[0]).toMatchObject({ id: 'back', icon: 'back' });
    expect(historyItems[1]).toMatchObject({ id: 'forward', icon: 'forward' });
    expect(historyItems[2]).toMatchObject({ id: 'reload', icon: 'reload' });
  });
});

describe('ContextMenuIcons', () => {
  it('renders svg icons for utility actions', () => {
    const { container } = render(<ContextMenuIcon name="copy" />);
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('renders sidebar glyphs for navigation items', () => {
    render(<ContextMenuLeading item={{ glyph: '~', label: 'about' }} />);
    expect(screen.getByText('~')).toHaveClass('context-menu-item-glyph');
  });

  it('renders icon wrapper for utility items', () => {
    const { container } = render(<ContextMenuLeading item={{ icon: 'reload', label: 'Reload' }} />);
    expect(container.querySelector('.context-menu-item-icon svg')).toBeTruthy();
  });
});

describe('shouldUseNativeMenu', () => {
  it('allows native menu for text inputs', () => {
    const input = document.createElement('input');
    const event = new Event('contextmenu', { bubbles: true });
    Object.defineProperty(event, 'target', { value: input });

    expect(shouldUseNativeMenu(event)).toBe(true);
  });
});

describe('context menu positioning', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.style.zoom = '';
  });

  it('adjusts pointer coordinates for html zoom', () => {
    document.documentElement.style.zoom = '1.25';

    const position = getPointerPosition({ clientX: 250, clientY: 125 });
    expect(position).toEqual({ x: 200, y: 100 });
  });

  it('clamps menu position using zoom-adjusted viewport bounds', () => {
    document.documentElement.style.zoom = '1.25';
    vi.stubGlobal('innerWidth', 1250);
    vi.stubGlobal('innerHeight', 1000);

    expect(clampPosition(200, 100)).toEqual({ x: 200, y: 100 });
    expect(clampPosition(900, 100).x).toBe(720);
  });
});
