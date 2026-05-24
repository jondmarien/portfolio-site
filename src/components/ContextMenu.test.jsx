import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';

import { ContextMenuProvider } from './ContextMenu.jsx';
import { ContextMenuLeading, ContextMenuIcon } from './ContextMenuIcons.jsx';
import { buildContextMenuGroups, flattenContextMenuItems } from '../data/contextMenu.js';
import {
  clampPosition,
  getPointerPosition,
  shouldUseNativeMenu,
  shouldUseNativeMenuForElement,
} from '../hooks/useContextMenu.js';

const navigation = [{ id: 'about', label: 'about', icon: '~' }];

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
    expect(shouldUseNativeMenuForElement(input)).toBe(true);
  });
});

describe('ContextMenuProvider keyboard', () => {
  afterEach(() => {
    cleanup();
  });

  function renderMenu() {
    return render(
      <div className="layout">
        <a href="https://example.com">Example link</a>
        <input aria-label="Name" />
        <ContextMenuProvider navigation={navigation} />
      </div>
    );
  }

  it('opens the custom menu on Shift+F10 when a layout link is focused', async () => {
    renderMenu();

    const link = screen.getByRole('link', { name: 'Example link' });
    link.focus();

    fireEvent.keyDown(window, { key: 'F10', shiftKey: true });

    await waitFor(() => {
      expect(screen.getByRole('menu', { name: 'Site context menu' })).toBeInTheDocument();
    });
  });

  it('does not open the custom menu on Shift+F10 for editable targets', () => {
    renderMenu();

    const input = screen.getByRole('textbox', { name: 'Name' });
    input.focus();

    fireEvent.keyDown(window, { key: 'F10', shiftKey: true });

    expect(screen.queryByRole('menu', { name: 'Site context menu' })).not.toBeInTheDocument();
  });

  it('restores focus to the invoker after Escape closes a keyboard-opened menu', async () => {
    renderMenu();

    const link = screen.getByRole('link', { name: 'Example link' });
    link.focus();

    fireEvent.keyDown(window, { key: 'F10', shiftKey: true });

    await waitFor(() => {
      expect(screen.getByRole('menu', { name: 'Site context menu' })).toBeInTheDocument();
    });

    fireEvent.keyDown(window, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('menu', { name: 'Site context menu' })).not.toBeInTheDocument();
    });

    expect(document.activeElement).toBe(link);
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
