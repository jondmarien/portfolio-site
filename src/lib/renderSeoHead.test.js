import { describe, expect, it } from 'vitest';

import { renderSeoHead } from './renderSeoHead.js';

describe('renderSeoHead', () => {
  it('renders core meta, og, twitter, and json-ld tags', () => {
    const head = renderSeoHead();

    expect(head).toContain('<title>Jon Marien | CTO @ D-Sports · Offsec');
    expect(head).toContain('property="og:title"');
    expect(head).toContain('name="twitter:card"');
    expect(head).toContain('type="application/ld+json"');
    expect(head).toContain('"@type":"Person"');
    expect(head).toContain('rel="canonical"');
    expect(head).toContain('type="application/pdf"');
  });
});
