import { describe, expect, it, vi, afterEach } from 'vitest';

import { buildContextMenuGroups, flattenContextMenuItems } from '../data/contextMenu.js';
import { clampPosition, getPointerPosition, shouldUseNativeMenu } from '../hooks/useContextMenu.js';

describe('context menu data', () => {
  it('builds navigation shortcuts from profile navigation', () => {
    const groups = buildContextMenuGroups({
      navigation: [
        { id: 'about', label: 'about' },
        { id: 'projects', label: 'projects' },
      ],
    });

    const navItems = groups.find((group) => group.id === 'navigation')?.items ?? [];
    expect(navItems).toHaveLength(2);
    expect(navItems[0]).toMatchObject({ label: 'about', shortcut: '1', action: { type: 'navigate', targetId: 'about' } });
    expect(flattenContextMenuItems(groups).length).toBeGreaterThan(4);
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
    expect(clampPosition(900, 100).x).toBeLessThan(900);
  });
});
