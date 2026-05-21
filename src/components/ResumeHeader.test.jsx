import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { resume } from '../data/resume.js';
import { ResumeHeader } from './ResumeHeader.jsx';

describe('ResumeHeader', () => {
  it('renders tagline', () => {
    render(<ResumeHeader resume={resume} />);

    expect(screen.getByText(resume.tagline)).toBeInTheDocument();
  });

  it('renders download pdf link', () => {
    render(<ResumeHeader resume={resume} />);

    const downloadLink = screen.getByRole('link', { name: resume.pdfDownload.label });
    expect(downloadLink).toHaveAttribute('href', '/resume/Jon_Marien_Resume.pdf');
    expect(downloadLink).toHaveAttribute('target', '_blank');
  });
});
