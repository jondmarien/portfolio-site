import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProjectList } from './ProjectList.jsx';
import { projects } from '../data/projects.js';

describe('ProjectList', () => {
  it('renders featured projects first and expands the rest on demand', () => {
    render(<ProjectList projects={projects} />);

    expect(screen.getByText('D-Sports')).toBeInTheDocument();
    expect(screen.getByText('Burpcord')).toBeInTheDocument();
    expect(screen.queryByText('Health Companion')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '+ show more (10 projects)' }));

    expect(screen.getByText('Health Companion')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '↑ show less' })).toHaveAttribute('aria-expanded', 'true');
  });
});
