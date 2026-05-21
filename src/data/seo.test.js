import { describe, expect, it } from 'vitest';

import { seo } from './seo.js';

describe('seo', () => {
  it('keeps title and description within common SERP / social limits', () => {
    expect(seo.title.length).toBeLessThanOrEqual(70);
    expect(seo.description.length).toBeGreaterThan(80);
    expect(seo.description.length).toBeLessThanOrEqual(160);
  });

  it('uses resume-backed credentials in structured data', () => {
    const person = seo.jsonLd['@graph'].find((node) => node['@type'] === 'Person');

    expect(person.name).toBe('Jon Marien');
    expect(person.jobTitle).toMatch(/Chief Technology Officer/i);
    expect(person.worksFor.name).toBe('D-Sports');
    expect(person.description).toBeTruthy();
    expect(person.sameAs.length).toBeGreaterThan(3);
  });

  it('speaks to recruiter and security-community audiences', () => {
    const combined = `${seo.title} ${seo.description}`.toLowerCase();

    expect(combined).toMatch(/cto|resume/);
    expect(combined).toMatch(/offsec|offensive|cve|ctf/);
    expect(combined).toMatch(/issessions|bearhacks/);
  });

  it('points social previews at a public OG image and resume PDF', () => {
    expect(seo.og.image).toMatch(/^https:\/\/www\.chron0\.tech\/og\//);
    expect(seo.resumePdf.href).toBe('/resume/Jon_Marien_Resume.pdf');
  });
});
