import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const viteConfig = readFileSync('vite.config.js', 'utf8');

describe('build config', () => {
  it('enables rolldown code splitting groups for smaller production chunks', () => {
    expect(viteConfig).toContain('rolldownOptions');
    expect(viteConfig).toContain('codeSplitting');
    expect(viteConfig).toContain('react-vendor');
    expect(viteConfig).toContain('three-vendor');
    expect(viteConfig).toContain('vendor');
  });
});
