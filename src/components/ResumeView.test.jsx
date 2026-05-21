import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { resume } from '../data/resume.js';
import { ResumeView } from './ResumeView.jsx';

describe('ResumeView', () => {
  it('renders major resume subsections and cross-links', () => {
    render(<ResumeView resume={resume} />);

    expect(screen.getByRole('heading', { level: 3, name: 'experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'community' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'projects' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'core competencies' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'education' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /see community/i })[0]).toHaveAttribute('href', '#community');
    expect(screen.getAllByRole('link', { name: /see projects/i })[0]).toHaveAttribute('href', '#projects');
    expect(screen.getByText(/Last updated: May 04, 2026/)).toBeInTheDocument();
  });
});
