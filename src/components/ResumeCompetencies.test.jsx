import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { resume } from '../data/resume.js';
import { ResumeCompetencies } from './ResumeCompetencies.jsx';

describe('ResumeCompetencies', () => {
  it('renders competency categories and tags', () => {
    render(<ResumeCompetencies competencies={resume.competencies} />);

    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('BSCP (Burp Suite Certified Practitioner) - In progress. Estimated completion May 2026.')).toBeInTheDocument();
  });
});
