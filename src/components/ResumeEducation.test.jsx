import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { resume } from '../data/resume.js';
import { ResumeEducation } from './ResumeEducation.jsx';

describe('ResumeEducation', () => {
  it('renders school and degree information', () => {
    render(<ResumeEducation education={resume.education} />);

    expect(screen.getByText('Sheridan College - Institute of Technology, Oakville, Canada')).toBeInTheDocument();
    expect(screen.getByText('Honours Bachelor of Information Sciences (Cyber Security)')).toBeInTheDocument();
    expect(screen.getByText('Undergraduate Certificate in Resilience, Ethics, & Adaptation')).toBeInTheDocument();
  });
});
