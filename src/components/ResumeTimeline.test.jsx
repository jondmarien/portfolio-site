import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { resume } from '../data/resume.js';
import { ResumeTimeline } from './ResumeTimeline.jsx';

describe('ResumeTimeline', () => {
  it('renders organization name and role title', () => {
    render(<ResumeTimeline entries={resume.experience} />);

    expect(screen.getByText(/D-Sports \| Transforming the Digital Sports Fan Landscape/)).toBeInTheDocument();
    expect(screen.getByText(/CTO \(Chief Technology Officer\)/)).toBeInTheDocument();
  });

  it('renders first bullet text for expanded role', () => {
    render(<ResumeTimeline entries={resume.experience} />);

    expect(screen.getByText(/Founding CTO/)).toBeInTheDocument();
  });

  it('expands collapsed role when toggle is clicked', () => {
    render(<ResumeTimeline entries={resume.experience} />);

    const collapsedToggle = screen.getByRole('button', { name: /Senior Project Manager & Security Engineer/i });
    expect(collapsedToggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(collapsedToggle);

    expect(collapsedToggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Streamlined project workflows and delivery timelines/)).toBeInTheDocument();
  });
});
