import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('./global.css', import.meta.url), 'utf8');

describe('global cursor styles', () => {
  it('uses custom URL cursors with mandatory keyword fallbacks', () => {
    expect(css).toContain('--cursor-default: url("data:image/svg+xml');
    expect(css).toContain('--cursor-pointer: url("data:image/svg+xml');
    expect(css).toContain('cursor: var(--cursor-default), auto;');
    expect(css).toContain('cursor: var(--cursor-pointer), pointer;');
  });
});

describe('global layout scale', () => {
  it('scales the main site chrome to match the preferred browser zoom level', () => {
    expect(css).toContain('--site-scale: 1.1;');
    expect(css).toContain('zoom: var(--site-scale);');
  });
});
