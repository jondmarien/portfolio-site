import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/styles/global.css', 'utf8');

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

describe('global UX affordances', () => {
  it('defines durable states for active navigation, readable chips, and reduced motion', () => {
    expect(css).toContain('--chip-bg:');
    expect(css).toContain('--sidebar-accent: #2dd4bf;');
    expect(css).toContain(".sidebar nav a[aria-current='location']");
    expect(css).toMatch(/\.breadcrumb\s*\{[^}]*color: var\(--sidebar-accent\);/s);
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('keeps desktop sidebar and main content in independent scroll containers', () => {
    expect(css).toContain('height: calc(100vh / var(--site-scale));');
    expect(css).toContain('overflow: hidden;');
    expect(css).toContain('overscroll-behavior: contain;');
    expect(css).toContain('scrollbar-gutter: stable;');
  });
});
