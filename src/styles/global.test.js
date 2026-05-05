import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/styles/global.css', 'utf8');

describe('global cursor styles', () => {
  it('keeps native cursors and avoids global custom cursor assets', () => {
    expect(css).not.toContain('--cursor-default: url("data:image/svg+xml');
    expect(css).not.toContain('--cursor-pointer: url("data:image/svg+xml');
    expect(css).not.toContain('--cursor-scroll-up: url("data:image/svg+xml');
    expect(css).not.toContain('--cursor-scroll-down: url("data:image/svg+xml');
    expect(css).not.toContain('cursor: var(--cursor-default), auto;');
    expect(css).not.toContain('cursor: var(--cursor-pointer), pointer;');
    expect(css).toContain('cursor: pointer;');
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
    expect(css).toContain('--sidebar-accent: oklch(');
    expect(css).toMatch(/\.hero-badge\s*\{[^}]*linear-gradient\(135deg, oklch\(76% 0\.13 178 \/ 13%\), oklch\(72% 0\.13 305 \/ 10%\)\)/s);
    expect(css).toMatch(/\.hero-badge-glow:hover,\s*\.hero-badge-glow:focus-within\s*\{[^}]*box-shadow:/s);
    expect(css).toMatch(/\.hero-badge-glow\s*\{[^}]*transition: border-color 0\.22s ease, box-shadow 0\.22s ease;/s);
    expect(css).toMatch(/\.hero-badge::before\s*\{[^}]*transition: opacity 0\.22s ease;/s);
    expect(css).toMatch(/\.hero-badge-label::after\s*\{[^}]*content: '\|';[^}]*opacity: 0;/s);
    expect(css).toContain('@keyframes badge-caret-blink');
    expect(css).toContain(".sidebar nav a[aria-current='location']");
    expect(css).toMatch(/\.breadcrumb\s*\{[^}]*color: var\(--sidebar-accent\);/s);
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('keeps hero copy readable with intentional wrapping', () => {
    expect(css).toMatch(/\.hero-body\s*\{[^}]*max-width: 64ch;[^}]*text-wrap: pretty;/s);
    expect(css).toMatch(/\.hero-body \.text-link\s*\{[^}]*white-space: nowrap;/s);
    expect(css).toMatch(/\.hero-body \.rich-text-accent\s*\{[^}]*color: var\(--sidebar-accent\);[^}]*text-shadow:/s);
    expect(css).toMatch(/\.inline-tag\s*\{[^}]*linear-gradient\(135deg, oklch\(76% 0\.13 178 \/ 13%\), oklch\(72% 0\.13 305 \/ 10%\)\)[^}]*border-radius: 3px;/s);
  });

  it('keeps the readable hero alias text layered above the ASCII texture', () => {
    expect(css).toMatch(/\.hero h1 \.hero-alias-fallback\s*\{[^}]*opacity: 0\.95;/s);
    expect(css).toMatch(/\.hero h1 \.hero-alias\.hero-alias--ascii-ready \.hero-alias-fallback\s*\{[^}]*opacity: 0;/s);
    expect(css).toMatch(/\.hero h1 \.hero-alias-ascii\s*\{[^}]*z-index: 1;/s);
  });

  it('uses full-width layout and page-level scrolling', () => {
    expect(css).toMatch(/html,\s*body,\s*#root\s*\{[^}]*min-height: 100%;[^}]*overflow-x: clip;/s);
    expect(css).not.toMatch(/html,\s*body,\s*#root\s*\{[^}]*overflow-x: hidden;/s);
    expect(css).toContain('.layout {');
    expect(css).toContain('width: min(100%, 1160px);');
    expect(css).toContain('max-width: 1160px;');
    expect(css).toContain('margin: 0 auto;');
    expect(css).toContain('.sidebar {');
    expect(css).toContain('position: sticky;');
    expect(css).toContain('top: 0;');
    expect(css).toContain('.main {');
    expect(css).toContain('overflow: visible;');
  });

  it('keeps project media previews in a consistent viewer frame', () => {
    expect(css).toMatch(/\.project-media-wrap\s*\{[^}]*height: clamp\(190px, 30vw, 252px\);[^}]*max-width: 560px;[^}]*overflow: hidden;/s);
    expect(css).toMatch(/\.project-media\s*\{[^}]*height: 100%;[^}]*object-fit: contain;[^}]*width: 100%;/s);
  });

  it('supports restrained media frames for security writeups', () => {
    expect(css).toMatch(/\.writeup-media\s*\{[^}]*max-width: 520px;[^}]*overflow: hidden;/s);
    expect(css).toMatch(/\.writeup-media img\s*\{[^}]*object-fit: cover;[^}]*width: 100%;/s);
    expect(css).toMatch(/\.writeup-media-trigger\s*\{[^}]*cursor: pointer;[^}]*width: 100%;/s);
    expect(css).toMatch(/\.writeup-media:hover,\s*\.writeup-media:focus-within\s*\{[^}]*border-color: var\(--sidebar-accent-dim\);/s);
  });

  it('keeps contact links visually distinct between rest and interactive states', () => {
    expect(css).toMatch(/\.contact-value a\s*\{[^}]*color: var\(--accent-dim\);[^}]*transition: color 0\.15s;/s);
    expect(css).toMatch(/\.contact-value a:hover,\s*\.contact-value a:focus-visible\s*\{[^}]*color: var\(--accent\);/s);
  });
});
