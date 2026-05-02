import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/styles/global.css', 'utf8');

describe('global cursor styles', () => {
  it('uses custom URL cursors with mandatory keyword fallbacks', () => {
    expect(css).toContain('--cursor-default: url("data:image/svg+xml');
    expect(css).toContain('--cursor-pointer: url("data:image/svg+xml');
    expect(css).toContain('--cursor-scroll-up: url("data:image/svg+xml');
    expect(css).toContain('--cursor-scroll-down: url("data:image/svg+xml');
    expect(css).toContain('cursor: var(--cursor-default), auto;');
    expect(css).toContain('cursor: var(--cursor-pointer), pointer;');
    expect(css).toContain('cursor: var(--cursor-scroll-up), ns-resize !important;');
    expect(css).toContain('cursor: var(--cursor-scroll-down), ns-resize !important;');
  });
});

describe('global layout scale', () => {
  it('keeps the site scale token available without using browser zoom', () => {
    expect(css).toContain('--site-scale: 1.25;');
    expect(css).not.toContain('zoom: var(--site-scale);');
    expect(css).toContain('#root {');
    expect(css).toContain('transform: none;');
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

  it('uses full-width layout and page-level scrolling', () => {
    expect(css).toMatch(/html,\s*body,\s*#root\s*\{[^}]*min-height: 100%;[^}]*overflow-x: hidden;/s);
    expect(css).toContain('.layout {');
    expect(css).toContain('width: min(100%, 1160px);');
    expect(css).toContain('max-width: 1160px;');
    expect(css).toContain('margin: 0 auto;');
    expect(css).toContain('.main {');
    expect(css).toContain('overflow: visible;');
  });
});
