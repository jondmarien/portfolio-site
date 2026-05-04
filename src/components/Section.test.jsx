import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Section } from './Section.jsx';

describe('Section', () => {
  it('renders header actions beside the section title', () => {
    render(
      <Section id="projects" title="projects" actions={<button type="button">sort projects</button>}>
        <p>Project content</p>
      </Section>
    );

    expect(screen.getByRole('heading', { name: 'projects' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'sort projects' })).toBeInTheDocument();
    expect(screen.getByText('Project content')).toBeInTheDocument();
  });
});
