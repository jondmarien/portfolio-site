import { describe, expect, it } from 'vitest';

import { resume } from './resume.js';

describe('resume data', () => {
  it('includes required top-level sections', () => {
    expect(resume.experience.length).toBeGreaterThan(0);
    expect(resume.competencies.some((c) => c.id === 'programming')).toBe(true);
    expect(resume.education).toHaveLength(1);
    expect(resume.lastUpdated).toBe('2026-05-04');
    expect(resume.pdfDownload.href).toBe('/resume/Jon_Marien_Resume.pdf');
  });

  it('includes D-Sports CTO role with bullets', () => {
    const dSports = resume.experience.find((e) => e.id === 'd-sports');
    expect(dSports.roles.some((r) => /CTO/i.test(r.title))).toBe(true);
    expect(dSports.roles[0].bullets.length).toBeGreaterThan(0);
  });

  it('includes trimmed community and project summaries with cross-links', () => {
    expect(resume.communitySummary.every((entry) => entry.crossLink === '#community')).toBe(true);
    expect(resume.projectSummary.every((entry) => entry.crossLink === '#projects')).toBe(true);
  });
});
